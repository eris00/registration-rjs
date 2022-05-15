import { useState, useEffect } from "react";
import './App.css';
// import axios from "axios";
import axiosInstance from "./services/api";

function App() {

  const initialValues = { userName: "", firstName: "", lastName: "", email: "", pass: "", confirmPass: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false); 

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    addUser({userName, firstName, lastName, email, pass})
    setUserName();
    setFirstName();
    setlastName();
    setEmail();
    setPass();
    
  };

  const addUser = async user => {
    const newUser = { ...user, done: false };
    try {
      const response = await axiosInstance.post("/todos", newUser);
      setUsers(oldUsers => [...oldUsers, response.data]);
    } catch (e) {
      console.log(e);
    }

  }

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {}
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

    if (!values.userName) {
      errors.userName = "username is required!";
    } else if(values.userName.length < 6) {
      errors.userName = "username must contain at least six characters!";
    } else if(values.userName.length > 12) {
      errors.userName = "username cannot contain more than twelve characters!";
    }

    if (!values.firstName) {
      errors.firstName = "First Name is required!";
    }

    if (!values.lastName) {
      errors.lastName = "Last Name is required!";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if(!regexEmail.test(values.email)) {
      errors.email = "Invalid format for E-mail!";
    }

    if (!values.pass) {
      errors.pass = "Password is required!";
    } else if(values.pass.length < 8) {
      errors.pass = "password must contain at least eight characters!!";
    } else if(!regexPwd.test(values.pass)) {
      errors.pass = "Password need to contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character";
    }

    if (!values.confirmPass) {
      errors.confirmPass = "Confirm your password!";
    } else if(!(values.confirmPass === values.pass)) {
      errors.confirmPass = "Passwords must match!";
    }
    return errors;

  };


  return (

    <div className="App">

    <div className="header">
        <h1>Create your account</h1>
    </div>

      <form onSubmit={handleSubmit}>
          <div className="wrapper">
            <div className="container">
              <div className="element">
                <label>User Name</label>
                <input type="text" name="userName" placeholder="user name" value={ formValues.userName } onChange={handleChange}></input>
              </div>
              <p>{ formErrors.userName }</p>
              <div className="element">
                <label>First Name</label>
                <input type="text" name="firstName" placeholder="first name" value={ formValues.firstName} onChange={handleChange}></input>
              </div>
              <p>{ formErrors.firstName }</p>
              <div className="element">
                <label>Last Name</label>
                <input type="text" name="lastName" placeholder="last name" value={ formValues.lastName} onChange={handleChange}></input>
              </div>
              <p>{ formErrors.lastName }</p>
              <div className="element">
                <label>E-mail</label>
                <input type="text" name="email" placeholder="example@example.com" value={ formValues.email} onChange={handleChange}></input>
              </div>
              <p>{ formErrors.email }</p>
              <div className="element">
                <label>Password</label>
                <input type="password" name="pass" placeholder="password" value={ formValues.pass} onChange={handleChange}></input>
              </div>
              <p>{ formErrors.pass }</p>
              <div className="element">
                <label>Confirm Password</label>
                <input type="password" name="confirmPass" placeholder="confirm password" value={ formValues.confirmPass} onChange={handleChange}></input>
              </div>
              <p>{ formErrors.confirmPass }</p>
              <button className="btn">Submit</button>
            </div>
          </div>
      </form>

    </div>

  );
}

export default App;
