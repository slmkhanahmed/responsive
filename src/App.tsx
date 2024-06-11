import EditFeedback from "./[feedback-id]/page";
import { Main } from './Main';
import NewFeedback from './new-feedback/page';
import { ProductRequest } from './components/ProductRequest';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useParams
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProductRequestDetail from './product-request/[product-request-id]/page';
import PageNotFound from "./components/PageNotFound";


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
