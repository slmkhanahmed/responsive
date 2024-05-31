export function LeftArrow({ stroke }: { stroke?: string }) {
  return (
    <svg
      width="5"
      height="10"
      viewBox="0 0 5 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 9L0 5L4 1" stroke={stroke} strokeWidth="2" />
    </svg>
  );
}
