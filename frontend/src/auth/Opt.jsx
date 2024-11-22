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
import { postVeryfiycation } from "@/service/post.service";
import { toast } from "react-toastify";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/context/AuthProvider";
const Opt = ({ state }) => {
  const { isLogin, setisLogin, phone, phoneNumber } = state;
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const router = useNavigate();
  const [error, setError] = useState(false);
  const { value } = useUser();
  const { setToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.trim().length !== 6) {
      setError(true);
      return;
    }
    try {
      setError(false);
      setIsLoading(true);
      const response = await postVeryfiycation({
        phone: phoneNumber,
        verificationCode: code,
      });
      if (response?.user) {
        localStorage.setItem("access_token", JSON.stringify(response?.token));
        localStorage.setItem("id", JSON.stringify(response?.id));
        setToken(response?.token);
        router("/");
      } else {
        if (response?.error) {
          toast.error(response?.error);
          setCode("");
        } else {
          value.setUserPhone(phoneNumber);
          setisLogin("veryfiy");
        }
      }
    } catch (error) {
      console.error("Tasdiqlashda xatolik:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className=" w-[448px] h-[412px] max-mobilem:max-w-[95%] mx-auto rounded-2xl p-8 shadow-input  bg-white dark:bg-black  ">
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
              onClick={() => setisLogin("auth")}
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
                value={code}
                onChange={(code) => setCode(code)}
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
            disabled={isLoading}
            className={`${
              isLoading && "dark:bg-[#1a1e3e] cursor-not-allowed  bg-[#eaf0f6]"
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
    </div>
  );
};
export default Opt;
