import Home from './components/home/Home';
import Register from './components/sessions/Register';
import Login from './components/sessions/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './hocs/PrivateRoute';
import WorkoutHome from './components/workout-programs/workoutsHome';
import ExercisePage from './components/exercise/exercisePage';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/workouts', element: <WorkoutHome /> },
  { path: `/exercise/:exerciseName`, element: <ExercisePage /> },
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
