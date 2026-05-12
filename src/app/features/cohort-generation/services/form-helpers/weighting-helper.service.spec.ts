import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { WeightingHelperService } from './weighting-helper.service';

describe('WeightingHelperService - roundToDecimalPlaces', () => {
  let service: WeightingHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormBuilder, WeightingHelperService],
    });
    service = TestBed.inject(WeightingHelperService);
  });

  // Helper to access the private method
  const round = (num: number, decimalPlaces: number = 2): number =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (service as any)['roundToDecimalPlaces'](num, decimalPlaces);

  it('should round down when the next digit is less than 5', () => {
    expect(round(1.2345, 2)).toBe(1.23);
    expect(round(1.2311, 2)).toBe(1.23);
    expect(round(0.0049, 2)).toBe(0);
  });

  it('should round up when the next digit is 5 or greater', () => {
    expect(round(1.2355, 2)).toBe(1.24);
    expect(round(2.555, 2)).toBe(2.56);
    expect(round(99.995, 2)).toBe(100);
  });

  it('should use the default of 2 decimal places when not specified', () => {
    expect(round(3.14159)).toBe(3.14);
    expect(round(2.71828)).toBe(2.72);
  });

  it('should handle zero decimal places correctly', () => {
    expect(round(4.6, 0)).toBe(5);
    expect(round(4.4, 0)).toBe(4);
  });

  it('should handle negative decimal places (round to tens, hundreds, etc.)', () => {
    expect(round(1234, -1)).toBe(1230);
    expect(round(5678, -2)).toBe(5700);
    expect(round(99, -1)).toBe(100);
  });
});

describe('WeightingHelperService - getAdjustedWeights', () => {
  let service: WeightingHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormBuilder, WeightingHelperService],
    });
    service = TestBed.inject(WeightingHelperService);
  });

  const createItem = (value: number, lock: boolean = false) => ({ value, lock });
  it('should return unchanged inputs when indexToChange is out of bounds', () => {
    const oldInputs = [createItem(40), createItem(60)];
    const result = (service as any)['getAdjustedWeights'](oldInputs, -1, 50);
    expect(result).toEqual(oldInputs);
  });

  it('should handle newValue 0 with locked fields correctly', () => {
    const oldInputs = [createItem(30, true), createItem(70)];
    const result = (service as any)['getAdjustedWeights'](oldInputs, 1, 0);
    expect(result[0].value).toBe(30);
    expect(result[1].value).toBe(0);
  });

  it('should set all other fields to zero when newValue is 100 and all fields are locked', () => {
    const oldInputs = [createItem(30, true), createItem(70, true)];
    const result = (service as any)['getAdjustedWeights'](oldInputs, 0, 100);
    expect(result[0].value).toBe(100);
    expect(result[1].value).toBe(0);
    expect(result[1].lock).toBe(false);
  });

  it('should distribute weights when newValue is 100 with unlocked fields', () => {
    const oldInputs = [
      createItem(20, true),
      createItem(30, false),
      createItem(50, false),
    ];
    const result = (service as any)['getAdjustedWeights'](oldInputs, 0, 100);
    // target should be 100, others unlocked become 0
    expect(result[0].value).toBe(100);
    expect(result[1].value).toBe(0);
    expect(result[2].value).toBe(0);
    // locked field remains locked value
    expect(result[0].lock).toBe(true);
    expect(result[1].lock).toBe(false);
    expect(result[2].lock).toBe(false);
  });

  it('should adjust weights proportionally when no fields are locked', () => {
    const oldInputs = [createItem(30), createItem(70)];
    const result = (service as any)['getAdjustedWeights'](oldInputs, 0, 20);
    expect(result[0].value).toBeCloseTo(20);
    expect(result[1].value).toBeCloseTo(80);
  });

  it('should respect locked fields and distribute remaining weight', () => {
    const oldInputs = [createItem(30, true), createItem(70)];
    const result = (service as any)['getAdjustedWeights'](oldInputs, 1, 50);
    expect(result[0].value).toBe(30);
    expect(result[1].value).toBe(50);
  });

  it('should handle sumLocked > 100 by returning unchanged inputs with new value applied to target', () => {
    const oldInputs = [createItem(60, true), createItem(50, true)];
    const result = (service as any)['getAdjustedWeights'](oldInputs, 0, 10);
    expect(result[0].value).toBe(10);
    expect(result[1].value).toBe(50);
  });

  it('should distribute remaining weight equally when all other adjustable values are zero', () => {
    const oldInputs = [createItem(0), createItem(0)];
    const result = (service as any)['getAdjustedWeights'](oldInputs, 0, 20);
    expect(result[0].value).toBeCloseTo(20);
    expect(result[1].value).toBeCloseTo(80);
  });

  it('should ensure total weight sums to 100 after rounding adjustments', () => {
    const oldInputs = [
      createItem(33.33),
      createItem(33.33),
      createItem(33.34),
    ];
    const result = (service as any)['getAdjustedWeights'](oldInputs, 0, 30);
    const total = result.reduce((sum: number, r: { value: number }) => sum + r.value, 0);
    expect(total).toBeCloseTo(100);
  });

  it('should set other unlocked fields to zero when locked sum plus new value equals 100', () => {
    const oldInputs = [createItem(30, true), createItem(70)];
    const result = (service as any)['getAdjustedWeights'](oldInputs, 1, 70);
    expect(result[0].value).toBe(30);
    expect(result[1].value).toBe(70);
  });
});
