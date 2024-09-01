import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SignBottomText = ({ BottomText, goTo, gotoText }) => {
  return (
    <div className="w-full text-center px-[1rem] pt-[0.75rem] md:pt-[1rem] text-lg md:text-xl">
      {BottomText}{" "}
      <Link to={goTo} className="underline cursor-pointer capitalize">
        {gotoText}
      </Link>
    </div>
  );
};

SignBottomText.propTypes = {
  BottomText: PropTypes.string.isRequired,
  gotoText: PropTypes.string.isRequired,
  goTo: PropTypes.string.isRequired,
};

export default SignBottomText;
