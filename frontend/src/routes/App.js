import Login from "./Login";
// import Home from "../Components/Home";
import AuthRoute from "../Components/AuthRoute";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthRoute />}>
          {/* <Route path="/*" element={<Home />} /> */}
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
