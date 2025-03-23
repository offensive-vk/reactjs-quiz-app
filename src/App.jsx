import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { DataProvider } from "./context/dataContext";
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <DataProvider>
        {/* Welcome Page */}
        <Start />

        {/* Quiz Page */}
        <Quiz />

        {/* Result Page */}
        <Result />
      </DataProvider>
    </ErrorBoundary>
  );
}

export default App;