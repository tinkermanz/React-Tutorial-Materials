import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.div`
	padding: 4.8rem;
`;

export default function App() {
	return (
		<>
			<GlobalStyles />
			<Row>
				<StyledApp>
					<Row type="horizontal">
						<Heading type="h1">The Wild Oasis</Heading>

						<div>
							<Heading as="h2">Check in and out</Heading>
							<Button onClick={() => alert("Check in")}>Check in</Button>
							<Button
								variation="secondary"
								size="small"
								onClick={() => alert("Check out")}
							>
								Check out
							</Button>
						</div>
					</Row>

					<Row>
						<Heading as="h2">Form</Heading>
						<form>
							<Input type="number" placeholder="Number of guests" />
							<Input type="number" placeholder="Number of guests" />
						</form>
					</Row>
				</StyledApp>
			</Row>
		</>
	);
}
