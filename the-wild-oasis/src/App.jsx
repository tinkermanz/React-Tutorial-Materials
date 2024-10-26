import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

const StyledApp = styled.div`
	background-color: orangered;
`;

export default function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<Heading type="h1">The Wild Oasis</Heading>
				<Button onClick={() => alert("Check in")}>Check in</Button>
				<Heading as="h2">Form</Heading>
				<Input type="number" placeholder="Number of guests" />
			</StyledApp>
		</>
	);
}
