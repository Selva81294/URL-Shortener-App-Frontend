import "./App.css";
import Login from "./Components/LoginPg/LoginPg";
import ForgotPassword from "./Components/LoginPg/reset";
import URLShortener from "./Components/URLShortener";
import {  Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/reset" component={ForgotPassword} />
          <Route path="/mainpg" component={URLShortener} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
