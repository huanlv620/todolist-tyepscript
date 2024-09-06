import classNames from 'classnames/bind';
import styles from './taskInput.module.scss';
import { useState } from 'react';
import { TodoListType } from '~/@types/Todo';

const cx = classNames.bind(styles);

interface TaskInputType {
    addTodo: (name: string) => void;
    currentTodo: TodoListType | null;
    editTodo: (name: string) => void;
    handleUpdateTodo: () => void;
}

function TaskInput(props: TaskInputType) {
    const { addTodo, currentTodo, editTodo, handleUpdateTodo } = props;
    const [name, setName] = useState('');
    console.log(name);
    const handleChangInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currentTodo) {
            editTodo(e.target.value);
        } else {
            setName(e.target.value);
        }
    };

    const handleAddTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (currentTodo) {
            handleUpdateTodo();
        } else {
            addTodo(name);
            setName('');
        }
    };

    return (
        <div className={cx('task-input')}>
            <h1>TaskList Typescript</h1>
            <form className={cx('task-input__row')}>
                <input
                    type='text'
                    placeholder='Captions goes here'
                    value={currentTodo ? currentTodo.name : name}
                    onChange={handleChangInput}
                />
                <button onClick={handleAddTodo}>{currentTodo ? '✔️' : ' ➕'}</button>
            </form>
        </div>
    );
}

export default TaskInput;
