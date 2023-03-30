import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './session/loginForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginForm />} />
        {/* <Route path="signin" /> */}
        <Route path="/" element={'testing react routes'} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
