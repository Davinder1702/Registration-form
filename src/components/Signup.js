import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const intitalvalues = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    date: null,
  };
  const getdata = JSON.parse(localStorage.getItem("userdata"));
  const [formvalues, setformvalues] = useState(intitalvalues);
  const [errors, seterrors] = useState({});

  const [users, setusers] = useState([]);

  const validate = (name, value) => {
    function isempty(key, value) {
      seterrors({ ...errors, [key]: `${key} cannot be empty ` });
    }

    switch (name) {
      case "name":
        if (!value || value.trim().length == 0) isempty("name", value);
        else if (!(value.length >= 3)) {
          seterrors({ ...errors, name: "name does have atleast 3 characters" });
        } else {
          seterrors({ ...errors, name: "" });
        }
        break;

      case "username":
        if (!value || value.trim().length == 0) isempty("username", value);
        else seterrors({ ...errors, username: "" });
        break;

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

      case "confirmpassword":
        if (!value) isempty("confirmpassword", value);
        else if (!(value == formvalues.password)) {
          seterrors({ ...errors, confirmpassword: "password does not match" });
        } else {
          seterrors({ ...errors, confirmpassword: "" });
        }
        break;

      case "date":
        if (!value) isempty("date", value);
        else if (checkAge(value) < 18) {
          seterrors({ ...errors, date: "age should be greater than 18" });
        } else {
          seterrors({ ...errors, date: "" });
        }
        break;

      default:
        break;
    }
  };

  const handlechange = (e) => {
    e.persist();
    const { name, value } = e.target;

    validate(e.target.name, e.target.value);

    setformvalues({ ...formvalues, [name]: value });
  };

  const navigate = useNavigate();
  const navigatelogin = () => {
    navigate("/Login");
  };
  let count = 0;
  const handleSubmit = (event) => {
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
    } else {
      console.log(getdata);
      let tempUsers = [];
      if (getdata) {
        tempUsers = [...getdata];
      } else {
        tempUsers = [...users];
      }
      tempUsers.push(formvalues);
      setusers(tempUsers);
      localStorage.setItem("userdata", JSON.stringify(tempUsers));
      navigatelogin();
    }

    // if (checkerrors() && isfilled()) {
    //   alert("submitted");
    // } else alert("please fill the above form  properly");
  };

  //   function checkerrors() {
  //     for (const err in Object.values(errors)) {
  //       console.log(err);
  //       if (!(err == "")) return true;
  //     }
  //     return false;
  //   }

  //   function isfilled() {
  //     for (const value in Object.values(formvalues)) {
  //       console.log("kesdfks", value, formvalues.value, value);
  //       if (value == "") return true;
  //     }
  //     return false;
  //   }

  function checkAge(datee) {
    var age = new Date() - new Date(datee);
    return Math.floor(age / 1000 / 60 / 60 / 24 / 365);
  }

  return (
    <div className="registration-form">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <h2>
            <center>SignUp</center>
          </h2>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control item"
            name="name"
            placeholder="Name"
            value={formvalues.name}
            onChange={handlechange}
          />
          <p>{errors.name}</p>
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control item"
            name="username"
            placeholder="Username"
            value={formvalues.username}
            onChange={handlechange}
            onBlur={handlechange}
          />
          <p>{errors.username}</p>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control item"
            name="email"
            placeholder="Email"
            value={formvalues.email}
            onChange={handlechange}
          />
          <p>{errors.email}</p>
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control item"
            name="password"
            placeholder="Password"
            value={formvalues.password}
            onChange={handlechange}
          />
          <p>{errors.password}</p>
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control item"
            name="confirmpassword"
            placeholder="confirm password"
            value={formvalues.confirmpassword}
            onChange={handlechange}
          />
          <p>{errors.confirmpassword}</p>
        </div>
        <div className="form-group">
          <input
            type="date"
            className="form-control item"
            name="date"
            placeholder="Birth Date"
            value={formvalues.date}
            onChange={handlechange}
          />
          <p>{errors.date}</p>
        </div>
        <div className="form-group">
          <button
            type="button"
            className="btn btn-block create-account"
            value="submit"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}
