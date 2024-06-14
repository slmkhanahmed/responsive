import initial_data from "./public/data.json";
import { FeedbackSidebar } from "./components/FeedbackSidebar";
import { NoFeedbackPage } from "./components/NoFeedbackPage";
import { ProductRequestList } from "./components/ProductRequestList";
import { SuggestionsTitleBar } from "./components/SuggestionsTitleBar";
import SortOrderProvider from "./contexts/SortProvider";
import CategoriesProvider from "./contexts/categoriesProvider";
import {useLocalStorage} from './lib/useLocalStorage';
import { tw } from "./lib/tailwindest";


const layout = tw.style({
  display: "flex",
  flexDirection: "flex-col",
  marginBottom: "mb-[55px]",
  "@desktop": {
    display: "desktop:grid",
    gridTemplateColumns: "desktop:grid-cols-[auto,1fr]",
    gridTemplateRows: "desktop:grid-rows-[92px,auto]",
    marginTop: "desktop:mt-[94px]",
    marginBottom: "desktop:mb-[129px]",
  },
  "@tablet": {
    width: "tablet:w-max",
    marginX: "tablet:mx-auto",
    marginBottom: "tablet:mb-[113px]",
  },
});

export const Main = () => {
  const {data, setData} = useLocalStorage(initial_data);

  return (<SortOrderProvider>
    <CategoriesProvider>
      <div className={layout.class}>
        <FeedbackSidebar />
        <SuggestionsTitleBar />
        <div className="mt-[16px] tablet:mt-0">
          {data?.productRequests.length > 0 ? (
            <ProductRequestList />
          ) : (
            <NoFeedbackPage />
          )}
        </div>
      </div>
    </CategoriesProvider>
  </SortOrderProvider>)
}