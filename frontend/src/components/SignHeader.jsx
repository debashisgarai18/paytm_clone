import PropTypes from "prop-types";

const SignHeader = ({ label }) => {
  return (
    <div className="text-4xl md:text-5xl tracking-wide font-bold capitalize text-center font-sans">
      {label}
    </div>
  );
};

SignHeader.propTypes = {
  label: PropTypes.string.isRequired,
};

export default SignHeader;
