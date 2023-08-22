import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Signup.css";
import swal from "sweetalert";
import { nanoid } from "nanoid";

function Signup() {
  const [fname, setFname] = useState("");
  const [phone, setPhone] = useState(""); // Updated state variable
  const [email, setEmail] = useState("");

  let navigate = useNavigate();

  function handleChangeFName(e) {
    setFname(e.target.value);
  }

  function handlePhoneNumber(e) {
    setPhone(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(String(email).toLowerCase());
  }

  function validatePhoneNumber(phone) {
    const regex = /^[0-9]{10}$/; // Example: 10 digits only
    return regex.test(phone);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      swal("Invalid Email!", "Please enter a valid email address", "warning");
      return;
    }
  
    if (!validatePhoneNumber(phone)) {
      swal("Invalid Phone Number!", "Please enter a valid phone number", "warning");
      return;
    }

    let dataUser = {
      id: nanoid(4),
      fname,
      phone,
      email,
    };

    let olddata = localStorage.getItem("users");
    if (olddata == null) {
      olddata = [];
      olddata.push(dataUser);
      localStorage.setItem("users", JSON.stringify(olddata));
    } else {
      let oldArr = JSON.parse(olddata);
      oldArr.push(dataUser);
      localStorage.setItem("users", JSON.stringify(oldArr));
    }

    swal({
      title: "Registration Successful!",
      text: "Congratulations! You are signed up!",
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
        navigate("/post");
      }
    });

    setFname("");
    setPhone("");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} className="forms">
      <input
        placeholder="Name"
        type="text"
        onChange={handleChangeFName}
        value={fname}
        required
      />
      <input
        placeholder="Phone Number"
        type="text"
        onChange={handlePhoneNumber}
        value={phone}
        required
      />
      <input
        placeholder="email"
        type="email"
        onChange={handleEmail}
        value={email}
        required
      />

      <button className="SignUpButton"> Register</button>
      
    </form>
  );
}

export default Signup;
