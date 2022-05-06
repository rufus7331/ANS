import React, {useState} from 'react';

// pobranie pytań z pliku JSON
import questions from '../questions.json';
import Question from "./question";
import Answers from "./answers";
import Results from "./results";
import Actions from "./actions";

const styles = {
    display: 'flex',
    justifyContent: 'center'
};

const tablica = questions;
console.log(tablica)

const QuizComponent = (props) => {


//Stworzenie niezbędnych hook;ów

    const [currentIndex, setIndex] = useState(0);
    const [currentQuestion, setQuestion] = useState(tablica[currentIndex]);
    const [currentPoints, setPoints] = useState(0);
    const [allowToChoose, changePermission] = useState(true);
    const [markedAnswer, markAnswer] = useState({key: -1, variant: ''});


// przejście do kolejnego pytania

    const handleNextQuestion = () => {
        const nextValue = currentIndex + 1;
        if (nextValue > tablica.length - 1) {
            setIndex(tablica.length - 1);
            return;
        }
        setIndex(nextValue);
        setQuestion(tablica[nextValue]);
        changePermission(true);
        markAnswer({key: -1, variant: ''});
    };

// przejście do poprzedniego pytania

    const handlePrevQuestion = () => {
        const prevValue = currentIndex - 1;
        if (prevValue < 0) {
            setIndex(0);
            return;
        }
        setIndex(prevValue);
        setQuestion(tablica[prevValue]);
        changePermission(true);
        markAnswer({key: -1, variant: ''});
    };


//sprawdzenie poprawnej odpowiedzi


    const handleCheckAnswer = (chosenOption, key) => {
        if (!allowToChoose) {
            return;
        }
        if (currentQuestion.correct_answer === chosenOption) {
            const points = currentPoints + 1;
            setPoints(points);
            changePermission(false);
            markAnswer({key, variant: 'bg-success'})
            //tablica[currentQuestion]
        } else {
            changePermission(false);
            markAnswer({key, variant: 'bg-danger'})
        }

    };
// wyświetlenie zawartości

    return (
        <div style={styles}>
        <div className="containter">
            <Question
                className="col-12"
                currentQuestion={currentQuestion.question}
                currentIndex={currentIndex + 1}
                allQuestions={tablica.length}
            >
            </Question>
            <Answers className="col-12"
                     checkAnswer={handleCheckAnswer}
                     currentAnswers={currentQuestion.answers}
                     markedAnswer={markedAnswer}
            />
            <Results points={currentPoints}/>
            <Actions
                disablePrev={currentIndex > 0}
                disableNext={currentIndex !== tablica.length - 1}
                prev={handlePrevQuestion}
                next={handleNextQuestion}
            />
        </div>
        </div>
    )
};

export default QuizComponent;