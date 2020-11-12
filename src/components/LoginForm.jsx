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

  const auth = async () => {
    setIsLoading(true);
    setError(null);

    const user = {
      email: values.email,
      password: values.password,
    };

    const [err, result] = await until(login(user));

    if (err) {
      setError({ message: err.message });
      setIsLoading(false);
    }

    if (result && result.data.errors) {
      setError({ message: "Invalid credentials provided" });
      setIsLoading(false);
    }

    const { data = {} } = result || {};

    console.log("toto", data, data.auth && data.token);

    if (data && data.auth && data.token) {
      handleLogin({
        ...user,
        token: data.token,
      });
      setIsLoading(false);
    }
  };

  const { values, handleChange, handleSubmit } = useForm(auth, {
    email: "",
    password: "",
  });

  if (isLoggedIn()) {
    return <Redirect to="/tracks" />;
  }

  return (
    <>
      <Form className="inner-form" onSubmit={handleSubmit}>
        <Input
          name="email"
          type="text"
          placeholder={"john.doe@email.com"}
          label={"Email"}
          onChange={handleChange}
          value={values.email}
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
        {error ? <p className="error">{error.message}</p> : null}
        <Button type="submit">{isLoading ? "Loading" : "Login"}</Button>
      </Form>
    </>
  );
};

export default LoginForm;
