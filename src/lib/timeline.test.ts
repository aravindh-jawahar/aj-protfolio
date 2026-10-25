import { describe, expect, it } from 'vitest';
import { career } from '../data/career';
import { axisFor, formatRange, monthIndex, orderSpans, spanBox, yearTicks } from './timeline';

const now = '2026-10';
const byId = (id: string) => career.find((s) => s.id === id)!;
const axis = axisFor(career, now);

describe('timeline', () => {
  it('converts a year-month to a month index', () => {
    expect(monthIndex('2018-05')).toBe(2018 * 12 + 4);
  });

  it('spans the axis from the earliest start to now', () => {
    expect(axis).toEqual({ start: '2014-09', end: '2026-10' });
  });

  it('open span reaches axis end', () => {
    const live = spanBox(byId('moneysmart'), axis, now);
    expect(live.offset + live.size).toBeCloseTo(100);
  });

  it('treats end months as inclusive', () => {
    expect(spanBox(byId('cads'), axis, now).size).toBeCloseTo((9 / 146) * 100);
  });

  it('places a tick at every January inside the axis', () => {
    const ticks = yearTicks(axis);
    expect(ticks[0]).toEqual({ year: 2015, offset: (4 / 146) * 100 });
    expect(ticks.at(-1)!.year).toBe(2026);
  });

  it('orders spans depth-first by start date', () => {
    const rows = orderSpans(career);
    expect(rows.map((r) => r.span.id)).toEqual([
      'career', 'be', 'cads', 'esaip', 'meggitt', 'meggitt-web', 'meggitt-desktop', 'moneysmart',
    ]);
    expect(rows.find((r) => r.span.id === 'meggitt-web')!.depth).toBe(2);
  });

  it('formats ranges, with years only for education', () => {
    expect(formatRange(byId('moneysmart'))).toBe('Jan 2022 – present');
    expect(formatRange(byId('cads'))).toBe('May 2018 – Jan 2019');
    expect(formatRange(byId('be'))).toBe('2014 – 2018');
  });

  it('never names partners or the phone number', () => {
    expect(JSON.stringify(career)).not.toMatch(/Starr|MSIG|TIQ|Standard Chartered|SCB|Talon|Shopify|Freshsales|8870637220/);
  });
});
