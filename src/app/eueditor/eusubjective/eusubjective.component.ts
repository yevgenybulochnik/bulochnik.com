import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'subjective',
  template: `
    <div class="subj_button" *ngFor="let question of questions" [ngClass]="{'red':question.usr_input}">
      <button (click)="usr_activate(question)" class = "subj_positive" [ngClass] = "{'red':question.usr_isclicked,'red':question.usr_input}">+</button>
      <div class="subj_middle">{{question.text}}</div>
      <button (click)="d_activate(question)" class = "subj_negative" [ngClass]="{'green':question.d_isclicked,'hide':question.usr_input}">-</button>
      <textarea focusIn *ngIf="question.usr_isclicked" (blur)="gen_usr_input_strings(question)" [(ngModel)]="question.usr_input" class="subj_input" contenteditable="true">{{question.usr_input}}</textarea>
    </div>
  `,
  styleUrls: ['./eusubjective.component.css']
})
export class EuSubjectiveComponent {
  @Output() subjective_list: EventEmitter<any> = new EventEmitter();
  questions: Question[];
  constructor() {
    this.questions = [
      new Question('Missed doses', 'Denies any missed doses, confirms correct dosage.'),
      new Question('Bleeding/Bruising', 'Denies any unusual bleeding or bruising.'),
      new Question('Medication Changes', 'Denies any medication changes.'),
      new Question('Dietary Changes', 'Denies any dietary changes.'),
      new Question('ETOH Intake', 'Denies any ETOH intake.'),
      new Question('Health Changes', 'Denies any health changes.'),
      new Question('Activity Changes', 'Denies any changes in activity level.'),
      new Question('Pain Level/APAP', 'Denies any changes with pain. ')
      ]
  }
  usr_activate(question: Question) {
    for (let i = 0; i < this.questions.length; i++) {
      this.questions[i].usr_isclicked = false;
    }
    if (question.usr_isclicked === true) {
      question.usr_isclicked = false;
    }else {
      question.usr_isclicked = true;
    }
  }
  d_activate(question: Question) {
   if (question.d_isclicked === true) {
     question.d_isclicked = false;
   }else {
     question.d_isclicked = true;
     question.usr_isclicked = false;
     question.usr_input = '';
   }
   this.subjective_list.emit(this.gen_subjective_list())
  }
  gen_usr_input_strings(question: Question) {
    question.usr_isclicked = false;
    if (question.usr_input) {
      question.d_isclicked = false;
    }
    this.subjective_list.emit(this.gen_subjective_list())
  }
  gen_subjective_list() {
    let denial_list = [];
    let usr_input_list = [];
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i].d_isclicked === true) {
        denial_list.push('- ' + this.questions[i].denial)
      }
      if (this.questions[i].usr_input) {
        usr_input_list.push('+ ' + this.questions[i].usr_input)
      }
    }
    let combined_list = usr_input_list.concat(denial_list)
    return combined_list
  }

}

class Question {
  text: string;
  denial: string;
  d_isclicked: boolean;
  usr_input: string;
  usr_isclicked: boolean;
  constructor(text: string, denial: string) {
   this.text = text;
   this.denial = denial;
   this.d_isclicked = false;
   this.usr_input = '';
   this.usr_isclicked = false;
  }
}
