import { FC, useState } from 'react';
import { ITodosState, todosActions } from '../store/todos.slice';
import { useDispatch } from 'react-redux';

export const TodoItem: FC<{ data: ITodosState }> = ({ data }) => {
	const [text, setText] = useState(data.name);
	const [isFocused, setIsFocused] = useState(false);
	const dispatch = useDispatch();
	const actions = todosActions;

	const removeTodo = () => {
		dispatch(actions.remove(data.id));
	};

	const updateTodo = () => {
		dispatch(actions.update({ id: data.id, text: text }));
	};

	const updateStatus = () => {
		dispatch(actions.toggleStatus(data.id));
	};

	return (
		<li className='flex justify-between items-center gap-3 bg-primary-content rounded-xl p-4 '>
			<input
				value={text}
				type='text'
				placeholder='Type here'
				className='input input-ghost w-full max-w-xs'
				onChange={(e) => setText(e.target.value)}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setTimeout(() => setIsFocused(false), 200)}
			/>
			<div className='flex items-center gap-2'>
				<input
					type='checkbox'
					className='checkbox checkbox-lg'
					onChange={updateStatus}
					defaultChecked={data.completed ?? false}
				/>
				<button
					className={`btn btn-warning ${!isFocused ? 'btn-disabled' : ''}`}
					onClick={updateTodo}
				>
					change
				</button>
				<button className='btn btn-error' onClick={removeTodo}>
					remove
				</button>
			</div>
		</li>
	);
};
