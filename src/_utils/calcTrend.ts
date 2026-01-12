export function calcTrend(values?: (number | undefined)[]) {
  if (!values) return "needMoreData";

  const cleaned = values.filter((v): v is number => v !== undefined);

  if (cleaned.length < 6) return "needMoreData";

  const previous = cleaned.slice(0, 5);
  const today = cleaned[5];

  const avgPrevious = previous.reduce((sum, v) => sum + v, 0) / previous.length;

  const threshold = 0.75;

  if (today >= avgPrevious + threshold) return "improving";
  if (today <= avgPrevious - threshold) return "declining";
  return "stable";
}
