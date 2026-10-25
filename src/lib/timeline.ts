import type { Span } from '../data/types';

export interface Axis {
  start: string;
  end: string;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function monthIndex(ym: string): number {
  const [year, month] = ym.split('-').map(Number);
  return year * 12 + (month - 1);
}

export function toYearMonth(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

export function axisFor(spans: Span[], now: string): Axis {
  const start = spans.reduce((min, s) => (s.start < min ? s.start : min), spans[0].start);
  return { start, end: now };
}

// Months are inclusive on both ends, so a span from May to May is one month wide.
function axisMonths(axis: Axis): number {
  return monthIndex(axis.end) - monthIndex(axis.start) + 1;
}

export function spanBox(span: Span, axis: Axis, now: string): { offset: number; size: number } {
  const total = axisMonths(axis);
  const from = monthIndex(span.start) - monthIndex(axis.start);
  const months = monthIndex(span.end ?? now) - monthIndex(span.start) + 1;
  return { offset: (from / total) * 100, size: (months / total) * 100 };
}

export function yearTicks(axis: Axis): { year: number; offset: number }[] {
  const total = axisMonths(axis);
  const first = monthIndex(axis.start);
  const ticks = [];
  for (let year = Math.ceil(first / 12); year * 12 <= monthIndex(axis.end); year++) {
    ticks.push({ year, offset: ((year * 12 - first) / total) * 100 });
  }
  return ticks;
}

export function orderSpans(spans: Span[]): { span: Span; depth: number }[] {
  const rows: { span: Span; depth: number }[] = [];
  const visit = (parentId: string | null, depth: number) => {
    // Array.prototype.sort is stable, so same-start siblings keep their data order.
    const children = spans.filter((s) => s.parentId === parentId).sort((a, b) => a.start.localeCompare(b.start));
    for (const span of children) {
      rows.push({ span, depth });
      visit(span.id, depth + 1);
    }
  };
  visit(null, 0);
  return rows;
}

function formatMonth(ym: string, yearsOnly: boolean): string {
  const [year, month] = ym.split('-').map(Number);
  return yearsOnly ? String(year) : `${MONTHS[month - 1]} ${year}`;
}

export function formatRange(span: Span): string {
  const yearsOnly = span.yearsOnly ?? false;
  const end = span.end ? formatMonth(span.end, yearsOnly) : 'present';
  return `${formatMonth(span.start, yearsOnly)} – ${end}`;
}
