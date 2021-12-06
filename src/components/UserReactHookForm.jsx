import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

export default function UserReactHookForm({
  onSubmit,
  updatedUser,
  onSubmitUpdate,
}) {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("User name is required!"),
    password: Yup.string()
      .required("Password is required!")
      .min(6, "Password must at least 6 characters!"),
    retypePassword: Yup.string()
      .required("RetypePassword is required!")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    email: Yup.string()
      .required("Email is required!")
      .email("Email is invalid!"),
    fullName: Yup.string()
      .required("Full name is required!")
      .test(
        "at-least-6-characters",
        "FullName must at least 2 word!",
        (value) => value.trim().split(" ").length >= 2
      ),
    userType: Yup.string().required("User type is required!"),
  });

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      retypePassword: "",
      email: "",
      fullName: "",
      userType: "",
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (updatedUser) {
      reset(updatedUser);
    } else {
      reset({
        username: "",
        password: "",
        retypePassword: "",
        email: "",
        fullName: "",
        userType: "",
      });
    }
  }, [updatedUser, reset]);

  const onHandleSubmit = (values) => {
    if (!updatedUser) {
      if (onSubmit) {
        onSubmit(values);
      }
    } else {
      if (onSubmitUpdate) {
        onSubmitUpdate(values);
      }
    }
    reset({
      username: "",
      password: "",
      retypePassword: "",
      email: "",
      fullName: "",
      userType: "",
    });
  };
  return (
    <div className="container">
      <h3 className="bg-dark text-light p-2">User register</h3>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Username
              </label>
              <input
                {...register("username")}
                type="text"
                name="username"
                className="form-control"
                id="username"
              />
              <small className="text-danger">{errors.username?.message}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                className="form-control"
                name="password"
                id="password"
              />
              <small className="text-danger">{errors.password?.message}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Retype password
              </label>
              <input
                {...register("retypePassword")}
                type="password"
                className="form-control"
                name="retypePassword"
                id="retypePassword"
              />
              <small className="text-danger">
                {errors.retypePassword?.message}
              </small>
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                name="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
              />
              <small className="text-danger">{errors.email?.message}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Full Name
              </label>
              <input
                {...register("fullName")}
                type="text"
                className="form-control"
                name="fullName"
                id="fullName"
              />
              <small className="text-danger">{errors.fullName?.message}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                User Type
              </label>
              <select
                {...register("userType")}
                name="userType"
                className="form-select"
              >
                <option value="" disabled>
                  Select an user type
                </option>
                <option value="Customer">Customer</option>
                <option value="Vip">Vip</option>
                <option value="Guest">Guest</option>
              </select>
              <small className="text-danger">{errors.userType?.message}</small>
            </div>
          </div>
        </div>
        <input
          type="submit"
          className="btn btn-primary me-2"
          value={updatedUser ? "Submit to update" : "Submit to add"}
        />
      </form>
    </div>
  );
}
