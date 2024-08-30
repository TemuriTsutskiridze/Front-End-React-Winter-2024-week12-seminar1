export interface IQuestion {
  question: string;
  options: string[];
  correctOption: number;
  score: number;
}

interface State {
  questions: IQuestion[] | undefined;
  status: string;
  currentQuestionIndex: number;
  score: number;
}

export const initialState: State = {
  questions: [],
  status: "loading",
  currentQuestionIndex: 0,
  score: 0,
};

type Action = {
  type: string;
  payload?: IQuestion[] | { isCorrect: boolean; score: number };
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "next":
      if (state.currentQuestionIndex < state.questions!.length - 1) {
        return {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1,
        };
      } else {
        return { ...state, status: "finished" };
      }
    case "answer":
      console.log(action.payload);
      if (action.payload?.isCorrect) {
        return { ...state, score: state.score + action.payload.score };
      } else {
        return state;
      }
    case "restart":
      return initialState;
  }
  return state;
}
