import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { TodoListType } from '~/@types/Todo';
import styles from './taskInput.module.scss';
import { TodoTypes } from '~/PropTypes/todo.proptypes';

const cx = classNames.bind(styles);

interface TaskInputType {
    currentTodo: TodoListType | null;
    addTodo: (name: string) => void;
    editTodo: (name: string) => void;
    handleUpdateTodo: () => void;
}

function TaskInput(props: TaskInputType) {
    const { addTodo, currentTodo, editTodo, handleUpdateTodo } = props;
    const [name, setName] = useState<string>('');

    const handleChangInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        currentTodo ? editTodo(e.target.value) : setName(e.target.value);
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

TaskInput.propTypes = {
    addTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    handleUpdateTodo: PropTypes.func.isRequired,
    currentTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])]),
};
