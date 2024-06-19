import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { tw } from "../../lib/tailwindest";
import { Navbar } from "./Navbar";

const formPage = tw.style({
  marginTop: "mt-[35px]",
  marginBottom: "mb-[77px]",
  "@desktop": {
    marginX: "desktop:mx-auto",
    maxWidth: "desktop:max-w-[730px]",
  },
  "@tablet": {
    marginBottom: "tablet:mb-[120px]",
  },
});

export default function Layout({ children }: { children: ReactNode }) {
  const { "product-request-id": productRequestId } = useParams<{
    "product-request-id": string;
  }>();
  return (
    <div className={formPage.class}>
      <Navbar productRequestId={productRequestId} />
      {children}
    </div>
  );
}
