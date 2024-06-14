import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import { tw } from "../../lib/tailwindest";
import initial_data from "../../public/data.json";
import { useLocalStorage } from '../../lib/useLocalStorage';
const navbar = tw.style({
  display: "flex",
  justifyContent: "justify-between",
  marginX: "mx-[24px]",
  marginBottom: "mb-[24px]",
  "@tablet": {
    marginX: "tablet:mx-[40px]",
  },
  "@desktop": {
    maxWidth: "desktop:max-w-[730px]",
  },
});
export function Navbar({ productRequestId }: { productRequestId: string }) {
  const { data, setData } = useLocalStorage(initial_data);

  const productRequest = data.productRequests.find(
    (pr) => pr.id.toString() === productRequestId,
  );
  return (
    <div className={navbar.class}>
      <BackButton color="gray">Go Back</BackButton>
      {productRequest && (
        <a href={`/edit-feedback/${productRequestId}`}>
          <Button color="blue">Edit Feedback</Button>
        </a>
      )}
    </div>
  );
}
