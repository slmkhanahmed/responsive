export const capitalize = (s: string) =>
  s
    .split("-")
    .map((st) => `${st[0].toUpperCase()}${st.slice(1, st.length)}`)
    .join("-");
