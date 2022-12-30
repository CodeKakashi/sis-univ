import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import RegistrationFormPreview from "./components/registrationFormPreview";
import ErrorPreview from "./components/errorPage";
import EducationalForm from "./components/eductionalForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPreview />,
  },
  {
    path: "/registerPreview",
    element: <RegistrationFormPreview />,
  },
  {
    path: "/educationalForm",
    element: <EducationalForm />,
  },
]);

export default router;
