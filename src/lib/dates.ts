const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Accepts 'YYYY-MM' or a bare 'YYYY' (education only has years).
function formatPoint(point: string): string {
  const [year, month] = point.split('-');
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

export function formatRange(start: string, end: string | null): string {
  return `${formatPoint(start)} – ${end ? formatPoint(end) : 'present'}`;
}
