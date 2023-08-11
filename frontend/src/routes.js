import Home from './components/home/Home';
import Register from './components/sessions/Register';
import Login from './components/sessions/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './hocs/PrivateRoute';
import ExerciseHome from './components/exercise/exerciseHome';
import ExercisePage from './components/exercise/exercisePage';
import WorkoutCard from './components/workout-program/workoutCard';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/exercises', element: <ExerciseHome /> },
  {
    path: `/exercise/:exerciseName`,
    element: <ExercisePage />
  },
  { path: `/workouts/:id`, element: <WorkoutCard /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    )
  }
];

export default routes;
