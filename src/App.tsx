import "antd/dist/reset.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RequireAuth />}>
            <Route index element={<EditPage />} />
            <Route path="list" element={<ListPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
