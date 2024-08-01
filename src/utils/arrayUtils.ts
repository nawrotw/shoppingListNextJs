export const arraysEqualShallow = <T>(a: T[], b: T[]) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  return a.every((val, idx) => val === b[idx]);
};
