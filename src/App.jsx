import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Allroutes } from "./Components/Allroutes";

function App() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-500 to-gray-700">
      <Header />

      <div className="flex-grow">
        <Allroutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
