import { Route, Routes } from "react-router-dom";
import "./app.scss";
import Header from "./components/header/header.component";
import NewGame from "./components/start-game/new-game.component";
import { motion } from "framer-motion";

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2, duration: 1 }}
      className="App"
    >
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-image">
              <div className="bg-background">
                <p>Play The Game Of Cards</p>
              </div>
            </div>
          }
        />
        <Route path="start" element={<NewGame />} />
      </Routes>
    </motion.div>
  );
}

export default App;

// One button simulation
// dont use API for cards, use own logic
// can use for images
// number of rounds
// give up btn
