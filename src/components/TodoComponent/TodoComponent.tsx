import React, { useMemo, useState } from 'react';
import { generateBEMClassName } from '../../utils/strings.ts';
import { useAppStore } from '../../store/store.ts';
import TodoItem from './TodoItem.tsx';
import FooterComponent from '../FooterComponent/FooterComponent.tsx';
import { EFilters } from '../../utils/enums.ts';

interface ITodoComponent {}

const TodoComponent: React.FC<ITodoComponent> = () => {
	const BEMBlock = 'todo-component';

	const [todoText, setTodoText] = useState('');

	const { isLightMode, toggleLightMode, todos, filter, onCreateTodo } = useAppStore();

	const todosToShow = useMemo(() => {
		switch (filter) {
			case EFilters.ALL:
				return todos;

			case EFilters.ACTIVE:
				return todos?.filter((todo) => !todo?.isCompleted);

			case EFilters.COMPLETED:
				return todos?.filter((todo) => todo?.isCompleted);

			default:
				return todos;
		}
	}, [filter, todos]);

	const handleCreateTodo = () => {
		if (!todoText) return;
		onCreateTodo?.(todoText);
		setTodoText('');
	};

	return (
		<div className={generateBEMClassName({ block: BEMBlock, modifier: { name: 'light-mode', condition: isLightMode } })}>
			<div className={generateBEMClassName({ block: BEMBlock, element: 'header' })}>
				<div className={generateBEMClassName({ block: BEMBlock, element: 'title-container' })}>
					<h1 className={generateBEMClassName({ block: BEMBlock, element: 'title' })}>TODO</h1>
					<img
						src={isLightMode ? '/src/assets/icon-moon.svg' : '/src/assets/icon-sun.svg'}
						alt='moon-icon'
						className={generateBEMClassName({ block: BEMBlock, element: 'light-mode-icon' })}
						onClick={toggleLightMode}
					/>
				</div>
			</div>
			<div className={generateBEMClassName({ block: BEMBlock, element: 'body' })}>
				<div className={generateBEMClassName({ block: BEMBlock, element: 'create-container' })}>
					<span className={generateBEMClassName({ block: BEMBlock, element: 'create-checkbox' })} onClick={handleCreateTodo} />
					<input
						className={generateBEMClassName({ block: BEMBlock, element: 'create-input' })}
						placeholder={'Create a new todo...'}
						value={todoText}
						onChange={(e) => setTodoText(e.target.value)}
					/>
					<img
						src='/src/assets/icon-check.svg'
						alt='icon-check'
						className={generateBEMClassName({
							block: BEMBlock,
							element: 'checkbox-icon',
							modifier: { name: 'visible', condition: !!todoText },
						})}
						onClick={handleCreateTodo}
					/>
				</div>
				<div className={generateBEMClassName({ block: BEMBlock, element: 'list-container' })}>
					{todosToShow?.map((todo) => <TodoItem key={todo?.id} todo={todo} />)}
				</div>
			</div>
			<div className={generateBEMClassName({ block: BEMBlock, element: 'footer' })}>
				<FooterComponent />
			</div>
		</div>
	);
};

export default TodoComponent;
