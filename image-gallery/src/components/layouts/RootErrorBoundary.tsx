import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Button } from "../common/Button";

export const RootErrorBoundary = () => {
  const error = useRouteError();
  const isErrorResponse = isRouteErrorResponse(error);
  const errorCode = isErrorResponse ? error.status : 404;
  const errorMessage = isErrorResponse
    ? error.statusText
    : "Something went wrong!";
  const errorData = isErrorResponse ? error.data : null;

  return (
    <main className="w-full min-h-screen bg-gray-50 font-body">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-red-100 rounded-xl p-6 text-center">
          <h1 className="text-6xl font-bold text-red-700">{errorCode}</h1>
          <p className="text-lg text-red-700">{errorMessage}</p>
          {errorData && (
            <pre className="text-sm text-red-700">
              {JSON.stringify(errorData, null, 4)}
            </pre>
          )}
          <div className="mt-2">
            <Button variant="error" onClick={() => window.location.reload()}>
              Please reload the application
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};
