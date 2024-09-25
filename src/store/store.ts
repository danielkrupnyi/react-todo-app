import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user.slice';
import todosSlice, { TODOS_PERSISTENT_STATE } from './todos.slice';
import { saveState } from './storage';

export const store = configureStore({
	reducer: {
		user: userSlice,
		todos: todosSlice,
	},
});

store.subscribe(() => {
	saveState(store.getState().todos.data, TODOS_PERSISTENT_STATE);
});

export type typeRootState = ReturnType<typeof store.getState>;
export type typeAppDispatch = typeof store.dispatch;
