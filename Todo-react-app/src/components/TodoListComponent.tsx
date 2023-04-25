// Todo List component which will display list of todos
import React from "react";
import pendingTodoImg from "../assets/task-pending.png";
import successTodoImg from "../assets/task-completed.png";

type TodoProps = {
  text: string;
  status: "completed" | "pending";
};

// React.Component used to define Class Component and it takes in the TodoProps interface as its generic type parameter.
class TodoComponent extends React.Component<TodoProps> {
  render(): React.ReactNode {
    const { text, status } = this.props;
    return (
      <div className="todo">
        <div className="todo-list">
          <span className={status === "completed" ? "completed" : "pending"}>
            {text}
          </span>
          <img
            className="todo-status"
            src={status === "completed" ? successTodoImg : pendingTodoImg}
            alt={status === "completed" ? "completed" : "pending"}
          />
        </div>
      </div>
    );
  }
}

export default TodoComponent;
