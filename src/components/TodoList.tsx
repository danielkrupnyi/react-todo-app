import { useSelector } from 'react-redux';
import { typeRootState } from '../store/store';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
	const todos = useSelector((state: typeRootState) => state.todos);
	const filterValue = useSelector(
		(state: typeRootState) => state.todos.filterValue
	);
	const completeStatus = useSelector(
		(state: typeRootState) => state.todos.completeStatus
	);

	const getFilteredTodos = () => {
		if (completeStatus) {
			const completed = todos.data.filter((todo) => todo.completed);
			const filtered = completed.filter((todo) =>
				todo.name.toLowerCase().includes(filterValue.toLowerCase())
			);
			return filtered;
		}
		return todos.data.filter((todo) =>
			todo.name.toLowerCase().includes(filterValue.toLowerCase())
		);
	};

	const filteredTodos = getFilteredTodos();

	return (
		<ul className='flex flex-col gap-4 mb-12'>
			{todos.data
				? filteredTodos.map((item) => <TodoItem key={item.id} data={item} />)
				: 'Nothing here yet'}
		</ul>
	);
};
