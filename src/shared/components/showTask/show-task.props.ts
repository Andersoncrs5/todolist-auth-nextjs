import {Task} from "@/core/entities/Task";
import React from "react";

export interface ShowTaskProps {
    task: Task
    children?: React.ReactNode
    buttons?: React.ReactNode
}