import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { Link } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles({
//   tableInput: {
//     width: '55px',
//     '& input': {
//       textAlign: 'center'
//     }
//   }
// });

const EditableExerciseTable = ({ exercises, onUpdateExercise, onDeleteExercise }) => {
  // const classes = useStyles();
  const [editingIndices, setEditingIndices] = useState([]);
  const [editedExercises, setEditedExercises] = useState({});

  // const handleEditClick = (index) => {
  //   setEditingIndices((prevIndices) => [...prevIndices, index]);
  //   setEditedExercises((prevExercises) => ({
  //     ...prevExercises,
  //     [index]: exercises[index]
  //   }));
  // };

  const handleSaveClick = (index) => {
    onUpdateExercise(editedExercises[index]);
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

  // const handleInputChange = (index, field, value) => {
  //   setEditedExercises((prevExercises) => ({
  //     ...prevExercises,
  //     [index]: {
  //       ...prevExercises[index],
  //       [field]: value
  //     }
  //   }));
  // };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Exercise Name</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {exercises.map((exercise, idx) => (
            <TableRow key={idx}>
              <TableCell>{exercise.exercise.exerciseName}</TableCell>

              <TableCell align="center">
                {editingIndices.includes(idx) ? (
                  <>
                    <IconButton onClick={() => handleSaveClick(idx)}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={() => handleCancelClick(idx)}>
                      <CancelIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Link to={`/workouts/edit/${exercise.id}`} state={{ exercise }}>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Link>

                    <IconButton onClick={() => onDeleteExercise(exercise.id, true)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EditableExerciseTable;
