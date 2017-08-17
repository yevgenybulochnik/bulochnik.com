import { Component, ViewEncapsulation } from '@angular/core';
import { ChadsVasc, HasBled } from './risk-calc/risk-calc.provider';

class Note {
  subjective: string[] = [];
  objective = '';
  assessment = '';
  plan = '';
  chadsvasc = '';
  hasbled = '';
}

@Component({
  selector: 'eu-editor',
  templateUrl: './eueditor.component.html',
  styleUrls: ['./eueditor.component.css', './quill.snow.css'],
  providers: [ChadsVasc, HasBled],
  encapsulation: ViewEncapsulation.None
})

export class EuEditorComponent {
  progressNote = new Note;
  hasbled = new HasBled;
  chadsvasc = new ChadsVasc;
  editor: any;
  toolbarButtons = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'indent': '-1'}, {'indent': '+1'}]
      //[{'color': [] }, {'background': [] }]   *Note: causes implicit any warnings
    ]
   };
  setEditor(evt: any) {
    this.editor = evt;
    this.editor.setText('Subjective:\nObjective:\nAssessment:\nPlan:')
    this.editor.formatText(0, 40, 'bold', true)
  }
  get_chadsvasc(evt: string) {
    this.addremove('before', 'Plan:', this.progressNote.chadsvasc)
    this.progressNote.chadsvasc = evt
    this.addremove('before', 'Plan:', this.progressNote.chadsvasc)
  }
  get_hasbled(evt: string) {
    this.addremove('before', 'Plan:', this.progressNote.hasbled)
    this.progressNote.hasbled = evt
    this.addremove('before', 'Plan:', this.progressNote.hasbled)
  }
  get_subjective_list(evt: string[]) {
    for (let item of this.progressNote.subjective) {
      this.addremove('before', 'Objective:', item)
    }
    this.progressNote.subjective = evt;
    for (let item of this.progressNote.subjective){
      this.addremove('before', 'Objective:', item)
    }
  }
  addremove(before_after: string, insertion_text: string, text: string) {
    if (text === '') {
      return;
    }
    let content = this.editor.getText()
    let start = content.indexOf(insertion_text)
    let end = start + insertion_text.length + 1
    if (before_after === 'after') {
      if (content.indexOf(text) === -1) {
        this.editor.insertText(end, text + '\n', {'bold': false})
      }else {
        start = content.indexOf(text)
        this.editor.deleteText(start - 1, text.length + 1)
      }
    }else if (before_after === 'before') {
      if (content.indexOf(text) === -1) {
        this.editor.insertText(start, text + '\n', {'bold': false})
      }else {
        start = content.indexOf(text)
        this.editor.deleteText(start - 1, text.length + 1)
      }
    }
  }
}
