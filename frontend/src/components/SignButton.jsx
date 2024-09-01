import PropTypes from "prop-types";

const SignButton = ({ ButtonText }) => {
  return (
    <button className="w-full text-xl font-medium md:text-2xl rounded-lg bg-black text-white text-center capitalize py-[1rem] cursor-pointer active:translate-y-[2px]">
      {ButtonText}
    </button>
  );
};

SignButton.propTypes = {
  ButtonText: PropTypes.string.isRequired,
};

export default SignButton;
