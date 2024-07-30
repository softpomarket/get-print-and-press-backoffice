import "./styles/App.css";
import "./styles/App.less";

import { ConfigProvider } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import themeAntd from "./styles/themeAntd";
import LoginERP from "./modules/erp/login";
import ERP from "./modules/erp";

const App = ({ authorized, firebase, user }) => (
  <ConfigProvider theme={{ token: themeAntd }}>
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <LoginERP authorized={authorized} firebase={firebase} user={user} />
          }
        />
        <Route
          exact
          path="/get-print-and-press-backoffice"
          element={
            <ERP authorized={authorized} firebase={firebase} user={user} />
          }
        />

        {/* <Route path="/:id">Page not found!</Route> */}
        <Route exact path="/:id" element={<div>Page not found!</div>}></Route>
      </Routes>
    </Router>
  </ConfigProvider>
);

export default App;
