import { create } from "@kodingdotninja/use-tailwind-breakpoint";


const screens = {
    tablet: '768px',
    mobile: '375px',
    desktop: '1440px'
};
export const { useBreakpoint } = create(screens);
