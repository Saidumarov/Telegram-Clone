import { BottomGradient, LabelInputContainer } from "../components/ui/index";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { putRegister } from "@/service/put.service";
import { useAuth } from "@/context/AuthProvider";
import { LiaSpinnerSolid } from "react-icons/lia";

const Register = () => {
  const [isLoading, setisLoading] = useState(false);
  const root = useNavigate();
  const { value } = useUser();
  const { setToken } = useAuth();

  const [user, setUser] = useState({
    lastname: "",
    firstname: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const res = await putRegister({ ...user, phone: value.userPhone });
      if (res?.access_token) {
        localStorage.setItem("access_token", JSON.stringify(res?.access_token));
        localStorage.setItem("id", JSON.stringify(res?.id));
        setToken(res?.access_token);
        root("/");
        value.setUserPhone(null);
      } else {
        toast.error(res);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUser({
        lastname: "",
        firstname: "",
      });
      setisLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="h-screen  flex items-center justify-center ">
      <div className="max-w-md w-full mx-auto rounded-2xl  p-8 shadow-input bg-white dark:bg-black  ">
        <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
          Kirish
        </h2>
        <p className="text-neutral-600 text-center text-sm max-w-sm mt-2 dark:text-neutral-300 ">
          <b>Chatda</b> ishlashni davom ettirish uchun
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"></div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="firstname">Ism</Label>
            <Input
              onChange={handleChange}
              required
              name="firstname"
              id="firstname"
              type="text"
              value={user?.firstname}
              className="h-12 max-desktop:h-10"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4 relative  ">
            <Label htmlFor="lastname">Familiya</Label>
            <Input
              onChange={handleChange}
              required
              name="lastname"
              id="lastname"
              type="text"
              value={user?.lastname}
              className="h-12 max-desktop:h-10"
            />
          </LabelInputContainer>
          <button
            disabled={isLoading}
            className={`${
              isLoading && "dark:bg-[#1a1e3e] cursor-not-allowed  bg-[#eaf0f6]"
            } group/btn  uppercase relative bg-[#f0f5fa] border  dark:bg-[#10132b] dark:text-[#f0f5fa] flex w-full px-5 py-3 items-center justify-center gap-1 rounded-md text-[14px] font-[500]`}
            type="submit"
          >
            {isLoading ? (
              <LiaSpinnerSolid className="text-light text-[22px] animate-spin" />
            ) : (
              <>
                Davom etish <span className="block">&rarr;</span>
              </>
            )}
            <BottomGradient />
          </button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
    </div>
  );
};

export default Register;
