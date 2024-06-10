import React, { useState } from "react";
import { UserAuthInput } from "../components";
import { FaEnvelope, FaGithub } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { signInWithGithub, signInWithGoogle } from "../utils/helpers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { fadeInOut } from "../animations";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidationStatus, setEmailValidationStatus] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const createNewUser = async () => {
    if (emailValidationStatus) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          console.log(userCred);
        })
        .catch((err) => {
          console.log(err.message);
          if (err.message.includes("email-already-in-use")) {
            setAlert(true);
            setAlertMsg("This email already exists!");
          } else if (err.message.includes("weak-password")) {
            setAlert(true);
            setAlertMsg("Password should be at least 6 characters");
          }
          setInterval(() => {
            setAlert(false);
          }, 4000);
        });
    }
  };

  const loginNewUser = async () => {
    if (emailValidationStatus) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          console.log(userCred);
        })
        .catch((err) => {
          // console.log(err.message);
          if (err.message.includes("invalid-credential")) {
            setAlert(true);
            setAlertMsg("Invalid Credentials");
          } else {
            setAlert(true);
            setAlertMsg("Temporarily disabled due to too many failed attempts");
          }
          setInterval(() => {
            setAlert(false);
          }, 4000);
        });
    }
  };

  return (
    <div className="w-full py-1">
      <div className="w-full flex flex-col items-center justify-center py-3">
        <p className="py-3 text-lg text-primaryText">Join Us!</p>
        <div
          className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondary
        shadow-md flex flex-col items-center justify-center gap-5"
        >
          {/* email */}
          <UserAuthInput
            label="Email"
            placeHolder="Email"
            isPass={false}
            key="Email"
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            setEmailValidationStatus={setEmailValidationStatus}
          />
          {/* password */}
          <UserAuthInput
            label="Password"
            placeHolder="Password"
            isPass={true}
            key="Password"
            setStateFunction={setPassword}
            Icon={MdPassword}
          />
          {/* alert section */}
          <AnimatePresence>
            {alert && (
              <motion.div
                key={"Alert Message"}
                {...fadeInOut}
                className="text-red-500 text-sm"
              >
                {alertMsg}
              </motion.div>
            )}
          </AnimatePresence>
          {/* login button */}
          {isLogin ? (
            <motion.div
              onClick={loginNewUser}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full
          py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-sm text-white">Login</p>
            </motion.div>
          ) : (
            <motion.div
              onClick={createNewUser}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-full
          py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-sm text-white">Sign Up</p>
            </motion.div>
          )}
          {/* account text section */}
          {isLogin ? (
            <p
              className="text-xs text-primaryText flex
            items-center justify-center gap-3"
            >
              Dont't Have an account !
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p
              className="text-xs text-primaryText flex
            items-center justify-center gap-3"
            >
              Already Have an account !
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 cursor-pointer"
              >
                Login Here
              </span>
            </p>
          )}
          {/* or section */}
          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>
          {/* sign in with google */}
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={signInWithGoogle}
            className="flex items-center justify-center gap-3
          bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer"
          >
            <FcGoogle className="text-xl" />
            <p className="text-sm text-white">Sign in with Google</p>
          </motion.div>
          {/* or section */}
          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>
          {/* sign in with github */}
          <motion.div
            onClick={signInWithGithub}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center gap-3
          bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer"
          >
            <FaGithub className="text-xl" />
            <p className="text-sm text-white">Sign in with Github</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
