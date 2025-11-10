import { describe, it, expect } from 'vitest';
import { parsePrice, formatPrice } from './price';

describe('price utils', () => {
  it('parses price strings correctly', () => {
    expect(parsePrice('$59.990 CLP')).toBe(59990);
    expect(parsePrice('$1.000 CLP')).toBe(1000);
    expect(parsePrice('invalid')).toBe(0);
  });

  it('formats numbers correctly', () => {
    expect(formatPrice(59990)).toBe('$59.990 CLP');
    expect(formatPrice(1000)).toBe('$1.000 CLP');
  });
});
