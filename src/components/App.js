import { BrowserRouter, Route } from "react-router-dom";
import Login  from "./login";
import SignUp  from  "./sign_up"
import Me from "./me"

 const App = () => {
  
  return (
    <div>
        <BrowserRouter>
        <div id="container">
            <Route path ="/login" exact component={Login} />
            <Route path ={["/", "/signup"]} exact component={SignUp} />
            <Route path ="/me" exact component={Me} />
       </div>
        </ BrowserRouter >
    </div>
  );
}

 export default App;
