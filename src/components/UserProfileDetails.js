import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { Menus, signOutUser } from "../utils/helpers";
import { Link } from "react-router-dom";
import { slideUp } from "../animations";

const UserProfileDetails = () => {
  const user = useSelector((state) => state.auth?.user);
  const [isMenu, setIsMenu] = useState(false);

  return (
    <div className="flex items-center justify-center gap-4 relative">
      <div
        className="w-10 h-10 flex items-center justify-center rounded-xl
    overflow-hidden cursor-pointer bg-emerald-500"
      >
        {user?.photoURL ? (
          <motion.img
            whileHover={{ scale: 1.2 }}
            src={user?.photoURL}
            alt={user?.displayName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover flex items-center justify-center"
          />
        ) : (
          <p className="text-lg text-white font-semibold capitalize">
            {user?.email[0]}
          </p>
        )}
      </div>
      <motion.div
        onClick={() => setIsMenu(!isMenu)}
        whileTap={{ scale: 0.9 }}
        className="p-4 rounded-md flex items-center justify-center
       bg-secondary cursor-pointer"
      >
        <FaChevronDown className="text-primaryText " />
        <AnimatePresence>
          {isMenu && (
            <motion.div
              {...slideUp}
              className="bg-secondary absolute top-14 right-0 px-4 py-3 
         rounded-xl shadow-md z-10 flex flex-col items-start justify-start gap-4 min-w-[180px]"
            >
              {Menus &&
                Menus.map((menu) => (
                  <Link
                    to={menu.url}
                    key={menu.id}
                    className="text-primaryText text-sm hover:bg-[rgba(256,256,256,0.05)]
                 px-2 py-1 w-full rounded-md"
                  >
                    {menu.name}
                  </Link>
                ))}
              <motion.p
                onClick={signOutUser}
                whileTap={{ scale: 0.9 }}
                className="text-primaryText text-sm hover:bg-[rgba(256,256,256,0.05)]
                 px-2 py-1 w-full rounded-md"
              >
                Sign Out
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default UserProfileDetails;
