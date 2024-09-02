import PropTypes from "prop-types";

const SignButton = ({ ButtonText, onClick }) => {
  return (
    <button className="w-full text-xl font-medium md:text-2xl rounded-lg bg-black text-white text-center capitalize py-[1rem] cursor-pointer active:translate-y-[2px]"
    onClick={onClick}>
      {ButtonText}
    </button>
  );
};

SignButton.propTypes = {
  ButtonText: PropTypes.string.isRequired,
  onClick : PropTypes.func
};

export default SignButton;
