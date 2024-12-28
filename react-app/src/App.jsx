import "./App.css";
import { useEffect, useState, useRef } from "react";
import CardContainer from "./components/CardContainer";

async function fetchUrls(setUrls) {
  let urls = {};
  let i = 0;
  let urlIndex = 0;
  // fetch images if not present
  while (true) {
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${i}.png`;
    const response = await fetch(url);
    if (response) {
      urls[urlIndex.toString()] = URL.createObjectURL(await response.blob());
      urlIndex += 1;
    }
    if (urlIndex == 16) {
      break;
    }
    i += 1;
  }
  setUrls(urls);
}

function App() {
  const [order, setOrder] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ]);
  const [visited, setVisited] = useState(new Set());
  const [highScore, setHighScore] = useState(0);
  const [urls, setUrls] = useState({});
  const cardClickMap = useRef({});
  useEffect(() => {
    fetchUrls(setUrls);
  }, []);

  useEffect(() => {
    function shuffle(order, setOrder) {
      let currentIndex = order.length;
      let newOrder = [...order];

      // While there remain elements to shuffle...
      while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [newOrder[currentIndex], newOrder[randomIndex]] = [
          newOrder[randomIndex],
          newOrder[currentIndex],
        ];
      }
      setOrder(newOrder);
    }

    const handleClick = (id) => {
      setVisited((prevVisited) => {
        let newVisited = new Set(prevVisited);
        console.log("clicked");
        if (!visited.has(id)) {
          console.log("not visited");
          newVisited.add(id);
        } else {
          console.log("visited");
          newVisited = new Set();
          setHighScore((highScore) => Math.max(highScore, prevVisited.size));
        }
        shuffle(order, setOrder);
        return newVisited;
      });
    };

    // add action listeners
    for (let id of order) {
      const card = document.getElementById(id.toString());
      if (card) {
        const handleCardClick = () => {
          handleClick(id);
        };
        card.addEventListener("click", handleCardClick);
        cardClickMap.current[id] = handleCardClick;
      }
    }

    return () => {
      for (let id of order) {
        const card = document.getElementById(id.toString());
        if (card) {
          card.removeEventListener("click", cardClickMap.current[id]);
        }
      }
    };
  }, [urls, visited]); // triggers only after images are loaded
  return (
    <body>
      <div className="header">
        <h1>Memory Game</h1>
        <div>
          <div>high score: {highScore} </div>
          <div>current score: {visited.size}</div>
        </div>
      </div>
      <CardContainer urls={urls} order={order}></CardContainer>
    </body>
  );
}

export default App;
