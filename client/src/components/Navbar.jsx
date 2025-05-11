import React from "react";
import AddDialog from "./AddDialog";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 shadow-md bg-white/90 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center rounded-b-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 shadow-xl">
        <h1 className="text-white text-2xl md:text-3xl font-bold tracking-wide drop-shadow">
          Trackit 
        </h1>

        <div className="flex items-center gap-4">
          {/* Add Task Button */}
          <div className="rounded-full bg-white px-4 py-1.5 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <AddDialog />
          </div>

          {/* Profile */}
          <div className="rounded-full bg-white px-4 py-1.5 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <Profile data={user} />
          </div>

          {/* Logout Button */}
          <Link
            to="/logout"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-blue-600 hover:text-white hover:bg-red-600 transition font-semibold shadow-md hover:scale-105 duration-300"
          >
            <FaSignOutAlt />
            Logout
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
