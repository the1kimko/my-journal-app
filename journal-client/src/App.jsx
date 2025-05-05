import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import JournalPage from "./pages/JournalPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/journal" element={<JournalPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;