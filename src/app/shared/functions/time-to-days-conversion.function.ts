export function toDays(units: 'years' | 'months' | 'weeks' | 'days', value: number): number {
  const daysPerUnit = {
    days: 1,
    years: 365,
    months: 30.4,
    weeks: 7
  };

  if (!daysPerUnit[units]) {
    throw new Error(`Invalid unit: ${units}`);
  }

  const days = daysPerUnit[units] * value;

  // Return the result as a whole number
  return Math.floor(days);
}
