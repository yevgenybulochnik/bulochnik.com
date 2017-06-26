import { Component } from '@angular/core';

@Component({
  selector: 'eu-editor',
  template: `
  <div> EuEditor Component
    <risk-calc></risk-calc>
  </div>
  `,
  styles: [`
    div {
      border: solid red 1px;
    }
    `]
})

export class EuEditorComponent {

}
