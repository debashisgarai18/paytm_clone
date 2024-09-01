import PropTypes from "prop-types";

const SignText = ({ text }) => {
  return (
    <div className="text-center text-gray-600 text-xl md:text-2xl">
      {text}
    </div>
  );
};

SignText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SignText;
