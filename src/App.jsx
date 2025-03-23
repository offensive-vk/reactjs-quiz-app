import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { DataProvider } from "./context/dataContext";
import BaseLayout from "./components/BaseLayout";

function App() {
  return (
    <DataProvider>
      <Router>
        <BaseLayout>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/quiz/:type" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BaseLayout>
      </Router>
    </DataProvider>
  );
}

export default App;