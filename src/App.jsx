import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Allroutes } from "./Components/Allroutes";
// import "./index.css";

function App() {
  return (
    <div
      className="flex flex-col min-h-screen bg-gradient-animation text-white"
      style={{
        background:
          "linear-gradient(to bottom right, #14b8a6, #fbbf24, #ef4444)",
      }}
    >
      <Header />

      <div className="flex-grow p-8">
        <Allroutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
