import React, { useEffect, useState } from "react";

export default function UserForm({ onSubmit, updatedUser, onSubmitUpdate }) {
  const [values, setValues] = useState({
    username: "",
    password: "",
    retypePassword: "",
    email: "",
    fullName: "",
    userType: "Customer",
  });

  useEffect(() => {
    if (updatedUser) {
      setValues(updatedUser);
    } else {
      setValues({
        username: "",
        password: "",
        retypePassword: "",
        email: "",
        fullName: "",
        userType: "Customer",
      });
    }
  }, [updatedUser]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    if (onSubmit) {
      onSubmit(values);
      setValues({
        username: "",
        password: "",
        retypePassword: "",
        email: "",
        fullName: "",
        userType: "Customer",
      });
    }
  };

  const handleSubmitUpdate = () => {
    if (onSubmitUpdate) {
      onSubmitUpdate(values);
      setValues({
        username: "",
        password: "",
        retypePassword: "",
        email: "",
        fullName: "",
        userType: "Customer",
      });
    }
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
                value={values.username}
                type="text"
                name="username"
                className="form-control"
                id="username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Password
              </label>
              <input
                onChange={handleChange}
                value={values.password}
                type="password"
                className="form-control"
                name="password"
                id="password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Retype password
              </label>
              <input
                onChange={handleChange}
                value={values.retypePassword}
                type="password"
                className="form-control"
                name="retypePassword"
                id="retypePassword"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email
              </label>
              <input
                onChange={handleChange}
                value={values.email}
                type="email"
                name="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Full Name
              </label>
              <input
                onChange={handleChange}
                value={values.fullName}
                type="text"
                className="form-control"
                name="fullName"
                id="fullName"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                User Type
              </label>
              <select
                name="userType"
                onChange={handleChange}
                value={values.userType}
                className="form-select"
              >
                <option value="Customer">Customer</option>
                <option value="Vip">Vip</option>
                <option value="Guest">Guest</option>
              </select>
            </div>
          </div>
        </div>
        <input
          disabled={Boolean(updatedUser)}
          type="submit"
          className="btn btn-primary me-2"
          value="Submit"
        />
        <input
          disabled={!Boolean(updatedUser)}
          type="button"
          onClick={handleSubmitUpdate}
          className="btn btn-success"
          value="Update"
        />
      </form>
    </div>
  );
}
