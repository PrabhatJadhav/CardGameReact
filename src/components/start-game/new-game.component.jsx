import React, { useEffect, useRef, useState } from "react";
import { UseFetchCreateDeck, useFetchDrawCards } from "../useFetch";
import "./new-game.styles.scss";
import { motion } from "framer-motion";

const cardsCode = [
  "2S",
  "2H",
  "2D",
  "2C",
  "3S",
  "3H",
  "3D",
  "3C",
  "4S",
  "4H",
  "4D",
  "4C",
  "5S",
  "5H",
  "5D",
  "5C",
  "6S",
  "6H",
  "6D",
  "6C",
  "7S",
  "7H",
  "7D",
  "7C",
  "8S",
  "8H",
  "8D",
  "8C",
  "9S",
  "9H",
  "9D",
  "9C",
  "10S",
  "10H",
  "10D",
  "10C",
  "JS",
  "JH",
  "JD",
  "JC",
  "QS",
  "QH",
  "QD",
  "QC",
  "KS",
  "KH",
  "KD",
  "KC",
  "AS",
  "AH",
  "AD",
  "AC",
];

const cardRankingChecker = (card1, card2) => {
  let player, computer;
  cardsCode.forEach((code, index) => {
    if (card1 === code) {
      player = index;
    }
  });
  cardsCode.forEach((code, index) => {
    if (card2 === code) {
      computer = index;
    }
  });

  if (player > computer) {
    return 1;
  } else {
    return 0;
  }
};

function NewGame() {
  let cardId = useRef(null);
  const [TwoCard, setTwoCard] = useState(null);
  const [remaining, setRemaining] = useState(26);
  const [showWinner, setWinner] = useState(null);
  const [count, setCount] = useState({
    player: 0,
    computer: 0,
  });

  useEffect(() => {
    const asyncFetch = async () => {
      const createDeck = await UseFetchCreateDeck();
      cardId.current = createDeck.deck_id;
    };
    asyncFetch();
  }, [cardId]);

  const DrawCard = async () => {
    const drawTwoCard = await useFetchDrawCards(cardId.current);
    const cards = drawTwoCard.cards;
    if (drawTwoCard.success) {
      setTwoCard(cards);
      setRemaining(drawTwoCard.remaining / 2);
      setCount((prevState) => {
        const player = cardRankingChecker(cards[0].code, cards[1].code);
        if (player) {
          return {
            ...count,
            player: prevState.player + 1,
          };
        } else {
          return {
            ...count,
            computer: prevState.computer + 1,
          };
        }
      });

      if (drawTwoCard.remaining === 0) {
        if (count.player > count.computer) {
          setWinner("Player Wins");
        } else if (count.player === count.computer) {
          setWinner("It's a Draw");
        } else {
          setWinner("Computer Wins");
        }
      }
    }
  };
  console.log(count);

  const QuickGame = () => {
    if (count.player !== 0 || count.computer !== 0) {
      alert("Game Already Started, Refresh Page To Play This Mode");
    } else {
      let quickWinPlayer = Math.round(Math.random() * 26) + 0;
      let quickWinComputer = 26 - quickWinPlayer;
      count.player = quickWinPlayer;
      count.computer = quickWinComputer;
      if (quickWinPlayer > quickWinComputer) {
        setWinner("Player Wins");
      } else if (quickWinComputer === quickWinPlayer) {
        setWinner("It's a Draw");
      } else {
        setWinner("Computer Wins");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2, duration: 1 }}
      className="newStart"
    >
      <div className={`center-screen ${showWinner ? "screen-blur" : ""}`}>
        <div className="player">
          <h1 className="title">Player - {count.player}</h1>
          <hr className="divider" />
          <div className="card-draw">
            {Array.isArray(TwoCard) && (
              <img src={TwoCard[0].image} alt="card1" />
            )}
          </div>
        </div>

        <div className="start">
          <h1>Rounds Left : {remaining}</h1>
          <div>
            <button onClick={DrawCard}> Play a Round </button>
            <button className="ml-2" onClick={QuickGame}>
              {" "}
              Quick Game{" "}
            </button>
          </div>
        </div>

        <div className="computer">
          <h1 className="title">Computer - {count.computer}</h1>
          <hr className="divider" />
          <div className="card-draw">
            {Array.isArray(TwoCard) && (
              <img src={TwoCard[1].image} alt="card2" />
            )}{" "}
          </div>
        </div>
      </div>
      <div className={`playerwins ${showWinner ? "" : "hidden"}`}>
        <h1 className="winnerDiv">Player Won {count.player} times</h1>
        <h1 className="winnerDiv">Computer Won {count.computer} times</h1>
        <h1 className="winnerDiv">Result :- {showWinner} !!!</h1>
      </div>
    </motion.div>
  );
}

export default NewGame;
