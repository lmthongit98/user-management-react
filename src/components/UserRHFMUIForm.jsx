import { yupResolver } from "@hookform/resolvers/yup";
import { MenuItem, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

export default function UserRHFMUIForm({
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
    formState: { errors },
    reset,
    control,
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
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="username"
                    label="Username"
                    variant="standard"
                    fullWidth
                    size="medium"
                    error={!!errors.username?.message}
                    helperText={errors.username?.message}
                  />
                )}
              />
            </div>
            <div className="mb-3">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="password"
                    label="Password"
                    variant="standard"
                    fullWidth
                    type="password"
                    size="medium"
                    error={!!errors.password?.message}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </div>
            <div className="mb-3">
              <Controller
                name="retypePassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="retypePassword"
                    label="Retype Password"
                    variant="standard"
                    fullWidth
                    type="password"
                    size="medium"
                    error={!!errors.retypePassword?.message}
                    helperText={errors.retypePassword?.message}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="email"
                    label="Email"
                    variant="standard"
                    fullWidth
                    size="medium"
                    error={!!errors.email?.message}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </div>
            <div className="mb-3">
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="fullName"
                    label="FullName"
                    variant="standard"
                    fullWidth
                    size="medium"
                    error={!!errors.fullName?.message}
                    helperText={errors.fullName?.message}
                  />
                )}
              />
            </div>
            <div className="mb-3">
              <Controller
                name="userType"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label="User type"
                    error={!!errors.userType}
                    helperText={errors.userType?.message}
                  >
                    {["Customer", "Vip", "Guest"].map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
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
