import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, TextField, Container, CircularProgress } from '@mui/material';
import ExerciseFilter from './exerciseFilter';
import ExercisePagination from './exercisePagination';
import ExerciseList from './exerciseList';
import Autocomplete from '@mui/material/Autocomplete';
import Papa from 'papaparse';
import { convertToObject } from '../../utils/convertToObject';

const ExerciseHome = () => {
  // State variables
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMuscle, setSelectedMuscle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const exercisesPerPage = 9;
  const paginationRange = 5; // Show 5 page numbers at a time

  // Fetch all exercises on component mount
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        // Show the loading indicator
        setIsLoading(true);
        const response = await axios.get('/static/workout-data1.csv');
        const parsedData = Papa.parse(response.data, { header: true }).data;

        // remove double quotes wrapping nested arrays and objects
        const convertedOutput = parsedData.map((data) => convertToObject(data));

        // Filter out entries with undefined exercise_name
        const exerciseObjects = convertedOutput.filter((exercise) => exercise.exercise_name);

        // Sort exercises alphabetically by name
        exerciseObjects.sort((a, b) => a.exercise_name.localeCompare(b.exercise_name));

        // Remove duplicate exercises
        const uniqueExerciseList = exerciseObjects.filter((v, i, a) => a.findIndex((v2) => v2.exercise_name === v.exercise_name) === i);

        setExercises(uniqueExerciseList);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching exercises:', error);
        // Hide the loading indicator in case of an error
        setIsLoading(false);
      }
    };
    fetchExercises();
  }, []);

  // Filter exercises based on search query and selected muscle
  useEffect(() => {
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

  const handleSearchChange = (event, newValue) => {
    setSearchQuery(newValue);
  };

  const handleFilterChange = (event, val, filterType) => {
    if (val === true) {
      // Clear the filters
      setSelectedMuscle('');
      setSelectedCategory('');
    } else {
      // Set the selected filters according to the filter type
      const newValue = event.target.value;
      if (filterType === 'muscle') {
        setSelectedMuscle(newValue);
      } else if (filterType === 'category') {
        setSelectedCategory(newValue);
      }
    }
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

  // create unique list of muscle for filters
  const muscleList = Array.from(
    new Set(
      exercises
        .filter((exercise) => exercise.target.Primary !== undefined)
        .map((exercise) => exercise.target.Primary)
        .flat()
    )
  );
  // create unique list of categories for filters
  const categoryList = Array.from(
    new Set(
      exercises
        .filter((exercise) => exercise.Category !== undefined)
        .map((exercise) => exercise.Category)
        .flat()
    )
  );

  return (
    <Container>
      {/* filters */}
      <ExerciseFilter
        muscles={{
          all: muscleList,
          selected: selectedMuscle
        }}
        categories={{
          all: categoryList,
          selected: selectedCategory
        }}
        onFilterChange={handleFilterChange}
      />

      {/* search bar */}
      <Autocomplete
        freeSolo
        options={
          filteredExercises.length > 0
            ? filteredExercises.map((exercise) => exercise.exercise_name)
            : exercises.map((exercise) => exercise.exercise_name)
        }
        value={searchQuery}
        onChange={handleSearchChange}
        renderInput={(params) => <TextField {...params} label="Search exercises" variant="outlined" fullWidth sx={{ marginBottom: 5 }} />}
      />

      {/* Circular Progress while fetching exercise data */}
      {isLoading ? (
        <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          {/* exercise list */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ExerciseList exercises={currentExercises} />
            </Grid>

            {/* pagination controls */}
            <Grid item xs={12}>
              <ExercisePagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageNumbers={pageNumbers}
                handlePageChange={setCurrentPage}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ExerciseHome;
