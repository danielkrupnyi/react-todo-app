import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';

const App = () => {
	return (
		<main className='flex flex-col gap-6 justify-start items-center h-screen pt-12'>
			<div className='text-2xl uppercase'>todo app</div>
			<TodoHeader />
			<div className='w-[500px]'>
				<TodoList />
			</div>
		</main>
	);
};

export default App;
