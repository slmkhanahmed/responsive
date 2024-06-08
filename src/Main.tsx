
import initial_data from "./public/data.json";
import { FeedbackSidebar } from "./components/FeedbackSidebar";
import { NoFeedbackPage } from "./components/NoFeedbackPage";
import { ProductRequestList } from "./components/ProductRequestList";
import { SuggestionsTitleBar } from "./components/SuggestionsTitleBar";
import SortOrderProvider from "./contexts/SortProvider";
import CategoriesProvider from "./contexts/categoriesProvider";
import useLocalStorageState from "use-local-storage-state";
import { tw } from "./lib/tailwindest";
import { useEffect, useState } from "react";
import { setEmitFlags } from "typescript";


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
    const [data, setData]=  useState(initial_data);
    useEffect(() => {
        const data = localStorage.getItem('data');
        if (data) {
            setData(JSON.parse(data));
        }
    }, []);
    return (   <SortOrderProvider>
        <CategoriesProvider>
          <div className={layout.class}>
            <FeedbackSidebar />
            <SuggestionsTitleBar />
            <div className="mt-[16px] tablet:mt-0">
              {data.productRequests.length > 0 ? (
                <ProductRequestList />
              ) : (
                <NoFeedbackPage />
              )}
            </div>
            <button onClick={
                () => {
                    setData({...data, currentUser: {...data.currentUser, name: 'Adnan'}});
                    localStorage.setItem('data', JSON.stringify(data));
                }
            }>
            Change Data
            </button>
          </div>
        </CategoriesProvider>
      </SortOrderProvider>)
}