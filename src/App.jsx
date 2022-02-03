import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

import Home from "./pages/home";
import CadCompetidor from "./pages/cadastro_competidor";
import CadPista from "./pages/cadastro_pista";
import ErrorPage from "./pages/error";
import Profile from "./pages/profile";
import PersonalProfile from "./pages/profile_personal";

export default function App() {
  return (
    <Router>
      <nav>
        <Link className="link first" to="/">
          <HomeOutlinedIcon />
        </Link>

        <div className="right_op">
          <div className="cadastro">
            <Link className="link" to="/profile">
              <PermIdentityOutlinedIcon />
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route exact path="/cadastro_competidor" element={<CadCompetidor />} />
        <Route exact path="/cadastro_pista" element={<CadPista />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/profile/user/" element={<PersonalProfile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}
