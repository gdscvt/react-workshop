import "./App.css";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function App() {
  const [difficulty, setDifficulty] = useState(50.0);
  const [winCount, setWinCount] = useState(0);
  const [lossCount, setLossCount] = useState(0);
  const [result, setResult] = useState(null);

  function choiceToString(input) {
    switch (input) {
      case 0:
        return "Rock";
      case 1:
        return "Paper";
      default:
        return "Scissors";
    }
  }

  function choose(input, difficulty) {
    const rand = Math.random();
    if (rand < (difficulty / 50.0) * (1.0 / 3.0)) {
      return (input + 1) % 3;
    } else if (rand < (difficulty / 50.0) * (2.0 / 3.0)) {
      return input;
    } else {
      return (input + 2) % 3;
    }
  }

  function checkWin(me, ai) {
    if (me === (ai + 1) % 3) {
      setWinCount(winCount + 1);
      return `The opponent chose ${choiceToString(ai)}, you win!`;
    } else if (me === (ai + 2) % 3) {
      setLossCount(lossCount + 1);
      return `The opponent chose ${choiceToString(ai)}, you lose!`;
    } else {
      return `The opponent chose ${choiceToString(ai)}, tie!`;
    }
  }

  function playGame(input, difficulty) {
    setResult(checkWin(input, choose(input, difficulty)));
  }

  function difficultyToString(difficulty) {
    if (difficulty < 100.0 / 3.0) {
      return "Easy";
    } else if (difficulty < (2 * 100.0) / 3.0) {
      return "Medium";
    } else {
      return "Hard";
    }
  }

  return (
    <div className="App">
      <Container>
        <h1 className="pb-5">Rock Paper Scissors AI</h1>
        <h3 className="pt-5">Select a difficulty below:</h3>
        <Form.Range
          min="0"
          max="100"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        />
        <p>Difficulty: {difficulty}%</p>
        <p className="pb-5">{difficultyToString(difficulty)}</p>
        <Row className="py-5">
          <Col>
            <Button onClick={(e) => playGame(0, difficulty)}>Rock</Button>
          </Col>
          <Col>
            <Button onClick={(e) => playGame(1, difficulty)}>Paper</Button>
          </Col>
          <Col>
            <Button onClick={(e) => playGame(2, difficulty)}>Scissors</Button>
          </Col>
        </Row>
        <p className="pt-5">{result}</p>
        <Row>
          <Col>Win Count: {winCount}</Col>
          <Col>Loss Count: {lossCount}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
