import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import swal from 'sweetalert';
import { nanoid } from 'nanoid';
import './Signup.css';
import { NavLink } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem("users")) {
      const data = JSON.parse(localStorage.getItem("users"));
      console.log(data);
    }
  }, []);
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setLogin(true);
      localStorage.setItem("currentUser", JSON.stringify(user));

      swal({
        title: "Login Successful!",
        text: "Congratulations! You Are Succesfully Login!",
        icon: "success",
        buttons: {
          confirm: {
            text: "Okay",
            value: true,
            visible: true,

            closeModal: true,
          },
        },
        dangerMode: false,
      }).then((value) => {
        if (value) {
          navigate("/");
        }
      });
    } else {
      swal({
        title: "User not found!",
        text: "Enter valid credentials!",
        icon: "error",
        buttons: {
          confirm: {
            text: "Okay",
            value: true,
            visible: true,

            closeModal: true,
          },
        },
        dangerMode: false,
      });
    }
  };


  return (
    <form className="forms" onSubmit={handleSubmit}>
      <input
        placeholder="email"
        type="email"
        onChange={handleEmail}
        value={email}
        required
      />
      <input
        placeholder="password"
        type="password"
        onChange={handlePassword}
        value={password}
        required
      />
      <button className="LoginButton">Login</button>
      <h5>
        don't have an account?{" "}
        <NavLink style={{ color: "blue" }} to="/signup">
          Sign Up 
        </NavLink>
      </h5>
    </form>
  )
}

export default Login
