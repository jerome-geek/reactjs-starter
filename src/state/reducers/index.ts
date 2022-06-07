import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import mallSlice from 'state/slices/mallSlice';
import tokenSlice from 'state/slices/tokenSlice';
import memberSlice from 'state/slices/memberSlice';

const rootReducer = combineReducers({
    mall: mallSlice.reducer,
    token: tokenSlice.reducer,
    member: memberSlice.reducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

// useSelector hook 대신 사용. useSelector 함수의 파라미터에 타입을 지정하지 않아도 된다.
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
