import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  let [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Phone: 0,
    Email: "",
    Password: "",
    Gender: "Other",
    Birthday: "00-00-0000"
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successed, setSuccessed] = useState("");
  const [showError, setShowError] = useState([]);
  const [isLoading, setLoading] = useState(false);
  let Navigate = useNavigate();

  function getUser(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  async function subUser(e) {
    e.preventDefault();
    let validationSet = validation();

    if (validationSet.error) {
      setShowError(validationSet.error.details);
    } else {
      setLoading(true);
      try {
        let response = await axios.post(
          "http://testone2023-001-site1.htempurl.com/API%20for%20Notes/signup.php",
          JSON.stringify(user), // Send the user object as is, Axios will stringify it as JSON
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }

          }
        );

        if (
          response.data.message ===
          "Sign up was successful and verification email was sent."
        ) {
          console.log(response.data.message);
          setSuccessed(response.data.message);
          setLoading(false);
          Navigate(`/active/${user.Email}`);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          setErrorMessage(error.response.data.message);
          setLoading(false);
        }
      }
    }
  }



  function validation() {
    let schema = Joi.object({
      FirstName: Joi.string().alphanum().min(3).max(30).required(),
      LastName: Joi.string().alphanum().min(3).max(30).required(),
      Phone: Joi.number().integer().min(1000000000).max(12999999999).required(),
      Email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] }
      }),
      Password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      Birthday: Joi.allow(),
      Gender: Joi.allow()
    });
    return schema.validate(user, { abortEarly: false });
  }
  return (
    
    <div className="container  mx-auto mt-5">
      <div className="row">
        {errorMessage.length === 0 ? (
          ""
        ) : (
          <div className="alert alert-danger w-75 mx-auto" role="alert">
            {errorMessage}
          </div>
        )}
        {successed.length === 0 ? (
          ""
        ) : (
          <div className="alert alert-success w-75 mx-auto" role="alert">
            {successed}
          </div>
        )}
        <form action="">
          <div className="form-group col-12">
            <h2 className="mb-5">Registeration Form</h2>
            {showError.map((error , i) =>
              showError.length === 0 ? (
                ""
              ) : (
                <div key={i} className="alert alert-danger w-75 mx-auto">{error.message}</div>
               
              )
            )}
            <label htmlFor="FirstName:" name="FirstName">
              FirstName:
            </label>
            <input
              onChange={getUser}
              className="control-form col-12"
              name="FirstName"
              type="text"
            />
          </div>

          <div className="form-group col-12">
            <label htmlFor="LastName:" name="LastName">
              LastName
            </label>
            <input
              onChange={getUser}
              className="control-form col-12"
              name="LastName"
              type="text"
            />
          </div>
          <div className="form-group col-12">
            <label htmlFor="Password:" name="Password">
              Password
            </label>
            <input
              onChange={getUser}
              className="control-form col-12"
              name="Password"
              type="Password"
            />
          </div>
          <div className="form-group col-12">
            <label htmlFor="Phone:" name="Phone">
              Phone
            </label>
            <input
              onChange={getUser}
              className="control-form col-12"
              name="Phone"
              type="number"
            />
          </div>

          <div className="form-group col-12">
            <label htmlFor="Birthday" name="Birthday">
              Birthday
            </label>
            <input
              onChange={getUser}
              className="control-form col-12"
              name="Birthday"
              type="date"
            />
          </div>
          <div className="form-group col-12">
            <label htmlFor="Gender:" name="LastName">
              Gender
            </label>
            <select
              onChange={getUser}
              className="form-select"
              name="Gender"
              aria-label="Other"
            >
              <option value="Male">Other</option>
              <option value="Male">Male</option>
              <option value="FeMale">FeMale</option>
            </select>
          </div>
          <div className="form-group col-12">
            <label htmlFor="Email:" name="Email">
              Email
            </label>
            <input
              onChange={getUser}
              className="control-form col-12"
              name="Email"
              type="Email"
            />
            <div className=" d-flex justify-content-end">
              <button onClick={subUser} className="Register">
                {isLoading === true ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
