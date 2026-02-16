export function calcTrend(entries: { createdAt: number; value?: number }[]) {
  if (!entries || entries.length === 0) return "needMoreData";

  const last5Days = Array.from({ length: 5 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0]; // Returns "2026-02-16"
  });

  const valuesByDay = last5Days.map((dateStr) => {
    const entry = entries.find((e) => {
      const entryDate = new Date(e.createdAt).toISOString().split("T")[0];
      return entryDate === dateStr;
    });
    return entry?.value;
  });

  const today = valuesByDay[0];
  // Filter out undefined to see how many days we actually have
  const previousDays = valuesByDay
    .slice(1)
    .filter((v): v is number => v !== undefined);

  if (today === undefined || previousDays.length < 4) {
    return "needMoreData";
  }

  const avgPrevious =
    previousDays.reduce((a, b) => a + b, 0) / previousDays.length;

  const threshold = 0.75;

  if (today >= avgPrevious + threshold) return "improving";
  if (today <= avgPrevious - threshold) return "declining";

  return "stable";
}
