import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  Apply,
  DetailPost,
  Follow,
  Home,
  Login,
  MyPost,
  MyProfileForm,
  Register,
  Verify,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/my-profile" element={<MyProfileForm />} />
      <Route path="/my-post" element={<MyPost />} />
      <Route path="/detail-post/:id" element={<DetailPost />} />
      <Route path="/verify/:verifyCode" element={<Verify />} />
      <Route path="/follow" element={<Follow />} />
      <Route path="/apply" element={<Apply />} />
    </Routes>
  );
}

export default App;
