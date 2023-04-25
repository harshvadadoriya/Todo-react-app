// Main Todo Container component which display whole Todo App
import React, { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import DateComponent from "./DateComponent";
import TodoComponent from "./TodoListComponent";

interface Todo {
  text: string;
  status: "pending" | "completed";
}

const TodoContainer: React.FC = (): JSX.Element => {
  const [todo, setTodo] = useState("");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // when user clicks on + button it will show input field to add todo
  const handlePlusClick = (): void => {
    setShowInput(true);
  };

  // function to save todo in localStorage when enter key is pressed
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Enter") {
      // get the existing todos from localStorage using JSON.parse() method or create an empty array if no todos exist.
      const todos = JSON.parse(localStorage.getItem("todos") || "[]");
      if (!todo.trim()) {
        // show alert if the todo string is empty or contains only spaces
        toast.error("Todo can't be empty!", { duration: 1500 });
      } else {
        // else store todo in localStorage
        todos.push({ text: todo, status: "pending" });
        localStorage.setItem("todos", JSON.stringify(todos));
        setTodo("");
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

  checkAndClearLocalStorage();

  // render UI
  return (
    <>
      <section className="main">
        <div className="mx-4 card">
          <div className="container">
            <DateComponent />
            <div className="todo-container">
              {localStorage.getItem("todos") &&
                JSON.parse(localStorage.getItem("todos") || "[]").map(
                  (item: Todo, index: number) => (
                    <TodoComponent
                      key={index}
                      text={item.text}
                      status={item.status}
                    />
                  )
                )}
            </div>
            {showInput ? (
              <div className="inputText">
                <input
                  type="text"
                  placeholder="Add Your Todo!"
                  ref={inputRef}
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
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
