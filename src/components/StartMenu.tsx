export default function StartMenu({
  dispatch,
}: {
  dispatch: (action: { type: string }) => void;
}) {
  return (
    <div>
      <h2>Are you ready to start the quizz?</h2>
      <button
        onClick={() => {
          dispatch({ type: "start" });
        }}
      >
        Start the quizz
      </button>
    </div>
  );
}
