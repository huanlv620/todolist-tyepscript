import classNames from 'classnames/bind';
import styles from './todoList.module.scss';
import TaskInput from '../TaskInput';
import TaskList from '../TaskList';
import { useState } from 'react';
import { TodoListType } from '~/@types/Todo';

const cx = classNames.bind(styles);

function TodoList() {
    const [todos, setTodos] = useState<TodoListType[]>([]);
    console.log(todos);
    const [currentTodo, setCurrenTodo] = useState<TodoListType | null>(null);

    const notDoneTodos = todos.filter((todo) => !todo.done);
    const doneTodos = todos.filter((todo) => todo.done);

    const addTodo = (name: string) => {
        setTodos((prev) => {
            const todo = {
                id: new Date().toISOString(),
                done: false,
                name,
            };
            return [...prev, todo];
        });
    };

    const StartEditTodo = (id: string) => {
        const todo = todos.find((todo) => todo.id === id);
        if (todo) {
            setCurrenTodo(todo);
        }
    };

    const editTodo = (name: string) => {
        setCurrenTodo((prev) => {
            if (prev) {
                return {
                    ...prev,
                    name,
                };
            }
            return null;
        });
    };

    const handleUpdateTodo = () => {
        setTodos((prev) => {
            return prev.map((todo) => {
                if (todo.id === currentTodo?.id) {
                    return currentTodo;
                }
                return todo;
            });
        });
        setCurrenTodo(null);
    };
    const deleteTodo = (id: string) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos((prev) => {
            return newTodos;
        });
        setCurrenTodo(null);
    };

    const handleCheck = (id: string) => {
        console.log(id);
        setTodos((prev) => {
            return prev.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, done: !todo.done };
                }
                return todo;
            });
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
                StartEditTodo={StartEditTodo}
                deleteTodo={deleteTodo}
                handleCheck={handleCheck}
            />
            <TaskList
                DoneTodo
                ListTodo={doneTodos}
                StartEditTodo={StartEditTodo}
                deleteTodo={deleteTodo}
                handleCheck={handleCheck}
            />
        </div>
    );
}

export default TodoList;
