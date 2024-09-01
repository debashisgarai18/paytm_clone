import LabelInputs from "../components/LabelInputs";
import PasswordField from "../components/PasswordField";
import SignBottomText from "../components/SignBottomText";
import SignButton from "../components/SignButton";
import SignHeader from "../components/SignHeader";
import SignText from "../components/SignText";

const Signup = () => {
  return (
    <div className="w-full h-screen flex pt-[5rem] justify-center bg-[#212121]">
      <div className="w-[90%] md:w-[30%] h-fit py-[1rem] bg-white/80 rounded-xl px-[1.5rem]">
        <div className="w-full flex flex-col gap-[0.5rem] md:gap-[1rem]">
          <SignHeader label="Sign up" />
          <SignText text="Enter your information to create an account" />
        </div>
        <div className="w-full flex flex-col mt-[1rem] gap-[0.5rem]">
          <LabelInputs label="First Name" placeholder="Debashis" />
          <LabelInputs label="Last Name" placeholder="Garai" />
          <LabelInputs label="Email" placeholder="debag18@example.com" />
          <PasswordField />
          <SignButton ButtonText="sign up" />
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
