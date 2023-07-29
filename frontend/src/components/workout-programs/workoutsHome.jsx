import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';

const WorkoutHome = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getSingleExercise();
  }, []);

  const getSingleExercise = async (id) => {
    const options = {
      method: 'GET',
      url: process.env.REACT_APP_GET_SINGLE_EXERCISE_API_URL + '20',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box>
        {Object.entries(data).map(([key, val], id) => (
          <Box key={id}>{`${key} : ${val}`} </Box>
        ))}
      </Box>
    </>
  );
};

export default WorkoutHome;
