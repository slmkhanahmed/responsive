import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import EditFeedback from "./edit-feedback/[feedback-id]/page";
import { Main } from "./Main";
import NewFeedback from "./new-feedback/page";
import Roadmap from "./roadmap/page";
import ProductRequestDetailLayout from "./product-request/[product-request-id]/layout";
import ProductRequestNotFound from "./product-request/[product-request-id]/not-found";
import ProductRequestDetail from "./product-request/[product-request-id]/page";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/new-feedback" component={NewFeedback} />
          <Route exact path="/roadmap" component={Roadmap} />
          <Route exact path="/edit-feedback/:feedbackId">
            <EditFeedback />
          </Route>
          <Route path={"/product-request/not-found"} exact>
            <ProductRequestDetailLayout>
              <ProductRequestNotFound />
            </ProductRequestDetailLayout>
          </Route>
          <Route exact path="/product-request/:productRequestId">
            <ProductRequestDetailLayout>
              <ProductRequestDetail />
            </ProductRequestDetailLayout>
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
