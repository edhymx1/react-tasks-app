import React, { useState, useRef } from 'react';
import './App.css';

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<ITask[]>([]);

  const taskInput = useRef<HTMLInputElement>(null);

  const hangeleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('');
    taskInput.current?.focus();
  };

  const addTask = (name: string) => {
    const newTasks = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (key: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[key].done = !newTasks[key].done;
    setTasks(newTasks);
  };

  const removeTask = (key: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(key, 1);
    setTasks(newTasks);
  };

  return (
    <div className='container p-4'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <div className='card'>
            <div className='card-body'>
              <form onSubmit={hangeleSubmit}>
                <input
                  className='form-control'
                  type='text'
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  autoFocus={true}
                  ref={taskInput}
                />
                <button className='btn btn-success btn-block mt-2'>Save</button>
              </form>
            </div>
          </div>
          {tasks.map((t: ITask, i: number) => (
            <div className='card card-body mt-2' key={i}>
              <h2 style={{ textDecoration: t.done ? 'line-through' : '' }}>{t.name}</h2>
              <div>
                <button className='btn btn-secondary' onClick={() => toggleDoneTask(i)}>
                  {t.done ? '✔' : '✕'}
                </button>
                <button className='btn btn-danger' onClick={() => removeTask(i)}>
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
