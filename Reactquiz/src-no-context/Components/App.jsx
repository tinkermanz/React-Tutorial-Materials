import { useEffect, useReducer } from "react";
import Header from "./Header";
import { Main } from "./MainEl";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";

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

export default function App() {
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
				console.log(data);
				dispatch({ type: "dataRecived", payload: data });
			} catch (err) {
				console.error(err.message);
				dispatch({ type: "dataFailed" });
			}
		}
		fetchData();
	}, []);

	return (
		<div className="app">
			<Header />

			<Main>
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && (
					<StartScreen dispatch={dispatch} numQuestions={numQuestions} />
				)}
				{status === "active" && (
					<>
						<Progress
							points={points}
							index={index}
							numQuestions={numQuestions}
							maxPossiblePoints={maxPossiblePoints}
							answer={answer}
						/>
						<Question
							question={questions.at(index)}
							answer={answer}
							dispatch={dispatch}
						/>
						<Footer>
							<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />

							<NextButton
								index={index}
								numQuestions={numQuestions}
								dispatch={dispatch}
								answer={answer}
							/>
						</Footer>
					</>
				)}
				{status === "finished" && (
					<FinishedScreen
						points={points}
						maxPossiblePoints={maxPossiblePoints}
						highscore={highscore}
						dispatch={dispatch}
					/>
				)}
			</Main>
		</div>
	);
}
