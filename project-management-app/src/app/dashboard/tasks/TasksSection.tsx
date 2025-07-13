"use client";

import { useState } from "react";
import { TaskFormWrapper } from "@/components/tasks/TaskFormWrapper";
import { TaskList } from "@/components/tasks/task-list";

type Props = {
  userId: string;
  ownedProjects: any[];
  tasksCreatedByUser: any[];
  tasksAssignedToUser: any[];
  tasksCompletedByUser: any[];
  tasksCompletedByAssignedUsers: any[];
};

type TaskView =
  | "assigned"
  | "created"
  | "completed"
  | "completedByOthers";

export default function TasksSection({
  userId,
  ownedProjects,
  tasksCreatedByUser,
  tasksAssignedToUser,
  tasksCompletedByUser,
  tasksCompletedByAssignedUsers,
}: Props) {
  const [view, setView] = useState<TaskView>("assigned");

  const renderTaskSection = () => {
    switch (view) {
      case "created":
        return (
          <>
            <h2 className="text-xl font-bold text-blue-700 mb-3">Tasks Created by Me</h2>
            <TaskList tasks={tasksCreatedByUser} currentUserId={userId} />
          </>
        );
      case "completed":
        return (
          <>
            <h2 className="text-xl font-bold text-blue-700 mb-3">Tasks Completed by Me</h2>
            <TaskList tasks={tasksCompletedByUser} currentUserId={userId} />
          </>
        );
      case "completedByOthers":
        return (
          <>
            <h2 className="text-xl font-bold text-blue-700 mb-3">
              Tasks Completed by People I Assigned
            </h2>
            <TaskList tasks={tasksCompletedByAssignedUsers} currentUserId={userId} />
          </>
        );
      case "assigned":
      default:
        return (
          <>
            <h2 className="text-xl font-bold text-blue-700 mb-3">Tasks Assigned To Me</h2>
            {tasksAssignedToUser.length > 0 ? (
              <TaskList tasks={tasksAssignedToUser} currentUserId={userId} />
            ) : (
              <p className="text-gray-600">No tasks assigned to you.</p>
            )}
          </>
        );
    }
  };

  return (
    <div className="space-y-10">
      {/* Create Task Section */}
      {ownedProjects.length > 0 && (
        <div className="bg-white border border-blue-200 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            Create New Task
          </h2>
          <TaskFormWrapper userId={userId} />
        </div>
      )}

      {/* Button Group for Task Views */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setView("assigned")}
          className={`px-4 py-2 rounded ${
            view === "assigned" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Assigned To Me
        </button>
        <button
          onClick={() => setView("created")}
          className={`px-4 py-2 rounded ${
            view === "created" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Created By Me
        </button>
        <button
          onClick={() => setView("completed")}
          className={`px-4 py-2 rounded ${
            view === "completed" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Completed By Me
        </button>
        <button
          onClick={() => setView("completedByOthers")}
          className={`px-4 py-2 rounded ${
            view === "completedByOthers" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Completed by People I Assigned
        </button>
      </div>

      {/* Task Section Display */}
      <section className="bg-white p-6 rounded shadow border border-blue-200">
        {renderTaskSection()}
      </section>
    </div>
  );
}
