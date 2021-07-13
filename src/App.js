import "./App.css";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  return (
    <>
      <Header />
      <main>
        <Meals></Meals>
      </main>
    </>
  );
}

export default App;
