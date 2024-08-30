import "./App.css";
import { useEffect, useReducer } from "react";
import { reducer, initialState } from "./reducers/quizReducer";
import Loading from "./components/Loading";
import Error from "./components/Error";
import StartMenu from "./components/StartMenu";
import Question from "./components/Question";
import Finished from "./components/Finished";

function App() {
  const [{ status, questions, currentQuestionIndex, score }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    if (status === "loading") {
      async function fetchQuestions() {
        try {
          const response = await fetch("http://localhost:3001/questions");
          if (response.ok) {
            const data = await response.json();
            dispatch({ type: "dataReceived", payload: data });
          } else {
            throw new Error("Failed to fetch questions");
          }
        } catch (error) {
          dispatch({ type: "error" });
        }
      }

      fetchQuestions();
    }
  }, [status]);

  return (
    <>
      {status === "loading" && <Loading />}
      {status === "error" && <Error />}
      {status === "ready" && <StartMenu dispatch={dispatch} />}
      {status === "active" && (
        <Question
          question={questions[currentQuestionIndex]}
          dispatch={dispatch}
        />
      )}
      {status === "finished" && <Finished score={score} dispatch={dispatch} />}
    </>
  );
}

export default App;
