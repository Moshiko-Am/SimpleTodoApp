import React from 'react';
import { ITodo, useAppStore } from '../../store/store.ts';
import { generateBEMClassName } from '../../utils/strings.ts';

interface ITodoItem {
	todo: ITodo;
}

const TodoItem: React.FC<ITodoItem> = ({ todo }) => {
	const BEMBlock = 'todo-item';

	const { toggleTodo, onDeleteTodo } = useAppStore();

	return (
		<div className={generateBEMClassName({ block: BEMBlock })} onClick={() => toggleTodo(todo?.id)}>
			<span
				className={generateBEMClassName({
					block: BEMBlock,
					element: 'select-checkbox',
					modifier: { name: 'completed', condition: todo?.isCompleted },
				})}
			>
				<img
					src='/src/assets/icon-check.svg'
					alt='icon-check'
					className={generateBEMClassName({
						block: BEMBlock,
						element: 'checkbox-icon',
						modifier: { name: 'visible', condition: todo?.isCompleted },
					})}
				/>
			</span>
			<span
				className={generateBEMClassName({
					block: BEMBlock,
					element: 'todo-text',
					modifier: { name: 'completed', condition: todo?.isCompleted },
				})}
			>
				{todo?.text}
			</span>
			<img
				src='/src/assets/icon-cross.svg'
				alt='icon-cross'
				className={generateBEMClassName({ block: BEMBlock, element: 'delete-icon' })}
				onClick={() => onDeleteTodo(todo?.id)}
			/>
		</div>
	);
};

export default TodoItem;
