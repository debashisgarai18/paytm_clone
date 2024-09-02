const Send = () => {
  return (
    <div className="h-screen w-full bg-gray-200 flex justify-center items-center">
      <div className="w-[80%] md:w-[40%] bg-white h-[500px] rounded-xl shadow-lg">
        <div className="py-[1.75rem] text-center font-bold text-4xl md:text-5xl">
          Send Money
        </div>
        <div className="mt-[3rem] w-full px-[3rem] flex gap-[1rem] items-center">
          <div className="w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] bg-green-500 text-white rounded-[50%] flex justify-center items-center">
            <div className="text-3xl font-bold">D</div>
          </div>
          <div className="text-2xl md:text-4xl font-bold">
            Friend&apos;s Name
          </div>
        </div>
        <div className="w-full px-[3rem] flex flex-col gap-[1rem] mt-[1.5rem]">
          <label className="font-medium text-xl md:text-2xl">
            Amount (in Rs.)
          </label>
          <input
            type="text"
            className="w-full text-lg md:text-2xl font-semibold px-[1rem] py-[0.5rem] focus:outline-none border-[1px] rounded-md border-gray-500"
            placeholder="Enter Amount"
          />
        </div>
        <div className="w-full mt-[1.5rem] px-[3rem]">
          <button className="w-full cursor-pointer bg-green-500 text-white font-medium text-2xl md:text-3xl py-[1rem] rounded-lg active:translate-y-[1px]">
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Send;
