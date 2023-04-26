// Main Todo Container component which display whole Todo App
import React, { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import DateComponent from "./DateComponent";
import TodoListComponent from "./TodoListComponent";
import TaskCompletedImg from "../assets/all-task-completed.gif";

interface Todo {
  text: string;
  status: "pending" | "completed";
}

const TodoContainer: React.FC = (): JSX.Element => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [todoText, setTodoText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const todoEndRef = useRef<HTMLDivElement>(null);

  // when user clicks on + button it will show input field to add todo
  const handlePlusClick = (): void => {
    setShowInput(true);
  };

  useEffect(() => {
    // get the existing todos from localStorage using JSON.parse() method or create an empty array if no todos exist.
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodo(storedTodos);
  }, []);

  // function to save todo in localStorage when enter key is pressed
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Enter") {
      if (!todoText.trim()) {
        toast.error("Todo can't be empty!", { duration: 1500 });
      } else {
        // created a newTodo object using the text from the input field and set its status to 'pending'
        const newTodo = { text: todoText, status: "pending" } as Todo;
        // add the new todo object to the existing todo array using the setTodo method
        setTodo([...todo, newTodo]);
        // store the updated list of todos in localStorage
        localStorage.setItem("todos", JSON.stringify([...todo, newTodo]));
        setTodoText("");
        toast.success("Todo has been added!", { duration: 1500 });
      }
    }
  };

  // if the current date is different from the saved date in local storage. clear the localStorage
  const checkAndClearLocalStorage = (): void => {
    const currentDate = new Date().toLocaleDateString();
    const savedDate = localStorage.getItem("date");
    if (currentDate !== savedDate) {
      localStorage.clear();
      localStorage.setItem("date", currentDate);
    }
  };

  // function to change status of todos from initial status "pending" to "completed"
  const handleStatusChange = (index: number) => {
    const newTodoList = [...todo];
    if (newTodoList[index].status === "pending") {
      // If the todo is pending, mark it as completed and remove it from localStorage
      newTodoList[index].status = "completed";
      localStorage.removeItem(`todo-${index}`);
      localStorage.setItem("todos", JSON.stringify(newTodoList));
      toast.success("Woohoo! Todo complete!", { duration: 1500, icon: "🎉" });
    } else {
      // If the todo is completed, remove it from the UI and localStorage
      newTodoList.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(newTodoList));
      toast.success("Todo removed!", { duration: 1500, icon: "🚀" });
    }
    setTodo(newTodoList);
  };

  useEffect(() => {
    if (showInput) {
      inputRef.current?.focus();
      const handleEscape = (e: KeyboardEvent): void => {
        if (e.key === "Escape") {
          setShowInput(false);
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [showInput]);

  useEffect(() => {
    todoEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [todoText]);

  checkAndClearLocalStorage();

  // render UI
  return (
    <>
      <section className="main">
        <div className="mx-4 card">
          <div className="container">
            <DateComponent />

            {todo.length === 0 ? (
              <div className="task-completed">
                <p className="todos-completed">All Todos Completed!</p>
                <img
                  className="img-fluid"
                  src={TaskCompletedImg}
                  alt="All Task Completed"
                />
              </div>
            ) : (
              <div className="todo-container">
                {todo.map((item, index) => (
                  <TodoListComponent
                    key={index}
                    text={item.text}
                    status={item.status}
                    onStatusChange={() => handleStatusChange(index)}
                  />
                ))}
                <div ref={todoEndRef}></div>
              </div>
            )}

            {showInput ? (
              <div className="inputText">
                <input
                  type="text"
                  placeholder="Add Your Todo!"
                  ref={inputRef}
                  value={todoText}
                  onChange={(e) => setTodoText(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                />
                <Toaster />
              </div>
            ) : (
              <button className="plus" onClick={handlePlusClick}>
                <div className="add">
                  <p>+</p>
                </div>
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default TodoContainer;
