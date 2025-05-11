import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../store/actions/taskActions";
import { toast } from "react-toastify";

export default function DeleteAlertDialog({ id }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleDeleteTask = () => {
    dispatch(deleteTask(id, token, toast));
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        onClick={() => setOpen(true)}
        sx={{ textTransform: "none", fontWeight: "bold" }}
      >
        Delete
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: { p: 2, borderRadius: 3, width: { xs: "90%", sm: 400 } },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight={600}>
            Delete Task
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Typography
            id="alert-dialog-description"
            variant="body1"
            color="text.secondary"
          >
            Are you sure you want to delete this task? This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Box display="flex" justifyContent="flex-end" gap={1} width="100%">
            <Button
              onClick={() => setOpen(false)}
              variant="outlined"
              color="primary"
              sx={{ borderRadius: 2, px: 3 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteTask}
              variant="contained"
              color="error"
              sx={{ borderRadius: 2, px: 3 }}
            >
              Delete
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
