import type { NextPage } from "next";
import SignupForm from "components/signup-page/SignupForm";
import PageHead from "components/PageHead";

const Signup: NextPage = () => {
  return (
    <div className="mx-auto mt-20">
      <PageHead extraClasses="text-center mb-8">Create an account</PageHead>
      <SignupForm />
    </div>
  );
};

export default Signup;
