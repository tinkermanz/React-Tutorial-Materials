import { useQuiz } from "../contexts/QuizContext";

export default function Options({ question }) {
	const { dispatch, answer } = useQuiz();

	const hasAnswered = answer !== null;
	return (
		<div className="options">
			{question.options.map((option, idx) => (
				<button
					key={option}
					className={`btn btn-option ${
						hasAnswered ? (idx === answer ? "answer" : "") : ""
					} ${
						hasAnswered
							? idx === question.correctOption
								? "correct"
								: "wrong"
							: ""
					}`}
					disabled={hasAnswered}
					onClick={() => dispatch({ type: "newAnswer", payload: idx })}
				>
					{option}
				</button>
			))}
		</div>
	);
}
