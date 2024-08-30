import { IQuestion } from "../reducers/quizReducer";

export default function Question({
  question,
  dispatch,
}: {
  question: IQuestion;
  dispatch: (action: {
    type: string;
    payload?: { isCorrect: boolean; score: number };
  }) => void;
}) {
  return (
    <div>
      <h2>{question.question}</h2>
      <div>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              dispatch({
                type: "next",
              });
              dispatch({
                type: "answer",
                payload: {
                  isCorrect: index === question.correctOption,
                  score: question.score,
                },
              });
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
