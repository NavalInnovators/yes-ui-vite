import { useContext, useState } from "react";
import { motion } from "motion/react";
import SelectTopic from "../../components/SelectTopic";
import WindowWidthContext from "../context/WindowWidthContext";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function OpenWithdrawModal({ setIsOpenWithdrawModal }) {
  const windowWidth = useContext(WindowWidthContext);
  const isSmallScreen = windowWidth < 768;
  const isMobile = windowWidth < 500;

  const modalWidth = isMobile
    ? "w-[90%]"
    : isSmallScreen
    ? "w-[85%] max-w-[600px]"
    : "w-[700px]";
  const modalPadding = isMobile ? "p-[20px]" : "p-[30px]";
  const inputPadding = isMobile ? "p-[8px]" : "p-[10px]";

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/10 backdrop-blur-[5px] flex items-center justify-center z-[100]">
      <motion.div
        initial={{ y: "100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100vh", opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.9,
        }}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${modalWidth} gap-[20px] flex flex-col shadow-[0px_0px_10px_hsl(0,0%,80%)] dark:shadow-[0px_0px_5px_hsl(0,0%,50%)] z-[10] ${modalPadding} bg-white dark:bg-dark-card dark:text-white rounded-[10px]`}
      >
        <div className="flex items-center justify-between">
          <h1
            className={`${
              isMobile ? "text-[16px]" : "text-[18px]"
            } font-medium dark:text-white`}
          >
            Account Details
          </h1>
          <p
            onClick={() => setIsOpenWithdrawModal(false)}
            className={`${
              isMobile ? "text-[12px]" : "text-[14px]"
            } text-black dark:text-dark-text-muted cursor-pointer font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors`}
          >
            Close
          </p>
        </div>

        <div className="flex flex-col gap-[10px]">
          <input
            className={`bg-[#fff] dark:bg-dark-highlight border-[1px] border-light-border dark:border-dark-border rounded-[6px] ${inputPadding} ${
              isMobile ? "text-[13px]" : "text-[14px]"
            } font-light dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
            type="text"
            placeholder="Name"
          />
          <input
            className={`bg-[#fff] dark:bg-dark-highlight border-[1px] border-light-border dark:border-dark-border rounded-[6px] ${inputPadding} ${
              isMobile ? "text-[13px]" : "text-[14px]"
            } font-light dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
            type="text"
            placeholder="Account Number"
          />
          <input
            className={`bg-[#fff] dark:bg-dark-highlight border-[1px] border-light-border dark:border-dark-border rounded-[6px] ${inputPadding} ${
              isMobile ? "text-[13px]" : "text-[14px]"
            } font-light dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
            type="text"
            placeholder="IFSC Code"
          />

          <p
            className={`${
              isMobile ? "text-[12px]" : "text-[14px]"
            } text-center font-light text-gray-500 dark:text-dark-text-muted`}
          >
            Or
          </p>

          <input
            className={`bg-[#fff] dark:bg-dark-highlight border-[1px] border-light-border dark:border-dark-border rounded-[6px] ${inputPadding} ${
              isMobile ? "text-[13px]" : "text-[14px]"
            } font-light dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
            type="text"
            placeholder="UPI ID"
          />
        </div>

        <button
          className={`hover:shadow-[0px_0px_20px_hsl(0,0%,50%)] dark:hover:shadow-[0px_0px_20px_hsl(0,0%,50%)] ${
            isMobile
              ? "text-[13px] px-[12px] py-[6px]"
              : "text-[14px] px-[16px] py-[7px]"
          } bg-black hover:bg-black/80 transition-all duration-300 dark:hover:bg-white/80 text-white dark:bg-white dark:text-black cursor-pointer rounded-[6px] w-full mt-[15px]`}
        >
          Withdraw
        </button>
      </motion.div>
    </div>
  );
}

export default function YourEarning() {
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("UPI");
  const windowWidth = useContext(WindowWidthContext);
  const isSmallScreen = windowWidth < 700;
  const [isOpenWithdrawModal, setIsOpenWithdrawModal] = useState(false);

  return (
    <div
      className={`flex ${
        isSmallScreen ? "flex-col gap-[20px]" : "max-w-[800px] gap-[20px]"
      }`}
    >
      <div
        className={`${
          isSmallScreen ? "w-full" : "w-[55%]"
        } border-[1px] border-light-border dark:border-dark-border dark:bg-dark-card dark:text-white rounded-[10px] p-[20px]`}
      >
        <div className="border-b-[1px] border-light-border dark:border-dark-border pb-[15px] mb-[15px]">
          <h1 className="text-[18px] font-medium">Total Earnings</h1>
        </div>

        <h2 className="text-[15px] font-medium mb-[15px]">This Month</h2>

        <div className="flex items-center justify-between border-b-[1px] border-light-border dark:border-dark-border pb-[15px] mb-[15px]">
          <div className="flex flex-col">
            <p className="text-[14px] font-light text-[hsl(0,0%,50%)] dark:text-dark-text-muted">
              June
            </p>
            <p className="text-[18px] font-semibold">₹350</p>
          </div>

          <div className="flex flex-col">
            <p className="text-[14px] font-light text-[hsl(0,0%,50%)] dark:text-dark-text-muted">
              Total Submissions
            </p>
            <p className="text-[18px] font-semibold">18</p>
          </div>
        </div>

        <SelectTopic
          options={months}
          selectedOption={selectedMonth}
          setSelectedOption={setSelectedMonth}
        />

        <div className="mt-[15px]">
          <p className="text-[14px] font-light text-[hsl(0,0%,50%)] dark:text-dark-text-muted">
            {selectedMonth}
          </p>
          <p className="text-[18px] font-semibold">₹350</p>
        </div>
      </div>

      <div
        className={`${
          isSmallScreen ? "w-full" : "flex-1"
        } border-[1px] border-light-border dark:border-dark-border dark:bg-dark-card dark:text-white rounded-[10px] p-[20px]`}
      >
        <div className="flex flex-col items-center justify-center h-[150px]">
          <h1>Total Earning</h1>
          <p className="text-[36px] font-semibold">₹500</p>
        </div>

        <div>
          <p className="mb-[10px] text-[14px] font-light text-[hsl(0,0%,50%)] dark:text-dark-text-muted">
            Withdraw Money
          </p>
          <SelectTopic
            options={["UPI", "Bank", "Paytm"]}
            selectedOption={selectedPaymentMethod}
            setSelectedOption={setSelectedPaymentMethod}
          />
        </div>

        <button
          onClick={() => setIsOpenWithdrawModal(true)}
          className="hover:shadow-[0px_0px_20px_hsl(0,0%,50%)] dark:hover:shadow-[0px_0px_20px_hsl(0,0%,50%)] text-[14px] px-[16px] py-[7px] bg-black hover:bg-black/80 transition-all duration-300 dark:hover:bg-white/80 text-white dark:bg-white dark:text-black cursor-pointer rounded-[6px] w-full mt-[15px]"
        >
          Widthdraw
        </button>
      </div>

      {isOpenWithdrawModal && (
        <OpenWithdrawModal setIsOpenWithdrawModal={setIsOpenWithdrawModal} />
      )}
    </div>
  );
}
