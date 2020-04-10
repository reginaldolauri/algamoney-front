import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
  <p-message *ngIf="temErro()"
    severity="error"
    text="{{ errorText }}">
  </p-message>
  `,
  styles: [
  ],
})
export class MessageComponent {

  @Input() error: string;
  @Input() control: FormControl;
  @Input() errorText: string;

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
