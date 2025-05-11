import React from "react";
import EditDialog from "./UpdateTaskForm";
import DeleteAlertDialog from "./DeleteDialog";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../store/actions/taskActions";
import { toast } from "react-toastify";

import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

const statusColumns = ["To Do", "In Progress", "Done"];

const DraggableTask = ({ task, children }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task._id,
      data: { task },
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div
        {...listeners}
        {...attributes}
        className="w-6 h-6 mb-3 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 rounded-full cursor-grab shadow-md"
        title="Drag task"
      />
      {children}
    </div>
  );
};

const DroppableColumn = ({ status, children }) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex-1 min-w-[300px] bg-white rounded-2xl shadow-lg border p-5 border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b-2 pb-2 border-gradient-to-r from-blue-500 via-blue-400 to-blue-600">
        {status}
      </h2>
      {children}
    </div>
  );
};

const TaskBoard = ({ tasks }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const getTasksByStatus = (status) =>
    tasks.filter(
      (task) =>
        task.status?.toLowerCase().replace(" ", "") ===
        status.toLowerCase().replace(" ", "")
    );

  const handleMove = (task, newStatus) => {
    if (task.status === newStatus) {
      toast.info(`Task is already in '${newStatus}'`);
      return;
    }

    dispatch(
      updateTask(
        task._id,
        { ...task, status: newStatus },
        token,
        () => toast.success(`Moved to '${newStatus}' successfully`)
      )
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !active) return;

    const task = active.data.current.task;
    const destinationStatus = over.id;

    if (task.status !== destinationStatus) {
      handleMove(task, destinationStatus);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-col md:flex-row gap-6 px-4 pb-10">
        {statusColumns.map((status) => (
          <DroppableColumn key={status} status={status}>
            <div className="space-y-4">
              {getTasksByStatus(status).map((task) => (
                <DraggableTask key={task._id} task={task}>
                  <div
                    className="bg-white p-5 rounded-xl shadow-md border border-transparent hover:shadow-lg transition-all duration-300"
                    style={{
                      borderImage:
                        "linear-gradient(to right, #3b82f6, #60a5fa, #93c5fd) 1",
                      borderStyle: "solid",
                      borderWidth: "1px",
                    }}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-600">{task.description}</p>

                    <div className="flex flex-wrap justify-end gap-2 mt-4">
                      <EditDialog task={task} />
                      <DeleteAlertDialog id={task._id} />
                      {statusColumns
                        .filter((s) => s !== task.status)
                        .map((s) => (
                          <Button
                            key={s}
                            variant="outlined"
                            size="small"
                            sx={{
                              textTransform: "none",
                              color: "#3b82f6",
                              borderColor: "#3b82f6",
                              "&:hover": {
                                backgroundColor: "#3b82f615",
                                borderColor: "#3b82f6",
                              },
                            }}
                            onClick={() => handleMove(task, s)}
                          >
                            Move to {s}
                          </Button>
                        ))}
                    </div>
                  </div>
                </DraggableTask>
              ))}
            </div>
          </DroppableColumn>
        ))}
      </div>
    </DndContext>
  );
};

export default TaskBoard;
