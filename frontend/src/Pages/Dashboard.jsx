import { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";

const Dashboard = () => {
  const [users, ] = useState([
    {
      id: 1,
      name: "User1",
      avatar: "U1",
    },
    {
      id: 2,
      name: "User2",
      avatar: "U2",
    },
    {
      id: 3,
      name: "User3",
      avatar: "U3",
    },
    {
      id: 4,
      name: "User4",
      avatar: "U4",
    },
    {
      id: 5,
      name: "User5",
      avatar: "U5",
    },
  ]);

  return (
    <div className="min-h-screen w-full bg-[#212121]">
      <DashboardHeader name="Debashis" avatar="D" />
      <div className="w-full py-[1rem] font-medium px-[2rem] text-4xl md:text-5xl text-white">
        Your Balance: <span className="font-bold">$5000</span>
      </div>
      <div className="w-full pt-[1rem] px-[2rem] text-2xl md:text-3xl text-white font-bold">
        Users
      </div>
      <div className="w-full px-[2rem] py-[1rem]">
        <input
          type="text"
          placeholder="Search Users..."
          className="w-full focus:outline-none text-xl md:text-2xl rounded-md border-[1px] border-gray-400 py-[0.5rem] px-[1rem]"
        />
      </div>
      <div className="w-full flex flex-col gap-[0.5rem] py-[1rem]">
        {users.map((e) => {
          return (
            <div
              className="w-full h-[3rem] flex justify-between px-[2rem]"
              key={e.id}
            >
              <div className="flex items-center text-white gap-[1rem]">
                <div className="w-[3rem] font-medium text-xl h-full rounded-[50%] bg-white text-black flex items-center justify-center">
                  <div>{e.avatar}</div>
                </div>
                <div className="text-xl md:text-2xl hidden md:block">
                  {e.name}
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
