import React from 'react';
import { generateBEMClassName } from '../../utils/strings.ts';
import { useAppStore } from '../../store/store.ts';
import { EFilters } from '../../utils/enums.ts';

interface IFooterComponent {}

const FooterComponent: React.FC<IFooterComponent> = () => {
	const BEMBlock = 'footer-component';

	const { todos, filter, setFilter, onClearCompletedClick } = useAppStore();

	if (todos?.length <= 0) return null;

	return (
		<div className={generateBEMClassName({ block: BEMBlock })}>
			<span
				className={generateBEMClassName({
					block: BEMBlock,
					element: 'list-length',
				})}
			>
				{todos?.filter((todo) => !todo?.isCompleted).length} items left
			</span>
			<div className={generateBEMClassName({ block: BEMBlock, element: 'filters-container' })}>
				{Object.values(EFilters).map((todoFilter) => (
					<span
						key={`todo-filter-${todoFilter}`}
						className={generateBEMClassName({
							block: BEMBlock,
							element: 'filter-item',
							modifier: { name: 'selected', condition: todoFilter === filter },
						})}
						onClick={() => setFilter(todoFilter)}
					>
						{todoFilter}
					</span>
				))}
			</div>
			<span className={generateBEMClassName({ block: BEMBlock, element: 'clear-completed' })} onClick={onClearCompletedClick}>
				Clear Completed
			</span>
		</div>
	);
};

export default FooterComponent;
