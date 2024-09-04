import { useState } from "react";
import LabelInputs from "../components/LabelInputs";
import PasswordField from "../components/PasswordField";
import SignBottomText from "../components/SignBottomText";
import SignButton from "../components/SignButton";
import SignHeader from "../components/SignHeader";
import SignText from "../components/SignText";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const nav = useNavigate();

  // value clean-up function
  const cleanup = () => {
    setFname("");
    setLname("");
    setEmail("");
    setPwd("");
  };

  // function to handle click for the Sign Up button
  const handleClick = async () => {
    const data = {
      fname,
      lname,
      uname: email,
      pwd,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        data
      );
      localStorage.setItem("token", response.data.token);
      cleanup();
      nav("/dashboard");
    } catch (err) {
      console.log(err);
      alert(err || "An error ocurred");
      cleanup();
      return;
    }
  };

  return (
    <div className="w-full h-screen flex pt-[5rem] justify-center bg-[#212121]">
      <div className="w-[90%] md:w-[30%] h-fit py-[1rem] bg-white/80 rounded-xl px-[1.5rem]">
        <div className="w-full flex flex-col gap-[0.5rem] md:gap-[1rem]">
          <SignHeader label="Sign up" />
          <SignText text="Enter your information to create an account" />
        </div>
        <div className="w-full flex flex-col mt-[1rem] gap-[0.5rem]">
          <LabelInputs
            label="First Name"
            placeholder="Debashis"
            onChange={setFname}
          />
          <LabelInputs
            label="Last Name"
            placeholder="Garai"
            onChange={setLname}
          />
          <LabelInputs
            label="Email"
            placeholder="debag18@example.com"
            onChange={setEmail}
          />
          <PasswordField onChange={setPwd} value={pwd}/>
          <SignButton ButtonText="sign up" onClick={handleClick} />
        </div>
        <SignBottomText
          BottomText="Already have an account?"
          goTo="/signin"
          gotoText="Login"
        />
      </div>
    </div>
  );
};

export default Signup;
