import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ContextWrapper from "./context/ContextWrapper";

try {
    ReactDOM.render(<React.StrictMode>
        <ContextWrapper>
            <App/>
        </ContextWrapper>
    </React.StrictMode>, document.getElementById("root"));
} catch (e) {
    console.log(e)
}

reportWebVitals();
