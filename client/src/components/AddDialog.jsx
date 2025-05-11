import React, { useState } from "react";
import {
  Drawer,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../store/actions/taskActions";
import { toast } from "react-toastify";

export default function AddDialog() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    status: "todo",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(addTask(data, token, toast));
    setOpen(false);
  };

  return (
    <div>
      <Button
        size="small"
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          backgroundColor: "#2563eb", // Tailwind blue-600
          color: "white",
          "&:hover": {
            backgroundColor: "#1e40af", // Tailwind blue-800
          },
          px: 2,
          py: 1,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        + Add Task
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 420 },
            bgcolor: "#f0f4ff",
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
            boxShadow: 6,
            padding: 4,
          },
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={3} color="primary">
          📝 Create a New Task
        </Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <TextField
            label="Task Title"
            name="title"
            fullWidth
            value={data.title}
            onChange={handleChange}
            variant="outlined"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />

          <TextField
            label="Task Description"
            name="description"
            fullWidth
            multiline
            minRows={4}
            value={data.description}
            onChange={handleChange}
            variant="outlined"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={data.status}
              onChange={handleChange}
              label="Status"
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            >
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="inprogress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#2563eb",
                color: "white",
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#1e40af",
                },
              }}
            >
              Add Task
            </Button>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}
