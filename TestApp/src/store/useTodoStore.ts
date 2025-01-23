import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createJSONStorage, persist} from 'zustand/middleware';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  favorite: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    set => ({
      todos: [],
      addTodo: text =>
        set(state => ({
          todos: [
            ...state.todos,
            {
              id: Math.random().toString(),
              text,
              completed: false,
              favorite: false,
            },
          ],
        })),
      toggleTodo: id =>
        set(state => ({
          todos: state.todos.map(todo =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo,
          ),
        })),
      removeTodo: id =>
        set(state => ({
          todos: state.todos.filter(todo => todo.id !== id),
        })),
      toggleFavorite: id =>
        set(state => ({
          todos: state.todos.map(todo =>
            todo.id === id ? {...todo, favorite: !todo.favorite} : todo,
          ),
        })),
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
