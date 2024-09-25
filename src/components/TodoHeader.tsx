import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { todosActions } from '../store/todos.slice';
import { typeRootState } from '../store/store';

export const TodoHeader = () => {
	const [text, setText] = useState('');

	const completeStatus = useSelector(
		(state: typeRootState) => state.todos.completeStatus
	);

	const filterValue = useSelector(
		(state: typeRootState) => state.todos.filterValue
	);

	const dispatch = useDispatch();
	const actions = todosActions;

	const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
		setText(e.target.value);

	const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(actions.setFilterValue(e.target.value));
	};

	const handleCompleteFilterChange = () => {
		dispatch(actions.toggleGlobalStatus());
	};

	const clearInput = () => setText('');

	const addTodo = () => {
		dispatch(
			actions.add({
				id: uuidv4(),
				name: text,
				completed: false,
			})
		);
		clearInput();
	};

	return (
		<div className='bg-primary-content p-4 rounded-xl w-[500px]'>
			<div className='flex gap-4'>
				<input
					type='text'
					placeholder='Type here'
					className='input input-bordered w-full'
					value={text}
					onChange={handleInput}
				/>
				<div className='flex gap-2'>
					<button
						className={`btn btn-primary capitalize ${
							!text ? 'btn-disabled' : ''
						}`}
						onClick={addTodo}
					>
						add
					</button>
					<button
						className={`btn btn-accent capitalize ${
							!text ? 'btn-disabled' : ''
						}`}
						onClick={clearInput}
					>
						clear
					</button>
				</div>
			</div>
			<div className='mt-4 flex items-center gap-2'>
				<input
					type='text'
					placeholder='Filter todos'
					className='input input-bordered w-full'
					value={filterValue}
					onChange={handleFilterChange}
				/>
				<div className='form-control'>
					<label className='cursor-pointer label'>
						<span className='label-text text-nowrap mr-2'>Completed</span>
						<input
							type='checkbox'
							className='checkbox checkbox-info'
							defaultChecked={completeStatus ?? false}
							onChange={handleCompleteFilterChange}
						/>
					</label>
				</div>
			</div>
		</div>
	);
};
