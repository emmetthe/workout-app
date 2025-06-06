import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './hocs/PrivateRoute';
import ExerciseIndex from './components/exercise/exerciseIndex';
import ExercisePage from './components/exercise/exercisePage';
import ProgramPage from './components/workout-program/ProgramPage';
import EditExercisePage from './components/workout-program/editExercisePage';
import Login from './components/sessions/Login';
import Register from './components/sessions/Register';
import TestHome from './components/home/Home';
const routes = [
  { path: '/', element: <TestHome /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/exercises', element: <ExerciseIndex /> },
  {
    path: `/exercise/:exerciseName`,
    element: <ExercisePage />
  },
  {
    path: `/workouts/edit/:exerciseId`,
    element: <EditExercisePage />
  },
  {
    path: `/workouts/:id`,
    element: (
      <PrivateRoute>
        <ProgramPage />
      </PrivateRoute>
    )
  },
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
