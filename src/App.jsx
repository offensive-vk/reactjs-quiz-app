import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import BaseLayout from "./components/BaseLayout";
import ErrorFallback from "./components/Error";
import FAQ from "./components/FAQ";
import Help from "./components/Help";
import { DataProvider } from "./context/dataContext";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <DataProvider>
      <Router>
        <ErrorBoundary>
          <BaseLayout>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/quiz/:type" element={<Quiz />} />
              <Route path="/quiz/default" element={<Quiz />} />
              <Route path="/result/:id" element={<Result />} />
              <Route path="/result" element={<Result />} />
              <Route path="/faq" element={<FAQ /> } />
              <Route path="/help" element={<Help /> } />
              <Route path="*" element={<ErrorFallback />} />
            </Routes>
          </BaseLayout>
        </ErrorBoundary>
      </Router>
    </DataProvider>
  );
}

export default App;