export const ORANGE_COLOR = "#f49f85";
export const BLUE_COLOR = "#62bcfa";
export const PURPLE_COLOR = "#ad1fea";
export type color =
  | typeof ORANGE_COLOR
  | typeof BLUE_COLOR
  | typeof PURPLE_COLOR;
export function Circle({ color }: { color: color }) {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="4" fill={color} />
    </svg>
  );
}
