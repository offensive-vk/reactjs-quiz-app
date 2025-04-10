import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import FAQ from "./components/FAQ";
import Help from "./components/Help";
import About from "./components/About";
import Result from "./components/Result";
import ErrorFallback from "./components/Error";
import BaseLayout from "./components/BaseLayout";
import { DataProvider } from "./context/dataContext";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <DataProvider>
      <Router>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <BaseLayout>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/faq" element={<FAQ /> } />
              <Route path="/help" element={<Help /> } />
              <Route path="/about" element={<About />} />
              <Route path="/result" element={<Result />} />
              <Route path="*" element={<ErrorFallback />} />
              <Route path="/quiz/:type" element={<Quiz />} />
              <Route path="/quiz/default" element={<Quiz />} />
              <Route path="/result/:id" element={<Result />} />
            </Routes>
          </BaseLayout>
        </ErrorBoundary>
      </Router>
    </DataProvider>
  );
}

export default App;