import { Component, ViewEncapsulation } from '@angular/core';
import { ChadsVasc, HasBled } from './risk-calc/risk-calc.provider';

@Component({
  selector: 'eu-editor',
  templateUrl: './eueditor.component.html',
  styleUrls: ['./eueditor.component.css', './quill.snow.css'],
  providers: [ChadsVasc, HasBled],
  encapsulation: ViewEncapsulation.None
})

export class EuEditorComponent {
  hasbled = new HasBled;
  chadsvasc = new ChadsVasc;
  get_assessment(evt: string) {
    console.log(evt)
  }
}
