import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [formInput, setFormInput] = useState({
    username: '',
    password: ''
  });

  const changeHandler = (e) => {
    const newInput = {
      ...formInput,
      [e.target.name]: e.target.value
    };
    setFormInput(newInput);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/login', {
        username: formInput.username,
        password: formInput.password
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <p>Username</p>
        <input type="text" name="username" value={formInput.username} onChange={changeHandler} required />

        <p>Password</p>
        <input type="password" name="password" value={formInput.password} onChange={changeHandler} required />
        <input type="submit" name="Login" />
      </form>
    </div>
  );
}

export default LoginForm;
