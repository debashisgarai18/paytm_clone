import PropTypes from "prop-types";

const DashboardHeader = ({ name, avatar, onClick }) => {

  return (
    <div className="w-full h-[4.5rem] flex justify-between items-center bg-white px-[2rem]">
      <div className="font-bold text-2xl md:text-3xl">Payments App</div>
      <div className="flex gap-[1rem] items-center">
        <div className="hidden md:block font-medium text-xl capitalize">Hello, {name}</div>
        <div className="bg-gray-300 capitalize h-[3rem] w-[3rem] text-2xl font-bold rounded-[50%] flex items-center justify-center px-[1.3rem] cursor-pointer" onClick={() => onClick(prev => !prev)}>
          <div>{avatar}</div>
        </div>
      </div>
    </div>
  );
};

DashboardHeader.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  onClick : PropTypes.func
};

export default DashboardHeader;
