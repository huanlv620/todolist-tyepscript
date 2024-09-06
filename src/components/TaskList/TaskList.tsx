import classNames from 'classnames/bind';
import styles from './TaskList.module.scss';
import { TodoListType } from '~/@types/Todo';

const cx = classNames.bind(styles);
interface TaskListType {
    DoneTodo: boolean;
    ListTodo: TodoListType[];
    StartEditTodo: (name: string) => void;
    deleteTodo: (id: string) => void;
    handleCheck: (id: string) => void;
}
function TaskList(props: TaskListType) {
    const { DoneTodo, ListTodo, StartEditTodo, deleteTodo, handleCheck } = props;
    return (
        <div className={cx('task-list')}>
            <h2>{DoneTodo ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
            {ListTodo.map((todo) => (
                <div className={cx('task-list__row')} key={todo.id}>
                    <input
                        type='checkbox'
                        checked={DoneTodo}
                        onChange={() => {
                            handleCheck(todo.id);
                        }}
                    />
                    <span
                        className={cx('task-list__text', {
                            'task-list__text-done': DoneTodo,
                        })}
                    >
                        {todo.name}
                    </span>
                    <div className={cx('task-list__actions')}>
                        <button
                            onClick={() => {
                                StartEditTodo(todo.id);
                            }}
                        >
                            🖋️
                        </button>
                        <button
                            onClick={() => {
                                deleteTodo(todo.id);
                            }}
                        >
                            🗑️
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TaskList;
