import React, { useEffect } from "react";
import TaskBoard from "../components/TaskBoard";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../store/actions/taskActions";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const Home = () => {
	const dispatch = useDispatch();
	const { tasks } = useSelector((state) => state.tasks);
	const { token } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(fetchTasks(token));
	}, [dispatch, token]);

	return (
		<div className="min-h-screen w-full bg-white text-blue-800">
			{/* Navbar */}
			<Navbar />

			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="text-center py-10 px-4 bg-blue-50 shadow-md"
			>
				<Typography
					variant="h3"
					component="h1"
					className="font-bold text-blue-700"
				>
					Task Management Dashboard 📋
				</Typography>
				<p className="text-blue-500 mt-2 text-md">
					Efficiently organize, prioritize, and complete your work.
				</p>
			</motion.div>

			{/* Task Section */}
			<div className="flex justify-center px-4 py-10">
				{tasks.length > 0 ? (
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
						className="w-full max-w-6xl"
					>
						<TaskBoard tasks={tasks} />
					</motion.div>
				) : (
					<div className="mt-20">
						<CircularProgress
							thickness={4}
							size={60}
							sx={{ color: "#2563eb" }} // Tailwind blue-600
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
