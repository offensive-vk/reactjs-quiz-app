import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { DataProvider } from "./context/dataContext";
import ErrorFallback from "./components/Error";
import BaseLayout from "./components/BaseLayout";

const Start = lazy(() => import("./components/Start"));
const Quiz = lazy(() => import("./components/Quiz"));
const FAQ = lazy(() => import("./components/FAQ"));
const Help = lazy(() => import("./components/Help"));
const About = lazy(() => import("./components/About"));
const Result = lazy(() => import("./components/Result"));
const CustomQuiz = lazy(() => import("./components/CustomQuiz"));
const Loading = lazy(() => import("./components/Loading"));
const Contributing = lazy(() => import("./components/Contributing"));

function App() {
  return (
    <DataProvider>
      <Router>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <BaseLayout>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/help" element={<Help />} />
                <Route path="/about" element={<About />} />
                <Route path="/result" element={<Result />} />
                <Route path="*" element={<ErrorFallback />} />
                <Route path="/loader" element={<Loading />} />
                <Route path="/quiz/:type" element={<Quiz />} />
                <Route path="/result/:id" element={<Result />} />
                <Route path="/custom/:title" element={<Quiz />} />
                <Route path="/custom-quiz" element={<CustomQuiz />} />
                <Route path="/contribute" element={<Contributing />} />
              </Routes>
            </Suspense>
          </BaseLayout>
        </ErrorBoundary>
      </Router>
    </DataProvider>
  );
}

export default App;