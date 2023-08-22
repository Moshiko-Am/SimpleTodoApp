import React from 'react';
import { generateBEMClassName } from '../../utils/strings.ts';
import { useAppStore } from '../../store/store.ts';

interface IBackgroundComponent {}

const BackgroundComponent: React.FC<IBackgroundComponent> = () => {
	const { isLightMode } = useAppStore();

	return (
		<div
			className={generateBEMClassName({
				block: 'background-component',
				modifier: { name: 'light-mode', condition: isLightMode },
			})}
		/>
	);
};

export default BackgroundComponent;
