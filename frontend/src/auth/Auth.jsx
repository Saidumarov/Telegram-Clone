import { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useMask } from "@react-input/mask";
import { LiaSpinnerSolid } from "react-icons/lia";
import { BottomGradient, LabelInputContainer } from "@/components/ui";
import { CheckBox } from "@/svg/svg";
import Opt from "./Opt";
import { postLogin } from "@/service/post.service";
import { toast } from "react-toastify";
import { cleanPhoneNumber } from "@/hooks/usePhone";
import Register from "./Register";
const Auth = () => {
  const [phone, setPhone] = useState("+998");
  const [isLogin, setisLogin] = useState("auth");
  const [isChecked, setIsChecked] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState({
    tel: true,
    chek: true,
  });
  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });
  const phoneNumber = cleanPhoneNumber(phone);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError({
        tel: phone?.length === 19,
        chek: isChecked,
      });
      if (phone?.length === 19 && isChecked) {
        setisLoading(true);
        const data = await postLogin({ phone: phoneNumber });
        if (data?.code) {
          toast.success(data?.code);
          setisLoading(false);
          setError({
            tel: true,
            chek: true,
          });
          setisLogin("code");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (value) => {
    // Faqat "+998" bilan boshlanishini ta'minlash
    if (!value.startsWith("+998")) {
      value = "+998";
    }

    setPhone(value);
    setError({
      ...error,
      tel: value.length === 19,
    });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setError({ ...error, chek: true });
    } else {
      setError({ ...error, chek: false });
    }
  };

  return (
    <>
      {isLogin === "auth" ? (
        <div className="h-screen flex items-center justify-center">
          <div className="w-[448px] h-[412px] max-mobilem:max-w-[95%] mx-auto rounded-2xl p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl  text-center text-neutral-800 dark:text-neutral-200">
              Kirish
            </h2>
            <p className="text-neutral-600 text-center text-sm max-w-sm mt-2 dark:text-neutral-300 ">
              <b>Chatda</b> ishlashni davom ettirish uchun
            </p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"></div>
              <LabelInputContainer className="mb-4">
                <Label
                  className="flex justify-between gap-[2px] text-[14px] font-[600] text-dark_two"
                  htmlFor="phone"
                >
                  <span className="flex gap-2">
                    Telefon
                    <span className="text-input-text">*</span>
                  </span>
                  <span className="text-[12px] text-input-text">
                    {error?.tel ? "" : "To'liq raqamni kiriting!"}
                  </span>
                </Label>
                <Input
                  value={phone}
                  ref={inputRef}
                  required
                  name="phone"
                  id="phone"
                  type="tel"
                  placeholder="+998"
                  onChange={(e) => handleChange(e.target.value)}
                  className="placeholder:text-black  h-[50px] text-[18px]"
                />
                <div className="flex items-center mb-0 px-2">
                  <label className="inline-flex items-center gap-4">
                    <input
                      type="checkbox"
                      className="hidden"
                      onClick={handleCheckboxChange}
                    />
                    <span
                      className={`w-[38px] flex justify-center items-center h-6 border max-desktop:w-6 max-mobilelm:w-[44px]  border-border_input rounded-md cursor-pointer shadow-sm ${
                        isChecked
                          ? "bg-gradient-to-br  text-input-text group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600  dark:bg-zinc-800  font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                          : "bg-slate-300 border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {isChecked && <CheckBox />}
                    </span>
                    <button
                      type="button"
                      onClick={handleCheckboxChange}
                      className="text-gray-700 block text-left bg-transparent dark:text-slate-300 text-[14px] cursor-pointer "
                    >
                      Shartlar bilan tanishganligimni va ularga roziligimni
                      tasdiqlayman.
                      <span className="text-input-text pl-1">
                        Ommaviy oferta
                      </span>
                    </button>
                  </label>
                </div>
                <span className="pb-3 text-input-text text-[14px]">
                  {error.chek ? "" : "Siyosat shartlarini qabul qiling"}
                </span>
              </LabelInputContainer>
              <button
                disabled={isLoading}
                className={`${
                  isLoading &&
                  "dark:bg-[#1a1e3e] cursor-not-allowed  bg-[#eaf0f6]"
                } group/btn  uppercase relative bg-[#f0f5fa] border  dark:bg-[#10132b] dark:text-[#f0f5fa] flex w-full px-5 py-3 items-center justify-center gap-1 rounded-md text-[14px] font-[500]`}
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
      ) : isLogin === "code" ? (
        <Opt state={{ isLogin, setisLogin, phone, phoneNumber }} />
      ) : (
        isLogin === "veryfiy" && <Register />
      )}
    </>
  );
};
export default Auth;
