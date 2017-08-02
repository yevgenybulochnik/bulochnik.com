import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RiskFactor } from './risk-calc.provider';

@Component({
  selector: 'risk-calc',
  template: `
  <button [class.active]='risk.is_clicked' (click)='gen_assessment(risk)' *ngFor='let risk of calculator.riskfactors'>
    {{risk.abv}}
    <div class='spacer'>+</div>
  </button>
  `,
  styles: [`
    :host{
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 6.5em;
      margin: 0.5em;
      padding: 0.7em;
      box-shadow: 0em 1em 2em 0em black;
      background: white;
    }
    button {
      display: block;
      padding: 0px;
      margin: 0.1em 0;
      width: 7em;
      height: 1.5em;
      border: solid grey 1px;
      box-shadow: inset 0px 0px 2px 1px grey;
      background: white;
      transition: 0.5s;
    }
    button:hover {
      background: pink;
    }
    .spacer {
      float: left;
      width: 1em;
      border-right: solid grey 1px;
    }
    .active {
      background: red;
      width: 8em;
    }
    `]
})

export class RiskCalcComponent {
  @Input() calculator: any;
  @Output() riskassessment: EventEmitter<any> = new EventEmitter();
  score: number;
  percent: string;
  clicked_factors: string[];
  constructor() {
    this.score = 0;
    this.percent = '';
    this.clicked_factors = [];
  }

  gen_assessment(risk: RiskFactor) {
    risk.is_clicked = !risk.is_clicked
    if (risk.is_clicked) {
      this.clicked_factors.push(risk.name)
      this.score += risk.value
    } else {
      let abv_index = this.clicked_factors.indexOf(risk.abv)
      this.score -= risk.value
      this.clicked_factors.splice(abv_index, 1)
    }
    this.percent = this.calculator.scores[this.score]
    let assessment = `Patient has a ${this.calculator.riskcalc_name}= (${this.score}) for${this.clicked_factors} corresponding to a ${this.percent} annual risk.`
    if (!this.score) {
      assessment = ''
    }
    this.riskassessment.emit(assessment)
  }
}
