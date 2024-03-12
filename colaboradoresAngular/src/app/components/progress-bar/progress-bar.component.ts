import { Component, Input, OnInit } from '@angular/core';

/**
 * Create a progress-barr element.
 *
 * @export
 * @class ProgressBarComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'coppel-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  /**
   * @ignore
   * @private
   * @memberof ProgressBarComponent
   */
  private _value = '0';

  /**
   * @ignore
   * @memberof ProgressBarComponent
   */
  public percentage = 100;

  /**
   *  Component parameter that indicates if it is undetermined.
   *
   * @type {boolean}
   * @memberof ProgressBarComponent
   */
  @Input()
  indeterminate: boolean;

  /**
   *  Parameter of the component that defines the current progress value.
   *
   * @readonly
   * @type {string}
   * @memberof ProgressBarComponent
   */
  @Input()
  get value(): string {
    return this._value;
  }
  /**
   *
   */
  set value(value: string) {
    if (value !== this._value && !this.indeterminate) {
      this._value = value;
      if (Number(this._value) < 1 && Number(this._value) > 0) {
        this.percentage = Number(this._value) * 100;
      } else if (Number(this._value) <= 100) {
        this.percentage = Number(this._value);
      }
    }
  }

  /**
   *  Parameter of the component that indicates the color of the progress bar.
   *
   * @type {string}
   * @memberof ProgressBarComponent
   */
  @Input() color: string;

  /**
   * @ignore
   * @memberof ProgressBarComponent
   */
  ngOnInit() {
    this.indeterminate = this.indeterminate !== undefined;
  }
}
