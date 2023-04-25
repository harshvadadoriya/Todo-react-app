// Main Todo Container component which display whole Todo App
import React, { useState, useRef, useEffect } from "react";
import DateComponent from "./DateComponent";
import TodoComponent from "./TodoListComponent";

const TodoContainer: React.FC = (): JSX.Element => {
  const [showInput, setShowInput] = useState(false);
  const inputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const handlePlusClick = (): void => {
    setShowInput(true);
  };

  useEffect(() => {
    if (showInput) {
      inputRef.current?.focus();
      const handleEscape = (event: KeyboardEvent): void => {
        if (event.key === "Escape") {
          setShowInput(false);
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [showInput]);

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
                />
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
