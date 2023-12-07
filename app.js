import React from "react"
import { decode } from "html-entities"

export default function App() {
    
const [gameStarted, setGameStarted] = React.useState(false)
const [questions, setQuestions] = React.useState([])
const [answersSubmitted, setAnswersSubmitted] = React.useState(false)
const [points, setPoints] = React.useState(0)
const [answers, setAnswers] = React.useState(
        {
            0: "",
            1: "",
            2: "",
            3: "",
            4: "",
        }
    )

const defaultStyles = {
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid blue",
  padding: "10px", // Add padding for a bit of spacing
  cursor: "pointer", // Change cursor on hover
  transition: "background-color 0.3s", // Add a smooth transition effect
  backgroundColor: "white",
  color: "black",
};

const correctStyles = {
    borderRadius: "5px",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px", // Add padding for a bit of spacing
    cursor: "pointer", // Change cursor on hover
    transition: "background-color 0.3s",
    backgroundColor: "green",
    border: "1px solid darkgreen",
}

const incorrectStyles = {
    borderRadius: "5px",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px", // Add padding for a bit of spacing
    cursor: "pointer", // Change cursor on hover
    transition: "background-color 0.3s",
    backgroundColor: "red",
    border: "1px solid darkred",
}


    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setAnswers(prevAnswers => {
            return {
                ...prevAnswers,
                [name]: value
            }
        })
    }

function startGame() {
    setGameStarted(true)
}

function restartGame() {
    setGameStarted(false)
    setAnswers({
            0: "",
            1: "",
            2: "",
            3: "",
            4: "",
        })
    setQuestions([])
    setAnswersSubmitted(false)
}

function handleSubmit(event) {
        event.preventDefault()
        setAnswersSubmitted(true)
        if (answers[0] === decode(questions[0].correctAnswer)) {
            setPoints(prevPoints => prevPoints + 1)
        } 
        if (answers[1] === decode(questions[1].correctAnswer)) {
            setPoints(prevPoints => prevPoints + 1)
        } 
        if (answers[2] === decode(questions[2].correctAnswer)) {
            setPoints(prevPoints => prevPoints + 1)
        }
        if (answers[3] === decode(questions[3].correctAnswer)) {
            setPoints(prevPoints => prevPoints + 1)
        }
        if (answers[4] === decode(questions[4].correctAnswer)) {
            setPoints(prevPoints => prevPoints + 1)
        }
    }


    React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=23&difficulty=easy&type=multiple")
        .then(res => res.json())
        .then((data) => {
            const shuffledQuestions = data.results.map(result => {
                const answers = [...result.incorrect_answers, result.correct_answer];
                // Fisher-Yates shuffle
                for (let i = answers.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [answers[i], answers[j]] = [answers[j], answers[i]];
                }

                return {
                    question: result.question,
                    answers: answers,
                    correctAnswer: result.correct_answer
                };
            });

            setQuestions(shuffledQuestions);
        });
}, [gameStarted]);
  
    const questionElements = questions.map((question) => {
        return (
        <>
        <fieldset className="quest-container" id={questions.indexOf(question)}>
            <legend>{decode(question.question)}</legend>
            
            <input 
                    type="radio"
                    id={decode(question.answers[0])}
                    name={questions.indexOf(question)}
                    value={decode(question.answers[0])}
                    onChange={handleChange}
                    className="radio"
                    required
                />
                <label style={
                answersSubmitted
                    ? decode(question.answers[0]) === decode(questions[questions.indexOf(question)].correctAnswer)
                    ? correctStyles
                    : incorrectStyles
                    : defaultStyles
                }
                className="button"
                htmlFor={decode(question.answers[0])}>{decode(question.answers[0])}</label>
                <br />
            <input 
                    type="radio"
                    id={decode(question.answers[1])}
                    name={questions.indexOf(question)}
                    value={decode(question.answers[1])}
                    onChange={handleChange}
                    className="radio"
                />
                <label style={
                answersSubmitted
                    ? decode(question.answers[1]) === decode(questions[questions.indexOf(question)].correctAnswer)
                    ? correctStyles
                    : incorrectStyles
                    : defaultStyles
                }
                className="button"
                htmlFor={decode(question.answers[1])}>{decode(question.answers[1])}</label>
                <br />
            
            <input 
                    type="radio"
                    id={decode(question.answers[2])}
                    name={questions.indexOf(question)}
                    value={decode(question.answers[2])}
                    onChange={handleChange}
                    className="radio"
                />
                <label style={
                answersSubmitted
                    ? decode(question.answers[2]) === decode(questions[questions.indexOf(question)].correctAnswer)
                    ? correctStyles
                    : incorrectStyles
                    : defaultStyles
                }
                className="button"
                htmlFor={decode(question.answers[2])}>{decode(question.answers[2])}</label>
                <br />
                
            <input 
                    type="radio"
                    id={decode(question.answers[3])}
                    name={questions.indexOf(question)}
                    value={decode(question.answers[3])}
                    onChange={handleChange}
                    className="radio"
                />
                <label style={
                answersSubmitted
                    ? decode(question.answers[3]) === decode(questions[questions.indexOf(question)].correctAnswer)
                    ? correctStyles
                    : incorrectStyles
                    : defaultStyles
                }
                className="button"
                htmlFor={decode(question.answers[3])}>{decode(question.answers[3])}</label>
                <br /> 
            </fieldset>
           {answersSubmitted && (
            <p>
                You answered: {answers[questions.indexOf(question)]}{' '}
                {answers[questions.indexOf(question)] === decode(questions[questions.indexOf(question)].correctAnswer) ? (
                '✅'
                ) : (
                <>
                    ❌ The correct answer was{' '}
                    {decode(questions[questions.indexOf(question)].correctAnswer)}
                </>
                )}
            </p>
            )}
        </>
    )})
    
    return (
        <div>
            {!gameStarted && <div className="intro-container">
            <h1> Quizzical Quinn </h1>
            <h2> The Historical Trivia Game for all ages </h2>
            <button onClick={startGame}> Start Game </button>
        </div>}
            {gameStarted && 
            <div className="quiz-container">
                <h1> Quizzical Quinn </h1>
                <form onSubmit={handleSubmit}>
                {questionElements}
                {!answersSubmitted ? <button> Submit Answers </button> : <button onClick={restartGame}> Play Again </button>}
                </form>
                {answersSubmitted && (
                <p>
                    You scored {points}/5
                    {points < 1 ? (
                    ". What a shocking effort. Waste of your time."
                    ) : points < 2 ? (
                    ". The only point you got was a fluke."
                     ) : points < 3 ? (
                    ". A measly score but I have seen worse."
                    ) : points < 4 ? (
                    "! Not bad! But there's room for improvement."
                    ) : points < 5 ? (
                    "! Wow! An A grade effort! Not quite perfection though."
                    ) : (
                    "! Unbelievable! Perfect score! Great job! You are a God!"
                    )}
                </p>
                )}
            </div>}
        </div>
    )
}