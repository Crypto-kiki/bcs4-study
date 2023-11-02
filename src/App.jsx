import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Members from "./pages/members";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/members" element={<Members />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
