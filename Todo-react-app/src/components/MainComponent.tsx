import DateComponent from "./DateComponent";
import TodoContainer from "./TodoContainer";

const MainComponent = () => {
  return (
    <>
      <section className="main">
        <div className="mx-4 card">
          <div className="container">
            <DateComponent />
            <TodoContainer />
          </div>
        </div>
      </section>
    </>
  );
};
export default MainComponent;
