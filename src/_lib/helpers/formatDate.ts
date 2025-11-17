export default function formatDate(date: Date) {
  const d = new Date(date);

  const day = d.getDate();
  const suffix = getDaySuffix(day);

  const month = d.toLocaleString("en-US", { month: "long" });
  const weekday = d.toLocaleString("en-US", { weekday: "long" });
  const year = d.getFullYear();

  return `${weekday}, ${month} ${day}${suffix}, ${year}`;
}

function getDaySuffix(day: number) {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
