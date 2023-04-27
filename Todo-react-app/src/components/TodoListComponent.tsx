// Todo List component which will display list of todos
import React from "react";
import pendingTodoImg from "../assets/task-pending.png";
import successTodoImg from "../assets/task-completed.png";

type TodoProps = {
  text: string;
  status: "completed" | "pending";
  onTodoStatusChange: () => void;
};

// React.Component used to define Class Component and it takes in the TodoProps interface as its generic type parameter.
class TodoListComponent extends React.Component<TodoProps> {
  handleStatusClick = (): void => {
    // class method that handles the click event of the todo-status image, by invoking the onTodoStatusChange function passed as a prop.
    this.props.onTodoStatusChange();
  };
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
            onClick={this.handleStatusClick}
          />
        </div>
      </div>
    );
  }
}

export default TodoListComponent;
