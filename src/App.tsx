import { Route, useParams } from "react-router-dom";
import { Main } from "./Main";
import ProductRequestDetail from './product-request/[product-request-id]/page';

const ProductRequestDetail = () => {
  const { 'product-request-id': productRequestId } = useParams<{'product-request-id': string}>();
  
  return  ;
};

function App() {

  return (
    <Route> 
      <main>
        <Main />
      </main>
    </Route>
 
  );
}

export default App;
