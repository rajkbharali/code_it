import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiChevronDoubleLeft } from "react-icons/hi2";
import { motion } from "framer-motion";
import { Link, Route, Routes } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { FaSearchengin } from "react-icons/fa";
import { Projects, SignUp } from "../container";
import { UserProfileDetails } from "../components";
import { searchProject } from "../utils/searchSlice";

const Home = () => {
  const user = useSelector((state) => state.auth?.user);
  const searchTerm = useSelector((state) =>
    state.search?.searchTerm ? state.search?.searchTerm : ""
  );

  const [isSideMenu, setIsSideMenu] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={`w-2 ${
          isSideMenu ? "w-2" : "flex-[.2] xl:flex-[.2]"
        } min-h-screen max-h-screen relative bg-secondary px-3 py-6
          flex flex-col items-center justify-start transition-all duration-200
          ease-in-out`}
      >
        {/* anchor */}
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg 
          absolute -right-6 flex items-center justify-center cursor-pointer"
          onClick={() => {
            setIsSideMenu(!isSideMenu);
          }}
        >
          <HiChevronDoubleLeft className="text-white text-lg" />
        </motion.div>
        {/* logo */}
        <div className="overflow-hidden w-full flex flex-col gap-4">
          <Link to={"/home"}>
            <h1 className="flex items-center justify-center font-semibold text-white text-2xl">
              CODE-<span className="text-red-600">IT</span> !
            </h1>
          </Link>
          {/* start coading button */}
          <Link to={"/newProject"}>
            <div
              className="px-6 py-3 flex items-center justify-center
          rounded-xl border border-gray-400 cursor-pointer group
          hover:border-gray-200"
            >
              <p className="text-gray-400 group-hover:text-gray-200 capitalize text-xs">
                Start Coding
              </p>
            </div>
          </Link>
          {/* home nav */}
          {user && (
            <Link
              to={"/home/projects"}
              className="flex items-center justify-center gap-2"
            >
              <MdHome className="text-primaryText text-xl" />
              <p className="text-sm text-primaryText">Home</p>
            </Link>
          )}
        </div>
      </div>
      <div
        className="flex-1 min-h-screen max-h-screen overflow-y-scroll
      h-full flex-col items-start justify-start px-4 md:px-12 py-4
      md:py-12"
      >
        {/* top section */}
        <div className="w-full flex items-center justify-center gap-3">
          {/* search */}
          <div
            className="bg-secondary w-full rounded-md px-4 py-1
          flex items-center justify-center gap-3"
          >
            <FaSearchengin className="text-xl text-primaryText" />
            <input
              type="text"
              value={searchTerm}
              className="flex-1 px-4 py-1 text-sm bg-transparent outline-none
            border-none text-primaryText placeholder:text-gray-600"
              placeholder="Search here..."
              onChange={(e) => dispatch(searchProject(e.target.value))}
            />
          </div>
          {/* profile section */}
          {!user && (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center gap-3"
            >
              <Link
                to={"/home/auth"}
                className="bg-emerald-500 px-6 py-2 rounded-md text-white
            text-xs cursor-pointer hover:bg-emerald-700"
              >
                SignUp
              </Link>
            </motion.div>
          )}
          {user && <UserProfileDetails />}
        </div>
        {/* bottom section */}
        <div className="w-full">
          <Routes>
            <Route path="/*" element={<Projects />} />
            <Route path="/auth" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
