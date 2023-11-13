import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

const EditableExerciseTable = ({ exercises, onDeleteExercise }) => {
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

              <TableCell>
                <Link to={`/workouts/edit/${exercise.id}`} state={{ exercise }}>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Link>

                <IconButton onClick={() => onDeleteExercise(exercise.id, true)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EditableExerciseTable;
