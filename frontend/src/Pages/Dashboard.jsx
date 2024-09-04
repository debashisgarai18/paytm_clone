import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [owner, setOwner] = useState("");
  const [balance, setBalance] = useState(0);
  const [showPP, setShowPP] = useState(false);

  // to be run when the actual page loads:
  const getData = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:3000/api/v1/user/getUsers",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    setUsers(response.data.users);
    setOwner(response.data.owner);
    setBalance(response.data.balance);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#212121] relative">
      <DashboardHeader name={owner} avatar={owner.slice(0,1)} onClick={setShowPP} />
      {showPP && (
        <div className="bg-gray-300 p-2 w-fit h-fit absolute right-5 text-xl font-medium top-[4.2rem] rounded-xl shadow-lg px-[1rem] duration-300 transition-all ease-in-out">
          Sign Out
        </div>
      )}
      <div className="w-full py-[1rem] font-medium px-[2rem] text-4xl md:text-5xl text-white">
        Your Balance: <span className="font-bold">${balance}</span>
      </div>
      <div className="w-full pt-[1rem] px-[2rem] text-2xl md:text-3xl text-white font-bold">
        Users
      </div>
      <div className="w-full px-[2rem] py-[1rem]">
        <input
          type="text"
          placeholder="Search Users..."
          className="w-full focus:outline-none text-xl md:text-2xl rounded-xl border-[1px] border-gray-400 py-[0.5rem] px-[1rem]"
        />
      </div>
      <div className="w-full flex flex-col gap-[0.5rem] py-[1rem]">
        {users.map((e) => {
          return (
            <div
              className="w-full h-[3rem] flex justify-between px-[2rem]"
              key={e._id}
            >
              <div className="flex items-center text-white gap-[1rem]">
                <div className="w-[3rem] font-medium text-xl h-full rounded-[50%] bg-white text-black flex items-center justify-center">
                  <div className="uppercase">{e.firstName.slice(0, 1)}</div>
                </div>
                <div className="text-xl md:text-2xl hidden md:block capitalize">
                  {e.firstName + " " + e.lastName}
                </div>
              </div>
              <button className="bg-white cursor-pointer text-black px-[1rem] text-sm md:text-xl font-medium rounded-lg active:translate-y-[1px]">
                Send Money
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
