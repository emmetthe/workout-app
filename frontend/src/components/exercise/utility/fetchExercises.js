import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { convertToObject } from '../../../utils/convertToObject';

export const useFetchExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('data/workout-data1.csv');
        const csvData = await response.text();
        const parsedData = Papa.parse(csvData, { header: true }).data;
        const convertedOutput = parsedData.map((data) => convertToObject(data));
        const exerciseObjects = convertedOutput.filter((exercise) => exercise.exercise_name);
        exerciseObjects.sort((a, b) => a.exercise_name.localeCompare(b.exercise_name));
        const uniqueExerciseList = exerciseObjects.filter((v, i, a) => a.findIndex((v2) => v2.exercise_name === v.exercise_name) === i);

        setExercises(uniqueExerciseList);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching exercises:', error);
        setIsLoading(false);
      }
    };
    fetchExercises();
  }, []);

  return { exercises, isLoading };
};
