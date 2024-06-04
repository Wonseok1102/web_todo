// components/TodoList.js
import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask';
import Card from './Card';
import { Container, Typography } from '@mui/material';
import '../App.css';

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    let arr = localStorage.getItem('taskList');
    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  const deleteTask = (index) => {
    const updatedList = taskList.filter((_, i) => i !== index);
    localStorage.setItem('taskList', JSON.stringify(updatedList));
    setTaskList(updatedList);
  };

  const updateListArray = (obj, index) => {
    const updatedList = taskList.map((task, i) => (i === index ? obj : task));
    localStorage.setItem('taskList', JSON.stringify(updatedList));
    setTaskList(updatedList);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    const tempList = [...taskList, taskObj];
    localStorage.setItem('taskList', JSON.stringify(tempList));
    setTaskList(tempList);
    setModal(false);
  };

  const handleCheckboxChange = (index) => {
    const updatedTasks = taskList.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTaskList(updatedTasks);
    localStorage.setItem('taskList', JSON.stringify(updatedTasks));
  };

  return (
    <Container>
      <div className="header text-center">
        <Typography variant="h4">Todo List</Typography>
        <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>Create Task</button>
      </div>
      <div className="task-container">
        {taskList && taskList.map((task, index) => (
          <Card
            key={index}
            taskObj={task}
            index={index}
            deleteTask={deleteTask}
            updateListArray={updateListArray}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </Container>
  );
};

export default TodoList;
