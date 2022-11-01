import React, { useState } from "react";
const Login = () => {
  const stored = JSON.parse(localStorage.getItem("userdata"));
  const intitalvalues = {
    email: "",
    password: "",
  };

  const [formvalues, setformvalues] = useState(intitalvalues);
  const [errors, seterrors] = useState({});

  const validate = (name, value) => {
    function isempty(key, value) {
      seterrors({ ...errors, [key]: `${key} cannot be empty ` });
    }

    switch (name) {
      case "email":
        if (!value) isempty("email", value);
        else if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          seterrors({ ...errors, email: "enter a valid email addresss" });
        } else {
          seterrors({ ...errors, email: "" });
        }
        break;

      case "password":
        if (!value) isempty("password", value);
        else if (
          !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
        ) {
          seterrors({
            ...errors,
            password:
              "password should be atleast 8 characters and should contain uppercase and numbers too.",
          });
        } else {
          seterrors({ ...errors, password: "" });
        }
        break;

      default:
        break;
    }
  };

  const loginchange = (e) => {
    console.log("changin");
    e.persist();
    const { name, value } = e.target;

    validate(e.target.name, e.target.value);

    setformvalues({ ...formvalues, [name]: value });
  };

  const loginsubmit = (event) => {
    event.preventDefault();
    let keys = Object.keys(errors);
    let values = Object.values(errors);

    let fkeys = Object.keys(formvalues);
    let fvalues = Object.values(formvalues);

    let flag = false;
    keys.map((item, index) => {
      if (values[index] !== "") {
        flag = true;
      }
    });
    fkeys.map((item, index) => {
      if (fvalues[index] == "") {
        flag = true;
      }
    });

    if (flag) {
      alert("Please submit the form!!! ");
      console.log(values, fvalues);
    } else {
      let temp = true;
      stored.forEach((obj) => {
        if (
          obj.email == formvalues.email &&
          obj.password == formvalues.password
        ) {
          alert("login successfully");
          temp = false;
        } else alert("data not found");
      });
    }
  };

  return (
    <div className="registration-form">
      <form onSubmit={loginsubmit}>
        <div className="header">
          <h2>
            <center>Login</center>
          </h2>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control item"
            name="email"
            placeholder="Email"
            onChange={loginchange}
          />
          <p>{errors.email}</p>
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control item"
            name="password"
            placeholder="Password"
            onChange={loginchange}
          />
          <p>{errors.password}</p>
        </div>

        <div className="form-group">
          <button
            type="button"
            className="btn btn-block create-account"
            value="submit"
            onClick={loginsubmit}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
