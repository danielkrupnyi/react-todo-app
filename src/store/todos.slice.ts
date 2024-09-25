import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';

export const TODOS_PERSISTENT_STATE = 'todos';

export interface ITodosState {
	id: string;
	name: string;
	completed: boolean;
}

const initialState: {
	data: ITodosState[] | [];
	filterValue: string;
	completeStatus: boolean;
} = {
	data: loadState<ITodosState>(TODOS_PERSISTENT_STATE),
	filterValue: '',
	completeStatus: false,
};

export const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<ITodosState>) => {
			state.data = [...state.data, action.payload];
		},
		remove: (state, action: PayloadAction<string>) => {
			const filtered = state.data.filter((item) => item.id !== action.payload);
			state.data = filtered;
		},
		update: (state, action: PayloadAction<{ id: string; text: string }>) => {
			const index = state.data.findIndex((el) => el.id === action.payload.id);
			const prev = state.data.slice(0, index);
			const next = state.data.slice(index + 1, state.data.length);

			const todoToUpdate = state.data.find((el) => el.id === action.payload.id);

			if (todoToUpdate) {
				todoToUpdate.name = action.payload.text;
				state.data = [...prev, todoToUpdate, ...next];
			}
		},
		toggleGlobalStatus: (state) => {
			state.completeStatus = !state.completeStatus;
		},
		toggleStatus: (state, action: PayloadAction<string>) => {
			state.data = state.data.filter((item) => {
				if (item.id === action.payload) {
					item.completed = !item.completed;
					return item;
				}
				return item;
			});
		},
		setFilterValue: (state, action: PayloadAction<string>) => {
			state.filterValue = action.payload;
		},
	},
});

export default todosSlice.reducer;
export const todosActions = todosSlice.actions;
