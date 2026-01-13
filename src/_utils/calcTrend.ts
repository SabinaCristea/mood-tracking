export function calcTrend(entries: { createdAt: number; value?: number }[]) {
  if (!entries || entries.length === 0) return "needMoreData";

  const now = new Date();
  now.setHours(23, 59, 59, 999); // End of today

  // 1. Create a map of the last 6 days (0 = today, 5 = 5 days ago)
  const last6Days = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toDateString();
  });

  // 2. Map entries to those specific dates
  const valuesByDay = last6Days.map((dateStr) => {
    const entry = entries.find(
      (e) => new Date(e.createdAt).toDateString() === dateStr
    );
    return entry?.value;
  });

  // valuesByDay[0] is Today, valuesByDay[1-5] are the previous days
  const today = valuesByDay[0];
  const previousDays = valuesByDay
    .slice(1)
    .filter((v): v is number => v !== undefined);

  // Requirement: Must have today AND at least some previous data
  // (Or strictly 5 previous days if you want perfect consecutiveness)
  if (today === undefined || previousDays.length < 5) {
    return "needMoreData";
  }

  const avgPrevious =
    previousDays.reduce((a, b) => a + b, 0) / previousDays.length;

  const threshold = 0.75;

  if (today >= avgPrevious + threshold) return "improving";
  if (today <= avgPrevious - threshold) return "declining";

  return "stable";
}
