import React, { useState } from 'react';
import axios from 'axios';

function SignUpForm() {
  const [currentUser, setCurrentUser] = useState({
    email: '',
    username: '',
    password: ''
  });

  const changeHandler = (e) => {
    const newUser = {
      ...currentUser,
      [e.target.name]: e.target.value
    };

    setCurrentUser(newUser);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/register', {
        email: currentUser.email,
        username: currentUser.username,
        password: currentUser.password
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
        <p>Email</p>
        <input type="text" name="email" onChange={changeHandler} />

        <p>username</p>
        <input type="text" name="username" onChange={changeHandler} />

        <p>password</p>
        <input type="password" name="password" onChange={changeHandler} />
        <input type="submit" name="Register" />
      </form>
    </div>
  );
}

export default SignUpForm;
