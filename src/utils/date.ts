export const isDateFromThisWeek = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const ONE_WEEK = 1000 * 60 * 60 * 24 * 14;
  return Math.abs(date.valueOf() - today.valueOf()) < ONE_WEEK;
};
