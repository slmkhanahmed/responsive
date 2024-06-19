import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import EditFeedback from "./edit-feedback/[feedback-id]/page";
import { Main } from "./Main";
import NewFeedback from "./new-feedback/page";
import ProductRequestDetailLayout from "./product-request/[product-request-id]/layout";
import ProductRequestNotFound from "./product-request/[product-request-id]/not-found";
import ProductRequestDetail from "./product-request/[product-request-id]/page";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Switch>
          <Route path="/">
            <Main />
          </Route>
          <Route path="/new-feedback" children={<NewFeedback />} />
          <Route path="/edit-feedback/:feedback-id">
            <EditFeedback />
          </Route>
          <Route path={"/product-request/not-found"} exact>
            <ProductRequestDetailLayout>
              <ProductRequestNotFound />
            </ProductRequestDetailLayout>
          </Route>
          <Route path="/product-request/:product-request-id">
            <ProductRequestDetailLayout>
              <ProductRequestDetail />
            </ProductRequestDetailLayout>
          </Route>
          <Route exact path="/404">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
