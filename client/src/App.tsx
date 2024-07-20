import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      {localStorage.getItem("token") ? (
        <Route path="/" element={<Main />} />
      ) : (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}
    </Routes>
  );
}

export default App;
