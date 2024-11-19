import { useState } from "react";
import { Label } from "../components/ui/label";
import { LiaSpinnerSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { BottomGradient, LabelInputContainer } from "@/components/ui";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
const Opt = ({ state }) => {
  const { isLogin, setisLogin, phone } = state;
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const router = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.length === 6) {
      setError(false);
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        router("/");
      }, 2000);
    } else {
      setError(true);
    }
  };

  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <div className=" w-[448px] h-[412px] max-mobilem:max-w-[95%] mx-auto rounded-2xl  p-4 md:p-8 shadow-input  bg-white dark:bg-black  ">
      <h2 className="font-bold text-xl pt-2 text-center text-neutral-800 dark:text-neutral-200">
        Kodni kriting
      </h2>
      <div className="w-full pt-3 text-center">
        <strong className="text-neutral-600 text-center text-sm max-w-sm  dark:text-neutral-300 ">
          Quyidagi raqamga kod yuborildi
        </strong>
        <div className="w-full flex justify-center items-center gap-4 pt-[1px]">
          <span className="text-sm pt-1">{phone}</span>
          <button
            onClick={() => setisLogin(true)}
            className="items-center text-blue-500 text-sm justify-center disabled:pointer-events-none disabled:opacity-50  leading-[150%]  hover:underline font-[400] inline-block w-auto"
          >
            O'zgartirish
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4 pb-8">
          <Label
            className="flex justify-between gap-[2px] text-[14px] font-[600] text-dark_two"
            htmlFor="phone"
          >
            <span
              style={{
                opacity: error ? 1 : 0,
              }}
              className="text-[12px] pt-5 pb-2 pl-8 text-input-text"
            >
              {error ? "To'liq raqamni kiriting!" : "T"}
            </span>
          </Label>
          <div className="  w-full flex justify-center">
            <InputOTP
              value={value}
              onChange={(value) => handleChange(value)}
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </LabelInputContainer>
        <button
          className={`${
            false && "dark:bg-[#1a1e3e] cursor-not-allowed  bg-[#eaf0f6]"
          } group/btn  uppercase relative bg-[#f0f5fa] border   dark:bg-[#10132b] dark:text-[#f0f5fa] flex w-full px-5 py-3 items-center justify-center gap-1 rounded-md text-[14px] font-[500]`}
          type="submit"
        >
          {isLoading ? (
            <LiaSpinnerSolid className="text-light text-[22px] animate-spin" />
          ) : (
            <>
              Davom etish
              <span className="pb-1  flex items-center">&rarr;</span>
            </>
          )}
          <BottomGradient />
        </button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 mt-[20px] h-[1px] w-full" />
      </form>
    </div>
  );
};
export default Opt;
