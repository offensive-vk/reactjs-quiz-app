import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { DataProvider } from "./context/dataContext";
import BaseLayout from "./components/BaseLayout";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <DataProvider>
      <Router>
        <ErrorBoundary>
          <BaseLayout>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/quiz/:type" element={<Quiz />} />
              <Route path="/result/:id" element={<Result />} />
              <Route path="/result" element={<Result />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BaseLayout>
        </ErrorBoundary>
      </Router>
    </DataProvider>
  );
}

export default App;