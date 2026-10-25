import { describe, expect, it } from 'vitest';
import { formatRange } from '../lib/dates';
import { experience } from './experience';
import { education } from './education';
import { pipeline, aiCards } from './ai';
import * as site from './site';
import { stack } from './stack';

describe('content', () => {
  it('formats month ranges, open ends and year-only ranges', () => {
    expect(formatRange('2022-01', null)).toBe('Jan 2022 – present');
    expect(formatRange('2018-05', '2019-01')).toBe('May 2018 – Jan 2019');
    expect(formatRange('2019', '2021')).toBe('2019 – 2021');
  });

  it('lists experience newest first', () => {
    expect(experience.map((r) => r.id)).toEqual(['moneysmart', 'meggitt', 'cads']);
  });

  it('keeps education out of experience', () => {
    expect(education.map((e) => e.school)).toEqual(['ESAIP, Angers, France', 'Anna University, Chennai']);
    expect(JSON.stringify(experience)).not.toMatch(/Anna University|ESAIP/);
  });

  it('never names partners or the phone number anywhere', () => {
    const all = JSON.stringify({ experience, education, pipeline, aiCards, site, stack });
    expect(all).not.toMatch(/Starr|MSIG|TIQ|Standard Chartered|SCB|Talon|Shopify|Freshsales|8870637220/);
  });
});
