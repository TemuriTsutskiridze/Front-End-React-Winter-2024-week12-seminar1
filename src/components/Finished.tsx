export default function Finished({
  score,
  dispatch,
}: {
  score: number;
  dispatch: (action: { type: string }) => void;
}) {
  return (
    <div>
      <h2>Quiz Finished</h2>
      <h3>Your Score: {score}</h3>

      <button
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart
      </button>
    </div>
  );
}
