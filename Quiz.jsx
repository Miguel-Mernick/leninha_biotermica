    import { useState } from "react";

    const questions = [
    {
        q: "O que é biomassa?",
        a: ["Energia do vento", "Matéria orgânica usada como combustível", "Energia nuclear"],
        c: 1
    },
    {
        q: "Energia geotérmica vem:",
        a: ["Do oceano", "Interior da Terra", "Do vento"],
        c: 1
    }
    ];

    export default function Quiz() {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);

    function answer(i) {
        if (i === questions[current].c) setScore(score + 1);

        if (current < questions.length - 1) {
        setCurrent(current + 1);
        } else {
        alert(`Você fez ${score + 1} pontos!`);
        }
    }

    return (
        <div className="quiz">
        <h1>{questions[current].q}</h1>

        {questions[current].a.map((opt, i) => (
            <button key={i} onClick={() => answer(i)}>
            {opt}
            </button>
        ))}
        </div>
    );
    }