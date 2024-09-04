import LabelInputs from "../components/LabelInputs";
import SignHeader from "../components/SignHeader";
import SignText from "../components/SignText";
import PasswordField from "../components/PasswordField";
import SignButton from "../components/SignButton";
import SignBottomText from "../components/SignBottomText";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const nav = useNavigate();

  // cleanUp function
  const cleanup = () => {
    setPwd("");
    setEmail("");
  };

  const handleSignin = async () => {
    const data = {
      uname: email,
      pwd,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        data
      );
      localStorage.setItem("token", response.data.token);
      cleanup();
      nav("/dashboard");
    } catch (err) {
      alert(err || "can't sign you in");
      return;
    }
  };

  return (
    <div className="w-full h-screen flex pt-[5rem] justify-center bg-[#212121]">
      <div className="w-[90%] md:w-[30%] h-fit py-[1rem] bg-white/80 rounded-xl px-[1.5rem]">
        <div className="w-full flex flex-col gap-[0.5rem] md:gap-[1rem]">
          <SignHeader label="Sign in" />
          <SignText text="Enter your information to create an account" />
        </div>

        <div className="w-full flex flex-col mt-[1rem] md:mt-[1rem] gap-[1.3rem]">
          <LabelInputs
            label="Email"
            placeholder="Eg. debag18@example.com"
            onChange={setEmail}
            value={email}
          />
          <PasswordField onChange={setPwd} value={pwd} />
          <SignButton ButtonText="sign in" onClick={handleSignin} />
        </div>
        <SignBottomText
          BottomText="Don't have an account?"
          goTo="/signup"
          gotoText="sign up"
        />
      </div>
    </div>
  );
};

export default Signin;
