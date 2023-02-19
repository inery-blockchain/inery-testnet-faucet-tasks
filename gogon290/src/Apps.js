import { BrowserRouter } from "react-router-dom";
import AppsRoute from "./routes/AppsRoute";

function Apps() {
  return (
    <BrowserRouter>
      <AppsRoute />
    </BrowserRouter>
  );
}

export default Apps;
