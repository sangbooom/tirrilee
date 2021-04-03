import userReducer from '../components/LoginPage/LoginPage';
import {
  combineReducers,
  createAction,
  // createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

export default combineReducers({
  user: userReducer,
});

export interface Users {
  email: string;
  password: string;
}

const initialState: Users = {
  email: '',
  password: '',
};
const actionPrefix = 'USERS';

const changeUserEmail = createAction<string>(`${actionPrefix}/changeEmail`);
const changeUserPassword = createAction<string>(
  `${actionPrefix}/changePassword`,
);

const userSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    changeEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    changePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

// 사용법 미숙
// export const selectUserAuth = createSelector(
//   (state: any) => state,
//   (user: Users) => user,
// );

export const actions = {
  changeUserEmail,
  changeUserPassword,
};

export const rootReducer = combineReducers({
  user: userSlice.reducer,
});

console.log(userSlice);

export type RootState = ReturnType<typeof rootReducer>;
