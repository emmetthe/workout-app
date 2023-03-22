import React, { useState } from 'react';

function LoginForm() {
  const [currentUser, setCurrentUser] = useState({});

  const changeHandler = () => {};
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="text" name="username" onChange={changeHandler} />
        <input type="password" name="password" onChange={changeHandler} />
        <input type="submit" name="Login" />
      </form>
    </div>
  );
}

export default LoginForm;
