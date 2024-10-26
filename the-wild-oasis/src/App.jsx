import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";

// Tagged Template Literal
const H1 = styled.h1`
	font-size: 30px;
	font-weight: 600;
	background-color: yellow;
`;

const StyledApp = styled.div`
	background-color: orangered;
`;

export default function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<H1>The Wild Oasis</H1>
				<Button onClick={() => alert("Check in")}>Check in</Button>
				<Input type="number" placeholder="Number of guests" />
			</StyledApp>
		</>
	);
}
