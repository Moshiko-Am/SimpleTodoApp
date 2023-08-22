import React from 'react';
import { generateBEMClassName } from '../utils/strings.ts';
import BackgroundComponent from '../components/BackgroundComponent/BackgroundComponent.tsx';
import TodoComponent from '../components/TodoComponent/TodoComponent.tsx';
import { useAppStore } from '../store/store.ts';

interface IHomePage {}

const HomePage: React.FC<IHomePage> = () => {
	const { isLightMode } = useAppStore();

	return (
		<div
			className={generateBEMClassName({
				block: 'home-page',
				modifier: { name: 'light-mode', condition: isLightMode },
			})}
		>
			<BackgroundComponent />
			<TodoComponent />
		</div>
	);
};

export default HomePage;
