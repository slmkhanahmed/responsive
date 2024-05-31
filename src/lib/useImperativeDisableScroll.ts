import { useEffect } from "react";

function useImperativeDisableScroll({
  element,
  disabled,
}: {
  element: any;
  disabled: boolean;
}) {
  useEffect(() => {
    if (!element) {
      return;
    }

    element.style.overflowY = disabled ? "hidden" : "scroll";

    return () => {
      element.style.overflowY = "scroll";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);
}

export { useImperativeDisableScroll };
