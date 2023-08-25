import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Input } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';


const EditableExerciseTable = ({ exercises, onUpdateExercise, onDeleteExercise }) => {
  const [editingIndices, setEditingIndices] = useState([]);
  const [editedExercises, setEditedExercises] = useState({});

  const handleEditClick = (index) => {
    setEditingIndices((prevIndices) => [...prevIndices, index]);
    setEditedExercises((prevExercises) => ({
      ...prevExercises,
      [index]: exercises[index]
    }));
  };

  const handleSaveClick = (index) => {
    onUpdateExercise(editedExercises[index], index);
    setEditingIndices((prevIndices) => prevIndices.filter((i) => i !== index));
    setEditedExercises((prevExercises) => {
      const updatedExercises = { ...prevExercises };
      delete updatedExercises[index];
      return updatedExercises;
    });
  };

  const handleCancelClick = (index) => {
    setEditingIndices((prevIndices) => prevIndices.filter((i) => i !== index));
    setEditedExercises((prevExercises) => {
      const updatedExercises = { ...prevExercises };
      delete updatedExercises[index];
      return updatedExercises;
    });
  };

  const handleInputChange = (index, field, value) => {
    setEditedExercises((prevExercises) => ({
      ...prevExercises,
      [index]: {
        ...prevExercises[index],
        [field]: value
      }
    }));
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Exercise Name</TableCell>
            <TableCell align="center">Reps</TableCell>
            <TableCell align="center">Sets</TableCell>
            <TableCell align="center">Weight (lbs)</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {exercises.map((exercise, idx) => (
            <TableRow key={idx}>
              <TableCell>{exercise.exercise.exerciseName}</TableCell>
              {editingIndices.includes(idx) ? (
                <>
                  <TableCell align="center">
                    <Input value={editedExercises[idx]?.reps || ''} onChange={(e) => handleInputChange(idx, 'reps', e.target.value)} />
                  </TableCell>
                  <TableCell align="center">
                    <Input value={editedExercises[idx]?.sets || ''} onChange={(e) => handleInputChange(idx, 'sets', e.target.value)} />
                  </TableCell>
                  <TableCell align="center">
                    <Input value={editedExercises[idx]?.weight || ''} onChange={(e) => handleInputChange(idx, 'weight', e.target.value)} />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleSaveClick(idx)}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={() => handleCancelClick(idx)}>
                      <CancelIcon />
                    </IconButton>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell align="center">{exercise?.reps || ''}</TableCell>
                  <TableCell align="center">{exercise?.sets || ''}</TableCell>
                  <TableCell align="center">{exercise?.weight || ''}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleEditClick(idx)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDeleteExercise(exercise.id, true)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EditableExerciseTable;
