import { useNavigate } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import BaseLayout from './BaseLayout';
import NavLinks from "./Navlinks";

const ErrorMessage = () => (
    <div className="error-message">
        <h2 className="hero-text">Sorry, Something went wrong.</h2>
        <h3 className="hero-subheading">What would you like to do next?</h3>
    </div>
);

function ErrorFallback() {
    const navigate = useNavigate();
    const { resetErrorBoundary } = useErrorBoundary();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <BaseLayout>
            <div role="alert" className="error-container text-center">
                <NavLinks />    
                <ErrorMessage /><br />
                <div className="d-flex justify-content-around">
                    <button
                        className="btn btn-primary fw-semibold px-4 py-2 me-2"
                        onClick={resetErrorBoundary}
                    >
                        Try again
                    </button>
                    <button
                        onClick={handleGoHome}
                        className="btn btn-secondary fw-semibold px-4 py-2 me-2"
                    >
                        Go Home <i className="bi bi-house-door ms-2"></i>
                    </button>
                    <button
                        onClick={() => navigate('/help')}
                        className="btn btn-info fw-semibold px-4 py-2 me-2"
                    >
                        Get Help
                    </button>
                    <button
                        onClick={() => navigate('/faq')}
                        className="btn btn-warning fw-semibold px-4 py-2 me-2"
                    >
                        FAQ
                    </button>
                </div>
            </div>
        </BaseLayout>
    );
}

export default ErrorFallback;