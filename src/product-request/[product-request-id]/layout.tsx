import { tw } from "../../lib/tailwindest";
import { ReactNode } from "react";
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

export default function Layout({
  children,
  params: { "product-request-id": productRequestId },
}: {
  children: ReactNode;
  params: { "product-request-id": string };
}) {
  return (
    <div className={formPage.class}>
      <Navbar productRequestId={productRequestId} />
      {children}
    </div>
  );
}
