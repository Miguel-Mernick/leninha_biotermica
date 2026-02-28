import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Introducao from "./pages/Introducao";
import Apostila from "./pages/Apostila";
import Quiz from "./pages/Quiz";
import Ranking from "./pages/Ranking";
import Conclusao from "./pages/Conclusao";
import Sobre from "./pages/Sobre";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/introducao" element={<Introducao />} />
          <Route path="/apostila" element={<Apostila />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/conclusao" element={<Conclusao />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;