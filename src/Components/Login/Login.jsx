import React, { useState } from "react";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
export default function Login(props) {
  let [user, setUser] = useState({
    Email: "",
    Password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState([]);
  const [isLoading, setLoading] = useState(false);
  let Navigate = useNavigate()
 
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
          "http://testone2023-001-site1.htempurl.com/API%20for%20Notes/userinfo.php",
          JSON.stringify(user), 
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }

          }
         
        );

        if (response.data.Code === 200) {
          setLoading(false);
          Navigate(`/home`)
          localStorage.setItem('userData', JSON.stringify(response.data.data));
          props.userSendData()
        }
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
          setLoading(false);
        }
      }
    }
  }

  function validation() {
    let schema = Joi.object({
      Email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] }
      }),
      Password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
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
        <form action="">
          <div className="form-group col-12">
            <h2 className="mb-5">LogIn Form</h2>
            {showError.map((error ,i) =>
              showError.length === 0 ? (
                ""
              ) : (
                <div key={i} className="alert alert-danger w-75 mx-auto">{error.message}</div>
              )
            )}
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
            <div className=" d-flex justify-content-end">
              <button onClick={subUser} className="Register">
                {isLoading === true ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "LogIn"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
