import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "../hooks";
import until from "../utils/until";

import { login } from "../services/AuthService";
import { handleLogin, isLoggedIn } from "../utils/auth";

import Form from "./Form";
import Input from "./Input";
import Button from "./Button";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(true);

  const auth = async () => {
    setIsLoading(true);

    const user = {
      username: values.username,
      password: values.password,
    };

    const [err, result] = await until(login(user));

    if (err) {
      setError({ message: err.message });
      setRedirect(false);
    }

    setIsLoading(false);

    if (result && result.data.errors) {
      setError({ message: "Invalid credentials provided" });
      setRedirect(false);
    }

    if (redirect && result.headers["x-access-token"]) {
      handleLogin({
        ...user,
        token: result.headers["x-access-token"],
      });
    }
  };

  const { values, handleChange, handleSubmit } = useForm(auth, {
    username: "",
    password: "",
  });

  if (isLoggedIn()) {
    return <Redirect to="/tracks" />;
  }

  return (
    <>
      <Form className="inner-form" onSubmit={handleSubmit}>
        {error ? <p className="error">{error.message}</p> : null}
        <Input
          name="username"
          type="text"
          placeholder={"johndoe"}
          label={"Username"}
          onChange={handleChange}
          value={values.username}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder={"••••••••••"}
          label={"Password"}
          onChange={handleChange}
          value={values.password}
          required
        />

        <Button type="submit" disabled={isLoading} icon={"loader"}>
          Login
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
