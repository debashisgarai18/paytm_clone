import LabelInputs from "../components/LabelInputs";
import SignHeader from "../components/SignHeader";
import SignText from "../components/SignText";
import PasswordField from "../components/PasswordField";
import SignButton from "../components/SignButton";
import SignBottomText from "../components/SignBottomText";

const Signin = () => {
  return (
    <div className="w-full h-screen flex pt-[5rem] justify-center bg-[#212121]">
      <div className="w-[90%] md:w-[30%] h-fit py-[1rem] bg-white/80 rounded-xl px-[1.5rem]">
        <div className="w-full flex flex-col gap-[0.5rem] md:gap-[1rem]">
          <SignHeader label="Sign up" />
          <SignText text="Enter your information to create an account" />
        </div>

        <div className="w-full flex flex-col mt-[1rem] md:mt-[1rem] gap-[1.3rem]">
          <LabelInputs label="Email" placeholder="Eg. debag18@example.com" />
          <PasswordField />
          <SignButton ButtonText="sign in" />
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
