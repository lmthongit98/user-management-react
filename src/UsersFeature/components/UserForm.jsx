import React, { useEffect, useMemo, useState } from "react";

export default function UserForm({ onSubmit, updatedUser, onSubmitUpdate }) {
  const [values, setValues] = useState({
    username: "",
    password: "",
    retypePassword: "",
    email: "",
    fullName: "",
    userType: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    retypePassword: "",
    email: "",
    fullName: "",
    userType: "",
  });

  const isValid = useMemo(() => {
    for (let key in errors) {
      if (errors[key] !== "" || values[key] === "") return false;
    }
    return true;
  }, [errors, values]);

  useEffect(() => {
    if (updatedUser) {
      setValues(updatedUser);
      setErrors({
        username: "",
        password: "",
        retypePassword: "",
        email: "",
        fullName: "",
      });
    } else {
      setValues({
        username: "",
        password: "",
        retypePassword: "",
        email: "",
        fullName: "",
        userType: "",
      });
    }
  }, [updatedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: "",
    });
    if (name === "password") {
      setErrors({
        ...errors,
        retypePassword: "",
      });
    }
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!updatedUser) {
      if (onSubmit) {
        onSubmit(values);
      }
    } else {
      if (onSubmitUpdate) {
        onSubmitUpdate(values);
      }
    }
    setValues({
      username: "",
      password: "",
      retypePassword: "",
      email: "",
      fullName: "",
      userType: "",
    });
  };

  const handleValidate = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };
    if (value.trim() === "") {
      newErrors[name] = `${name} is required!`;
      setErrors(newErrors);
      return;
    } else {
      newErrors[name] = "";
    }

    if (name === "password") {
      if (value.split("").length < 6) {
        newErrors[name] = `${name} must at least 6 characters!`;
      } else {
        newErrors[name] = "";
      }
      if (
        values["retypePassword"].trim() !== "" &&
        value !== values["retypePassword"]
      ) {
        newErrors["retypePassword"] = "retypePassword do not match!";
      } else {
        newErrors["retypePassword"] = "";
      }
    }
    if (name === "retypePassword") {
      if (value !== values["password"]) {
        newErrors[name] = `${name} do not match!`;
      } else {
        newErrors[name] = "";
      }
    }

    if (name === "email") {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(value)) {
        newErrors[name] = name + " is invalid!";
      } else {
        newErrors[name] = "";
      }
    }

    if (name === "fullName") {
      if (value.trim().split(" ").length < 2) {
        newErrors[name] = name + "must at least two words of 2 characters";
      } else {
        newErrors[name] = "";
      }
    }
    setErrors(newErrors);
  };

  return (
    <div className="container">
      <h3 className="bg-dark text-light p-2">User register</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Username
              </label>
              <input
                onChange={handleChange}
                onBlur={handleValidate}
                value={values.username}
                type="text"
                name="username"
                className="form-control"
                id="username"
              />
              <small className="text-danger">{errors.username}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Password
              </label>
              <input
                onChange={handleChange}
                onBlur={handleValidate}
                value={values.password}
                type="password"
                className="form-control"
                name="password"
                id="password"
              />
              <small className="text-danger">{errors.password}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Retype password
              </label>
              <input
                onChange={handleChange}
                onBlur={handleValidate}
                value={values.retypePassword}
                type="password"
                className="form-control"
                name="retypePassword"
                id="retypePassword"
              />
              <small className="text-danger">{errors.retypePassword}</small>
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email
              </label>
              <input
                onChange={handleChange}
                onBlur={handleValidate}
                value={values.email}
                type="email"
                name="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
              />
              <small className="text-danger">{errors.email}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Full Name
              </label>
              <input
                onChange={handleChange}
                onBlur={handleValidate}
                value={values.fullName}
                type="text"
                className="form-control"
                name="fullName"
                id="fullName"
              />
              <small className="text-danger">{errors.fullName}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                User Type
              </label>
              <select
                name="userType"
                onChange={handleChange}
                onBlur={handleValidate}
                value={values.userType}
                className="form-select"
              >
                <option value="" disabled>
                  Select an user type
                </option>
                <option value="Customer">Customer</option>
                <option value="Vip">Vip</option>
                <option value="Guest">Guest</option>
              </select>
              <small className="text-danger">{errors.userType}</small>
            </div>
          </div>
        </div>
        <input
          disabled={!isValid}
          type="submit"
          className="btn btn-primary me-2"
          value={updatedUser ? "Submit to update" : "Submit to add"}
        />
      </form>
    </div>
  );
}
