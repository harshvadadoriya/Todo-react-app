// Main Todo Container component which display whole Todo App
import React, { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import DateComponent from "./DateComponent";
import TodoComponent from "./TodoListComponent";

const TodoContainer: React.FC = (): JSX.Element => {
  const [todo, setTodo] = useState("");
  const [showInput, setShowInput] = useState(false);
  const inputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  // when user clicks on + button it will show input field to add todo
  const handlePlusClick = (): void => {
    setShowInput(true);
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
    // run below function on every render
    checkAndClearLocalStorage();
  }, [showInput]);

  // function to save todo in localStorage when enter key is pressed
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // get the existing todos from local storage using JSON.parse() method or create an empty array if no todos exist.
      const todos = JSON.parse(localStorage.getItem("todos") || "[]");
      todos.push({ text: todo, status: "pending" });
      localStorage.setItem("todos", JSON.stringify(todos));
      setTodo("");
      toast.success("Todo has been added", { duration: 1500 });
    }
  };

  // if the current date is different from the saved date in local storage. clear the localStorage
  const checkAndClearLocalStorage = () => {
    const currentDate = new Date().toLocaleDateString();
    const savedDate = localStorage.getItem("date");
    if (currentDate !== savedDate) {
      localStorage.clear();
      localStorage.setItem("date", currentDate);
    }
  };

  return (
    <>
      <section className="main">
        <div className="mx-4 card">
          <div className="container">
            <DateComponent />
            <div className="todo-container">
              <TodoComponent text="Go for a walk" status="completed" />
              <TodoComponent text="Try not to fall asleep" status="completed" />
              <TodoComponent text="Go To Gym" status="pending" />
              <TodoComponent text="Read an article" status="pending" />
              <TodoComponent text="Watch 'Sherlock'" status="pending" />
            </div>
            {showInput ? (
              <div className="inputText">
                <input
                  type="text"
                  placeholder="Add Your Todo!"
                  ref={inputRef}
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                  onKeyUp={handleInputKeyDown}
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
