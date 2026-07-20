import {Injectable, signal} from '@angular/core';

/**
 * Service for managing stepper navigation lock state with tooltip messages.
 * Prevents users from navigating between steps when certain conditions aren't met.
 */
@Injectable({
  providedIn: 'root',
})
export class StepperLockTracker {

  private _isStepperLocked = signal<boolean>(false);
  /** Read-only signal indicating whether stepper navigation is locked. */
  public readonly isLocked = this._isStepperLocked.asReadonly();

  private _tooltipMessage = signal<string>('');
  /** Read-only signal containing the tooltip message explaining why stepper is locked. */
  public readonly tooltipMessage = this._tooltipMessage.asReadonly();

  /** Sets the stepper lock state and optional tooltip message explaining the lock reason. */
  setStepperLock(isLocked: boolean, tooltipMessage?: string) {
    this._isStepperLocked.set(isLocked);
    if(isLocked && tooltipMessage){
      this._tooltipMessage.set(tooltipMessage);
    }
    else{
      this._tooltipMessage.set('');
    }
  }
}
