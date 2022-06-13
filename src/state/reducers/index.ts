import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

import store from 'state/store';
import mallSlice from 'state/slices/mallSlice';
import tokenSlice from 'state/slices/tokenSlice';
import memberSlice from 'state/slices/memberSlice';

const rootReducer = combineReducers({
    mall: mallSlice.reducer,
    token: tokenSlice.reducer,
    member: memberSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

// useSelector hook 대신 사용. useSelector 함수의 파라미터에 타입을 지정하지 않아도 된다.
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
