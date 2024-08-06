import { ConfigProvider } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import themeAntd from "@/styles/themeAntd";
import LoginERP from "@/modules/erp/login";
import ERP from "@/modules/erp";
import "@/styles/App.css";

const App = () => {
  return (
    <ConfigProvider theme={{ token: themeAntd }}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginERP />} />
          <Route
            exact
            path="/get-print-and-press-backoffice"
            element={<ERP />}
          />

          <Route path="/:id" element={<div>Page not found!</div>}></Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
