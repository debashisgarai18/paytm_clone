import PropTypes from "prop-types";

const LabelInputs = ({ label, placeholder }) => {
  return (
    <div className="w-full flex flex-col gap-[0.5rem] md:gap-[0.75rem]">
      <label className="font-semibold text-xl md:text-2xl">{label}</label>
      <input
        type="text"
        className="text-xl md:text-2xl font-medium py-[0.75rem] focus:outline-none border-[1px] px-[1rem] border-gray-400 rounded-xl"
        placeholder={placeholder}
      />
    </div>
  );
};

LabelInputs.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder : PropTypes.string.isRequired
};

export default LabelInputs;
