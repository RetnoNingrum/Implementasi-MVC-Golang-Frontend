import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./style.scss";
import { Navbar, Container, Form, Button, Row, Col, Dropdown } from "react-bootstrap";
import logoImg from "../../assets/simplebank.png";
import userImg from "../../assets/user.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../transactions/style.scss"
import { logout } from '../../actions/userActions';
import { deposit, withdrawal, transfer, mutasi } from '../../actions/transactionActions'

const Transactions = ({ history }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/login');
  }

  const userLogin = useSelector((state) => state.userLogin)
  const { token } = userLogin

  const [amountDeposit, setAmountDeposit] = useState("");
  const [descDeposit, setDescDeposit] = useState("");
  const [amountWithdrawal, setAmountWithdrawal] = useState("");
  const [descWithdrawal, setDescWithdrawal] = useState("");
  const [accountTransfer, setAccountTransfer] = useState("");
  const [amountTransfer, setAmountTransfer] = useState("");
  const [descTransfer, setDescTransfer] = useState("");
  const [allDataMutasi, setAllDataMutasi] = useState([]);

  useEffect(() => {
    setAmountDeposit("");
    setDescDeposit("");
    setAmountWithdrawal("");
    setDescWithdrawal("");
    setAccountTransfer("");
    setAmountTransfer("");
    setDescTransfer("");
    setAllDataMutasi([]);
  }, [])

  useEffect(() => {
    if (token) {
      // dispatch(saldo())
      dispatch(mutasi())
    }
  }, [dispatch, history, token])

  const transactionMutasi = useSelector((state) => state.transactionMutasi)
  const { dataMutasi } = transactionMutasi
  const accountDeposit = dataMutasi?.account?.account_number
  const accountWithdrawal = dataMutasi?.account?.account_number
  const accountTransferSender = dataMutasi?.account?.account_number

  const submitDepositHandler = (e) => {
    e.preventDefault();
    dispatch(deposit(accountDeposit, amountDeposit, descDeposit));
  }
  const submitWithdrawalHandler = (e) => {
    e.preventDefault();
    dispatch(withdrawal(accountWithdrawal, amountWithdrawal, descWithdrawal));
  }
  const submitTransferHandler = (e) => {
    e.preventDefault();
    dispatch(transfer(accountTransfer, accountTransferSender, amountTransfer, descTransfer));
  }

  return (
    <Container>
      <Tabs>
        <Navbar bg="light">
          <Navbar.Collapse>
            <Navbar.Brand>
              <img
                src={logoImg}
                width="200"
                height="100"
                className="d-inline-block align-top"
                alt="logo"
              />
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Dropdown id="dropdown-basic">
                <Navbar.Brand>
                  <Dropdown.Toggle className="customDropdown">
                    <img
                      src={userImg}
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                      alt="user"
                    />
                  </Dropdown.Toggle>
                </Navbar.Brand>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Navbar>
        <TabList>
          <Tab>Deposit</Tab>
          <Tab>Withdraw</Tab>
          <Tab>Transfer</Tab>
          <Tab>Mutasi Rekening</Tab>
        </TabList>
        <TabPanel>
          <div className="d-flex justify-content-center my-4">
            <h1>DEPOSIT</h1>
          </div>
          <div className="mb-5">
            <h4>Total Saldo : {dataMutasi != null && dataMutasi.account ? dataMutasi.account.saldo : 0}</h4>
          </div>
          <Form className="mt-3" onSubmit={submitDepositHandler}>
            <Form.Group as={Row} controlId="formPlaintextAmount">
              <Form.Label column sm="2">
                Total Amount
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="amount"
                  value={amountDeposit}
                  onChange={(e) => setAmountDeposit(e.target.value)}
                  placeholder="Input the amount" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlTextareaDesc">
              <Form.Label column sm="2">
                Description
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={descDeposit}
                  onChange={(e) => setDescDeposit(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Col sm={{ span: 10, offset: 11 }}>
              <Button variant="danger" type="submit">
                Send
              </Button>
            </Col>
          </Form>
        </TabPanel>
        <TabPanel>
          <div className="d-flex justify-content-center my-4">
            <h1>WITHDRAWAL</h1>
          </div>
          <div className="mb-5">
            <h4>Total Saldo : {dataMutasi != null && dataMutasi.account ? dataMutasi.account.saldo : 0}</h4>
          </div>
          <Form className="mt-3" onSubmit={submitWithdrawalHandler}>
            <Form.Group as={Row} controlId="formPlaintextAmountWithdraw">
              <Form.Label column sm="2">
                Total Amount
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="amount"
                  value={amountWithdrawal}
                  onChange={(e) => setAmountWithdrawal(e.target.value)}
                  placeholder="Input the amount"
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="exampleForm.ControlTextareaDescWithdraw"
            >
              <Form.Label column sm="2">
                Description
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={descWithdrawal}
                  onChange={(e) => setDescWithdrawal(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Col sm={{ span: 10, offset: 11 }}>
              <Button variant="danger" type="submit">
                Withdraw
              </Button>
            </Col>
          </Form>
        </TabPanel>
        <TabPanel>
          <div className="d-flex justify-content-center my-4">
            <h1>TRANSFER</h1>
          </div>
          <div className="mb-5">
            <h4>Total Saldo : {dataMutasi != null && dataMutasi.account ? dataMutasi.account.saldo : 0}</h4>
          </div>
          <Form className="mt-3" onSubmit={submitTransferHandler}>
            <Form.Group as={Row} controlId="formPlaintextRecepient">
              <Form.Label column sm="2">
                Recepient
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="account"
                  value={accountTransfer}
                  onChange={(e) => setAccountTransfer(e.target.value)}
                  placeholder="Input the Recepient Account Number "
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextAmountTransfer">
              <Form.Label column sm="2">
                Total Amount
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="amount"
                  value={amountTransfer}
                  onChange={(e) => setAmountTransfer(e.target.value)}
                  placeholder="Input the amount"
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="exampleForm.ControlTextareaDescTransfer"
            >
              <Form.Label column sm="2">
                Description
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={descTransfer}
                  onChange={(e) => setDescTransfer(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Col sm={{ span: 10, offset: 11 }}>
              <Button variant="danger" type="submit">
                Transfer
              </Button>
            </Col>
          </Form>
        </TabPanel>
        <TabPanel>
          {/* isi code mutasi rekening disini */}
          <div className="d-flex justify-content-center my-4">
            <h1>MUTASI REKENING</h1>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col"><center>Date</center></th>
                  <th scope="col"><center>Type</center></th>
                  <th scope="col"><center>Sender</center></th>
                  <th scope="col"><center>Recipient</center></th>
                  <th scope="col"><center>Amount</center></th>
                  <th scope="col"><center>Description</center></th>
                </tr>
              </thead>
              <tbody>
                {/* rendering data */}
                {dataMutasi != null && dataMutasi.account ? dataMutasi.transaction.map(function (item, key) {
                  return (
                    <tr key={key}>
                      <td><center>{item.timestamp}</center></td>
                      <td><center>{(() => {
                        switch (item.transaction_type) {
                          case 0: return "Transfer";
                          case 1: return "Withdraw";
                          case 2: return "Deposit";
                          default: return "Transfer";
                        }
                      })()}</center></td>
                      <td><center>{item.sender}</center></td>
                      <td><center>{item.recipient}</center></td>
                      <td><center>{item.amount}</center></td>
                      <td><center>{item.transaction_description}</center></td>
                    </tr>
                  )
                }) : "Kosong!"}
              </tbody>
            </table>
          </div>
        </TabPanel>
      </Tabs>
    </Container>
  );
}

export default Transactions;