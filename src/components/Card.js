// components/Card.js
import React, { useState } from 'react';
import EditTask from '../modals/EditTask';
import { Card as MuiCard, CardContent, Typography, Checkbox, FormControlLabel } from '@mui/material';
import '../App.css';

const Card = ({ taskObj, index, deleteTask, updateListArray, handleCheckboxChange }) => {
  const [modal, setModal] = useState(false);

  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC"
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1"
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1"
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1"
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD"
    }
  ];

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    updateListArray(obj, index);
  };

  const handleDelete = () => {
    deleteTask(index);
  };

  return (
    <MuiCard className={`card-container ${taskObj.completed ? 'completed' : ''}`} key={index}>
      <CardContent>
        <Typography variant="h5" className="card-header" style={{ backgroundColor: colors[index % 5].secondaryColor, borderRadius: '10px' }}>
          {taskObj.Name}
        </Typography>
        <Typography className="mt-3">
          {taskObj.Description}
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={taskObj.completed}
              onChange={() => handleCheckboxChange(index)}
            />
          }
          label="Completed"
        />
        <div style={{ position: 'relative', marginTop: '20px' }}>
          <button style={{ color: colors[index % 5].primaryColor, cursor: 'pointer', marginRight: '10px' }} onClick={() => setModal(true)}>Edit</button>
          <button style={{ color: colors[index % 5].primaryColor, cursor: 'pointer' }} onClick={handleDelete}>Delete</button>
        </div>
        <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
      </CardContent>
    </MuiCard>
  );
};

export default Card;
