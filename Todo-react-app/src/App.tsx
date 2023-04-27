import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainComponent from "./components/MainComponent";
import { Toaster } from "react-hot-toast";

const MyApp = (): JSX.Element => {
  return (
    <>
      <Toaster />
      <MainComponent />
    </>
  );
};
export default MyApp;
