import { Route, Routes } from "react-router-dom";
import "./app.scss";
import Header from "./components/header/header.component";
import NewGame from "./components/start-game/new-game.component";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<div className="bg-image">Play The Game Of Cards</div>}
        />
        <Route path="start" element={<NewGame />} />
        <Route path="reset" element={<div className="bg-image">reset</div>} />
      </Routes>
    </div>
  );
}

export default App;
