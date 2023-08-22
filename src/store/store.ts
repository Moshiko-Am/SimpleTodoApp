import { create } from 'zustand';
import { EFilters } from '../utils/enums.ts';

export interface ITodo {
	id: number;
	text: string;
	isCompleted: boolean;
}

interface IAppState {
	isLightMode: boolean;
	toggleLightMode: () => void;
	todos: ITodo[];
	toggleTodo: (id: number) => void;
	onDeleteTodo: (id: number) => void;
	onCreateTodo: (text: string) => void;
	onClearCompletedClick: () => void;
	filter: EFilters;
	setFilter: (filter: EFilters) => void;
}

const todos: ITodo[] = [
	{
		id: 1,
		text: 'Learn React',
		isCompleted: true,
	},
	{
		id: 2,
		text: 'Learn TypeScript',
		isCompleted: false,
	},
	{
		id: 3,
		text: 'Learn GraphQL',
		isCompleted: false,
	},
];

export const useAppStore = create<IAppState>()((set) => ({
	isLightMode: false,
	toggleLightMode: () => set((state) => ({ isLightMode: !state.isLightMode })),
	todos: todos,
	toggleTodo: (id: number) => {
		set((state) => ({
			todos: state.todos.map((todo) => {
				if (todo.id === id) {
					return {
						...todo,
						isCompleted: !todo.isCompleted,
					};
				} else {
					return todo;
				}
			}),
		}));
	},
	onDeleteTodo: (id: number) => {
		set((state) => ({
			todos: state.todos.filter((todo) => todo.id !== id),
		}));
	},
	onCreateTodo: (text: string) => {
		set((state) => ({
			todos: [
				...state.todos,
				{
					id: state.todos.length + 1,
					text,
					isCompleted: false,
				},
			],
		}));
	},
	onClearCompletedClick: () => {
		set((state) => ({
			todos: state.todos.filter((todo) => !todo.isCompleted),
		}));
	},
	filter: EFilters.ALL,
	setFilter: (filter: EFilters) => {
		set(() => ({
			filter,
		}));
	},
}));
