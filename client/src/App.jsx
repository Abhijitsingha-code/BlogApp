import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Settings from "./Pages/Settings/Settings";
import Single from "./Pages/Single/Single";
import Write from "./Pages/Write/Write";
import Topbar from "./components/Topbar/Topbar";
import Footer from "./components/Footer/Footer";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import About from "./Pages/About/About";
import UserPage from "./Pages/User/UserPage";
import Float from "./components/Float/Float";
import "./app.css";

function App() {
  const User = useSelector(selectUser);
  const Admin = import.meta.env.VITE_REACT_ADMIN;

  return (
    <div className="app">
      {User ? (
        Admin === User?._id && (
          <div className="float">
            <Float />
          </div>
        )
      ) : (
        <></>
      )}
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/post/:postId" element={<Single />} />
        <Route path="/write" element={User !== null ? <Write /> : <Login />} />
        <Route path="/about" element={User !== null ? <About /> : <Login />} />
        <Route
          path="/settings"
          element={User !== null ? <Settings /> : <Login />}
        />
        <Route path="/auth" element={User !== null ? <Home /> : <Login />} />
        {User ? (
          Admin === User._id && <Route path="/users" element={<UserPage />} />
        ) : (
          <></>
        )}
      </Routes>
      {User && <Footer />}
    </div>
  );
}

export default App;
