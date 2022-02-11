import "./App.css";
import Config from "./components/Config";
import Canvas from "./components/Canvas";
import "./fabric-customize.js";

function App() {
  return (
    <div className="App">
      <div id="App-Body">
        <Config />
        <Canvas />
      </div>
    </div>
  );
}

export default App;
