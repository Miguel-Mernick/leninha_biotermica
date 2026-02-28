import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="navbar">
      <h2>♻️ Energias Renováveis</h2>

      <nav>
        <Link to="/">Início</Link>
        <Link to="/introducao">Introdução</Link>
        <Link to="/apostila">Apostila</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/ranking">Ranking</Link>
        <Link to="/conclusao">Conclusão</Link>
        <Link to="/sobre">Sobre</Link>
      </nav>

      <button onClick={() => setDark(!dark)}>
        {dark ? "☀️" : "🌙"}
      </button>
    </header>
  );
}