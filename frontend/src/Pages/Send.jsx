import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Send = () => {
  // to get the value from the query params
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState();
  const nav = useNavigate();

  // function to handle the transfer
  const handleTransfer = async () => {
    const data = {
      to: searchParams.get("id"),
      amount,
    };
    const response = await axios.post(
      "http://localhost:3000/api/v1/account/transfer",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    alert(response.data.message);
    nav("/dashboard");
  };

  return (
    <div className="h-screen w-full bg-gray-200 flex justify-center items-center">
      <div className="w-[80%] md:w-[40%] bg-white h-[500px] rounded-xl shadow-lg">
        <div className="py-[1.75rem] text-center font-bold text-4xl md:text-5xl">
          Send Money
        </div>
        <div className="mt-[3rem] w-full px-[3rem] flex gap-[1rem] items-center">
          <div className="w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] bg-green-500 text-white rounded-[50%] flex justify-center items-center">
            <div className="text-3xl font-bold capitalize">
              {searchParams.get("name").slice(0, 1)}
            </div>
          </div>
          <div className="text-2xl capitalize md:text-4xl font-bold">
            {searchParams.get("name")}
          </div>
        </div>
        <div className="w-full px-[3rem] flex flex-col gap-[1rem] mt-[1.5rem]">
          <label className="font-medium text-xl md:text-2xl">
            Amount (in Rs.)
          </label>
          <input
            type="number"
            className="w-full text-lg md:text-2xl font-semibold px-[1rem] py-[0.5rem] focus:outline-none border-[1px] rounded-md border-gray-500"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="w-full mt-[1.5rem] px-[3rem]">
          <button
            className="w-full cursor-pointer bg-green-500 text-white font-medium text-2xl md:text-3xl py-[1rem] rounded-lg active:translate-y-[1px]"
            onClick={handleTransfer}
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Send;
