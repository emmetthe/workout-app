import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, TextField, Container } from '@mui/material';
import ExerciseFilter from './exerciseFilter';
import ExercisePagination from './exercisePagination';
import ExerciseList from './exerciseList';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  filter: {
    minWidth: 200,
    marginLeft: theme.spacing(2)
  }
}));

const ExerciseHome = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;
  const paginationRange = 5; // Show 5 page numbers at a time
  const [selectedMuscle, setSelectedMuscle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Fetch all exercises on component mount
    const fetchExercises = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_GET_ALL_EXERCISE_API_URL, {
          headers: {
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
            'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST
          }
        });
        // Sort exercises alphabetically by name
        response.data.sort((a, b) => a.exercise_name.localeCompare(b.exercise_name));
        // remove duplicate exercises
        let exerciseList = response.data.filter((v, i, a) => a.findIndex((v2) => v2.exercise_name === v.exercise_name) === i);

        setExercises(exerciseList);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };
    fetchExercises();
  }, []);

  useEffect(() => {
    // Filter exercises based on search query and selected muscle
    let filtered = exercises;

    if (searchQuery) {
      filtered = filtered.filter(
        (exercise) => exercise.exercise_name && exercise.exercise_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedMuscle) {
      filtered = filtered.filter((exercise) => exercise.target.Primary && exercise.target.Primary.includes(selectedMuscle));
    }

    if (selectedCategory) {
      filtered = filtered.filter((exercise) => exercise.Category && exercise.Category === selectedCategory);
    }

    setFilteredExercises(filtered);
    setCurrentPage(1); // Reset page to 1 whenever the search query or selected muscle changes
  }, [searchQuery, selectedMuscle, selectedCategory, exercises]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMuscleFilterChange = (event) => {
    setSelectedMuscle(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Pagination logic
  const totalExercises = filteredExercises.length;
  const totalPages = Math.ceil(totalExercises / exercisesPerPage);
  const lastPageInRange = Math.min(currentPage + paginationRange - 1, totalPages);
  const firstPageInRange = Math.max(lastPageInRange - paginationRange + 1, 1);
  const pageNumbers = Array.from({ length: lastPageInRange - firstPageInRange + 1 }, (_, index) => firstPageInRange + index);
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = filteredExercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const classes = useStyles();
  return (
    <Container>
      <div className={classes.filterContainer}>
        <TextField label="Search exercises" variant="outlined" value={searchQuery} onChange={handleSearchChange} fullWidth />

        {/* Filter by targeted muscle */}
        <div className={classes.filter}>
          <ExerciseFilter
            selectedMuscle={selectedMuscle}
            handleMuscleFilterChange={handleMuscleFilterChange}
            muscleOptions={Array.from(
              new Set(
                exercises
                  .filter((exercise) => exercise.target.Primary !== undefined)
                  .map((exercise) => exercise.target.Primary)
                  .flat()
              )
            ).sort((a, b) => a.localeCompare(b))}
            // category filters
            selectedCategory={selectedCategory}
            handleCategoryFilterChange={handleCategoryFilterChange}
            categoryOptions={Array.from(
              new Set(exercises.filter((exercise) => exercise.Category !== undefined).map((exercise) => exercise.Category))
            ).sort((a, b) => a.localeCompare(b))}
          />
        </div>
      </div>

      {/* Display exercise list */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ExerciseList exercises={currentExercises} />
        </Grid>

        {/* Pagination controls */}
        <Grid item xs={12}>
          <ExercisePagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            handlePageChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExerciseHome;