/**
 * Represents a single item in a weighting distribution with its value and lock state.
 * Used by weighting helper services to manage proportional weight redistribution
 * when users adjust weight values in weighting controls.
 *
 * The lock mechanism allows users to "lock" certain weights while others are
 * automatically adjusted to maintain a total of 100%.
 *
 * @example
 * // Unlocked item that can be adjusted during redistribution
 * { lock: false, value: 30 }
 *
 * @example
 * // Locked item that remains fixed during redistribution
 * { lock: true, value: 50 }
 */
type WeightingInputItem = {
  /**
   * Whether this weight value is locked (fixed) during redistribution.
   * When true, this value will not be changed when other weights are adjusted.
   * When false, this value may be proportionally adjusted to maintain 100% total.
   */
  lock: boolean;

  /**
   * The weight/percentage value (typically 0-100).
   * Represents the proportion of this category in the distribution.
   */
  value: number;
};
