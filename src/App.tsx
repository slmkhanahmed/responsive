import { Toaster } from "react-hot-toast";
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import EditFeedback from "./[feedback-id]/page";
import PageNotFound from "./components/PageNotFound";
import { Main } from './Main';
import NewFeedback from './new-feedback/page';
import ProductRequestDetail from './product-request/[product-request-id]/page';


function App() {

  return (
    <>
      <Toaster />
      <Router>
        <div>
          <main>
            <Main />
          </main>
          <Switch>
            <Route path="/"> <App /></Route>
            <Route path="/new-feedback" children={<NewFeedback />} />
            <Route path="/edit-feedback/:feedback-id"><EditFeedback /></Route>
            <Route path="/product-request/:product-request-id"><ProductRequestDetail /></Route>
            <Route exact path="/404"> <PageNotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </>

  );
}

export default App;
