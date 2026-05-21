import express from "express"
import rateLimit from 'express-rate-limit';
import { addTask, completeTask, deleteTask, getTask, getTasks, updateTask } from "../controller/task.controller.js"

const router = express.Router();

const taskLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: {
        message: "Zbyt wiele żądań z tego adresu IP, spróbuj ponownie za 15 minut."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post("/add-task", taskLimiter, addTask);
router.delete("/delete-task/:id", taskLimiter, deleteTask);
router.put("/complete-task/:id", taskLimiter, completeTask);
router.put("/update-task/:id", taskLimiter, updateTask);

export default router;