
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const choiceInfo = {
  'rock': { choice: 'rock', winsAgainst: 'scissors', description: 'The mighty rock.' },
  'paper': { choice: 'paper', winsAgainst: 'rock', description: 'The flimsy and flexible paper.' },
  'scissors': { choice: 'scissors', winsAgainst: 'paper', description: 'The sharp bladed scissors.' },
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      playerScore: 0,
      computerScore: 0,
      ties: 0,
      gameOver: false,
      winner: null,
    }
  }

  handleClick(choice) {
    console.log(`Handleclick says you chose ${choice}`);


    if (!this.state.gameOver) {
      let userChoiceElement = document.querySelector(`#${choice}`);
      userChoiceElement.classList.add('card-clicked-by-user');

      let computerChoice = this.makeComputerChoice();
      let computerChoiceElement = document.querySelector(`#${computerChoice}`);
      computerChoiceElement.classList.add('card-clicked-by-computer');

      let winner = this.checkWinner(choice, computerChoice);
      console.log(`Computer chose ${computerChoice}`);

      if (winner) {
        this.addPoint(winner);
        this.setState({ winner: winner })
      } else {
        this.setState({ ties: this.state.ties + 1, winner: 'tie' })
      }

      this.setState({ gameOver: !this.state.gameOver });
      this.renderResult(winner);

    } else { console.log('but the game is over :('); } //TODO: reset button removes highlights
  }

  makeComputerChoice() {
    let i = Math.floor(Math.random() * 3);
    let options = ['rock', 'paper', 'scissors'];
    let choice = options[i];
    return choice;
  }

  checkWinner(userChoice, computerChoice) {
    let user = choiceInfo[userChoice]; //selects choice object from info
    let computer = choiceInfo[computerChoice];

    if (user.winsAgainst == computerChoice) {
      console.log('You win!');
      return 'user';
    } else if (computer.winsAgainst == userChoice) {
      console.log('You lose!');
      return 'computer';
    } else {
      console.log("It's a tie!");
      return;
    }
  }

  addPoint(winner) {
    (winner == 'user') ?
      this.setState({ playerScore: this.state.playerScore + 1 }) :
      this.setState({ computerScore: this.state.computerScore + 1 });
  }

  renderResult(winner) {
    const textDisplay = {
      'user': {message: 'You win!', color:'green'},
      'computer': {message: 'Computer wins!', color: 'red'},
      'tie': {message: `It's a tie! We're all winners.`, color: 'grey'}
    }
    if (!winner){winner='tie'};
    
    console.log(`winner is ${winner}`);
    return (
      <Result
        winner={textDisplay[winner].message}
        color={textDisplay[winner].color}
        onClick={() => this.resetGame()} />)
  }

  resetGame() {
    this.setState({ gameOver: false });
    let cards = document.querySelectorAll('.card');
    for (let i = 0; i < 3; i++) {
      cards[i].classList.remove('card-clicked-by-user');
      cards[i].classList.remove('card-clicked-by-computer');
    }
  }

  render() {
    return (
      <div className={'game'}>
        <h1>Rock, Paper, Scissors</h1>
        <p className={"startinfo"}>Make your choice: </p>
        <div className={'cardContainer'}>
          <Card
            choice={'rock'}
            onClick={() => this.handleClick('rock')}
            id={'rock'}
          />
          <Card
            choice={'paper'}
            onClick={() => this.handleClick('paper')}
            id={'paper'}
          />
          <Card
            choice={'scissors'}
            onClick={() => this.handleClick('scissors')}
            id={'scissors'} />
        </div>
        {this.state.gameOver ? this.renderResult(this.state.winner) : null}
        <ScoreBoard
          player={this.state.playerScore}
          computer={this.state.computerScore}
          ties={this.state.ties} />

      </div>
    )
  }
}

function Card(props) {
  let choice = choiceInfo[props.choice]; //rock, paper, or scissors (as string)

  return (
    <div className={'card'} id={props.id} onClick={props.onClick}>
      <h3>{choice.choice}</h3>
      <img src={`./images/${props.choice}.jpg`} alt={props.choice} width={'150px'}></img>
      <p>{choice.description}</p>
    </div>
  )
}


function ScoreBoard(props) {
  return (
    <div className={'score'}>
      <h2>
        Player: {props.player}
      </h2>
      <h2>
        Computer: {props.computer}
      </h2>
      <h2>
        Ties: {props.ties}
      </h2>
    </div>
  )
}

function Result(props) { //props: winner as string (user, computer, tie), onClick as reset
  return (
    <div className={'result'} style={{backgroundColor: `${props.color}`}}>
      <h2>Result: {props.winner}</h2>
      <button onClick={props.onClick}>Play again</button>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
