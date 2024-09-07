import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './todoList.module.scss';
import { TodoListType } from '~/@types/Todo';
import TaskInput from '~/components/TaskInput';
import TaskList from '~/components/TaskList';

const cx = classNames.bind(styles);

function TodoList() {
    const [todos, setTodos] = useState<TodoListType[]>(() => {
        const storageTodos = localStorage.getItem('todos');
        const initTodos = JSON.parse(storageTodos || '[]');
        return initTodos;
    });

    const [currentTodo, setCurrenTodo] = useState<TodoListType | null>(null);

    const doneTodos = todos.filter((todo) => todo.done);
    const notDoneTodos = todos.filter((todo) => !todo.done);

    const addTodo = (name: string) => {
        setTodos((prev) => {
            const todo = {
                id: new Date().toISOString(),
                done: false,
                name,
            };
            const newTodos = [...prev, todo];
            const todosJson = JSON.stringify(newTodos);
            localStorage.setItem('todos', todosJson);
            return newTodos;
        });
    };

    const startEditTodo = (id: string) => {
        const todo = todos.find((todo) => todo.id === id);
        if (todo) {
            setCurrenTodo(todo);
        }
    };

    const editTodo = (name: string) => {
        setCurrenTodo((prev) => {
            if (prev) {
                const newTodos = {
                    ...prev,
                    name,
                };
                const todosJson = JSON.stringify(newTodos);
                localStorage.setItem('todos', todosJson);
                return newTodos;
            }
            return null;
        });
    };

    const handleUpdateTodo = () => {
        setTodos((prev) => {
            const newTodos = prev.map((todo) => (todo.id === currentTodo?.id ? currentTodo : todo));
            const todosJson = JSON.stringify(newTodos);
            localStorage.setItem('todos', todosJson);
            return newTodos;
        });
        setCurrenTodo(null);
    };

    const deleteTodo = (id: string) => {
        setTodos((prev) => {
            const newTodos = todos.filter((todo) => todo.id !== id);
            const todosJson = JSON.stringify(newTodos);
            localStorage.setItem('todos', todosJson);
            return newTodos;
        });
        setCurrenTodo(null);
    };

    const handleCheck = (id: string) => {
        setTodos((prev) => {
            const newTodos = prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo));
            const todosJson = JSON.stringify(newTodos);
            localStorage.setItem('todos', todosJson);
            return newTodos;
        });
    };

    return (
        <div className={cx('task-list')}>
            <TaskInput
                addTodo={addTodo}
                currentTodo={currentTodo}
                editTodo={editTodo}
                handleUpdateTodo={handleUpdateTodo}
            />
            <TaskList
                DoneTodo={false}
                ListTodo={notDoneTodos}
                startEditTodo={startEditTodo}
                deleteTodo={deleteTodo}
                handleCheck={handleCheck}
            />
            <TaskList
                DoneTodo
                ListTodo={doneTodos}
                startEditTodo={startEditTodo}
                deleteTodo={deleteTodo}
                handleCheck={handleCheck}
            />
        </div>
    );
}

export default TodoList;
