export const getTodayRange = () => {
  const now = new Date();
  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );

  const end = new Date(
    Date.UTC(now.getFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
  );

  return {
    start: start.getTime(),
    end: end.getTime(),
  };
};
