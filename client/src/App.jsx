import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register"
import ForgotPass from "./pages/ForgotPass/ForgotPass";
import PrivateRoute from "./pages/PrivateRoute";
import VerifyCode from "./pages/ForgotPass/VerifyCode/VerifyCode";
import NewPass from "./pages/ForgotPass/NewPass/NewPass"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPass" element={<ForgotPass />} />
        <Route path="/verifyCode" element={<VerifyCode />} />
        <Route path="/newPass" element={<NewPass />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
