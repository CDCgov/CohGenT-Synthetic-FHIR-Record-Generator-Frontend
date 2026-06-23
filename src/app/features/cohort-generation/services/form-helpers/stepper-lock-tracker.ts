import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StepperLockTracker {

  private _isStepperLocked = signal<boolean>(false);
  public readonly isLocked = this._isStepperLocked.asReadonly();

  private _tooltipMessage = signal<string>('');
  public readonly tooltipMessage = this._tooltipMessage.asReadonly();

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
