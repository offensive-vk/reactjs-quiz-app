import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import FAQ from "./components/FAQ";
import Help from "./components/Help";
import About from "./components/About";
import Result from "./components/Result";
import ErrorFallback from "./components/Error";
import CustomQuiz from "./components/CustomQuiz";
import BaseLayout from "./components/BaseLayout";
import { DataProvider } from "./context/DataContext";
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
              <Route path="/faq" element={<FAQ />} />
              <Route path="/help" element={<Help />} />
              <Route path="/about" element={<About />} />
              <Route path="/result" element={<Result />} />
              <Route path="/quiz/:type" element={<Quiz />} />
              <Route path="/custom/:title" element={<Quiz />} />
              <Route path="/custom-quiz" element={<CustomQuiz />} />
              <Route path="/result/:id" element={<Result />} />
              <Route path="*" element={<ErrorFallback />} />
            </Routes>
          </BaseLayout>
        </ErrorBoundary>
      </Router>
    </DataProvider>
  );
}

export default App;