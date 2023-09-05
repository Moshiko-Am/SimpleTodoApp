import React from 'react';
import { ITodo, useAppStore } from '../../store/store.ts';
import { generateBEMClassName } from '../../utils/strings.ts';
import { AnimatePresence, motion } from 'framer-motion';

interface ITodoItem {
	todo: ITodo;
}

const TodoItem: React.FC<ITodoItem> = ({ todo }) => {
	const BEMBlock = 'todo-item';

	const { toggleTodo, onDeleteTodo } = useAppStore();

	return (
		<AnimatePresence>
			<motion.div
				className={generateBEMClassName({ block: BEMBlock })}
				onClick={() => toggleTodo(todo?.id)}
				initial={{
					opacity: 0,
					scale: 1.5,
				}}
				animate={{ opacity: 1, x: 0, scale: 1 }}
				transition={{ duration: 0.1 }}
			>
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
			</motion.div>
		</AnimatePresence>
	);
};

export default TodoItem;
