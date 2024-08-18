import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const intialState = {
	questions: [],
	// 'loading', 'error', 'ready', 'active', 'finished'
	status: "loading",
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: null,
};
function reducer(state, action) {
	switch (action.type) {
		case "dataRecived":
			return {
				...state,
				questions: action.payload,
				status: "ready",
			};
		case "dataFailed":
			return {
				...state,
				status: "error",
			};
		case "start":
			return {
				...state,
				status: "active",
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
			};
		case "newAnswer":
			const question = state.questions.at(state.index);
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};
		case "nextQuestion":
			return { ...state, index: state.index + 1, answer: null };
		case "finish":
			return {
				...state,
				status: "finished",
				highscore:
					state.points > state.highscore ? state.points : state.highscore,
			};
		case "restart":
			return { ...intialState, questions: state.questions, status: "ready" };
		case "tick":
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? "finished" : state.status,
			};
		default:
			throw new Error("Action unknown");
	}
}

function QuizProvider({ children }) {
	const [
		{ questions, status, index, answer, points, highscore, secondsRemaining },
		dispatch,
	] = useReducer(reducer, intialState);
	const numQuestions = questions?.length;
	const maxPossiblePoints = questions.reduce((pre, cur) => pre + cur.points, 0);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await fetch(`http://localhost:8000/questions`);
				const data = await res.json();

				dispatch({ type: "dataRecived", payload: data });
			} catch (err) {
				console.error(err.message);
				dispatch({ type: "dataFailed" });
			}
		}
		fetchData();
	}, []);

	console.log(questions);

	return (
		<QuizContext.Provider
			value={{
				questions,
				status,
				index,
				answer,
				points,
				highscore,
				secondsRemaining,
				numQuestions,
				maxPossiblePoints,
				dispatch,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
}

function useQuiz() {
	const context = useContext(QuizContext);

	console.log(context);

	if (context === undefined)
		throw new Error("Quiz context was accessed outside the Quizprovider");
	return context;
}

export { QuizProvider, useQuiz };
