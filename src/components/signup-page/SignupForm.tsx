import Alert from "components/Alert";
import Button from "components/Button";
import { LabelAndInput } from "components/Form";
import { UserContext } from "contexts/UserContext";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { harperFetchJWTTokens } from "utils/harperdb/fetchJWTTokens";
import { postFormData } from "utils/postFormData";

const SignupForm = () => {
  const user = useContext(UserContext);
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [errors, setErrors] = useState<string | string[]>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = { username, password1, password2 };
    const { response, result } = await postFormData(formData, "/api/signup");

    if (response.status !== 200) {
      setErrors(result.error);
      return;
    }

    try {
      const { response, result } = await harperFetchJWTTokens(
        username,
        password1
      );

      const accessToken = result.operation_token;
      if (response.status === 200 && accessToken) {
        authenticateUser(username, accessToken);
      } else {
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      setErrors("Whoops, something went wrong :(");
    }
  };

  const authenticateUser = (username: string, accessToken: string) => {
    user.setUsername(username);
    localStorage.setItem("access_token", accessToken);
  };

  const displayErrors = () => {
    if (errors.length === 0) return <></>;

    return typeof errors === "string" ? (
      <Alert type="danger">{errors}</Alert>
    ) : (
      errors.map((err, i) => (
        <Alert key={i} type="danger">
          {err}
        </Alert>
      ))
    );
  };

  return (
    <form className="w-full sm:w-96" onSubmit={handleSubmit}>
      <LabelAndInput
        label="Username"
        inputType="text"
        inputName="username"
        handleChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <LabelAndInput
        label="Password"
        inputType="password"
        inputName="password1"
        handleChange={(e) => setPassword1(e.target.value)}
        value={password1}
      />
      <LabelAndInput
        label="Confirm password"
        inputType="password"
        inputName="password2"
        handleChange={(e) => setPassword2(e.target.value)}
        value={password2}
      />
      <Button
        color="success"
        type="submit"
        extraClasses="w-full mt-3 py-3 font-semibold"
      >
        Create account
      </Button>

      {displayErrors()}
    </form>
  );
};

export default SignupForm;
