import React, { useState } from "react";
import axios from "axios";
import Joi from "joi";
import { useNavigate, useParams } from "react-router-dom";

export default function Active() {
 
  let EmailActive = useParams()
  const [user, setUser] = useState({
    Email: `${EmailActive.emailVerify}`,
    VerifyCode: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  function getUser(e) {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  }

  async function subUser(e) {
    e.preventDefault();
    const validationSet = validation();

    if (validationSet.error) {
      setShowError(validationSet.error.details);
    } else {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://testone2023-001-site1.htempurl.com/API%20for%20Notes/OTP.php",
          JSON.stringify(user),
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        if (response.data.Code === 200) {
          setLoading(false);
          navigate("/login");
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
    const schema = Joi.object({
      Email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] }
        })
        .required(),
      VerifyCode: Joi.string().required()
    });

    return schema.validate(user, { abortEarly: false });
  }

  return (
    <div className="container mx-auto mt-5">
      <div className="row">
        {errorMessage && (
          <div className="alert alert-danger w-75 mx-auto" role="alert">
            {errorMessage}
          </div>
        )}
        <form>
          <div className="form-group col-12">
            <h2 className="mb-5">Verification Code</h2>
            {showError.map((error, i) => (
              <div key={i} className="alert alert-danger w-75 mx-auto">
                {error.message}
              </div>
            ))}
          </div>

        
          <div className="form-group col-12 w-50 bg-info p-3 rounded-2 text-black text-center h2">
           {EmailActive.emailVerify}
          </div>
          <div className="form-group col-12 w-50 bg-light p-3 rounded-2 text-black text-center h2">
          <i className="fa-solid fa-triangle-exclamation text-warning h1"></i>
        <p>Sign up was successful and verification email was sent.</p>
          </div>
          <div className="form-group col-12 w-25">
            <label htmlFor="VerifyCode">Verification Code</label>
            <input
              onChange={getUser}
              className="control-form col-12"
              name="VerifyCode"
              type="text"
            />
           
            <div className="d-flex justify-content-end">
              <button onClick={subUser} className="Register">
                {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Verification"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
