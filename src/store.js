import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import { 
  transactionDepositReducer, 
  transactionWithdrawalReducer, 
  transactionTransferReducer, 
  transactionMutasiReducer 
} from './reducers/transactionReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  transactionDeposit: transactionDepositReducer,
  transactionWithdrawal: transactionWithdrawalReducer,
  transactionTransfer: transactionTransferReducer,
  transactionMutasi: transactionMutasiReducer
});

const userInfoFromStorage = localStorage.getItem('token') ? localStorage.getItem('token') : null;

const initialState = {
  userLogin: { token: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;