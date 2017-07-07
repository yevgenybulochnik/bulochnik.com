import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EuNavComponent } from './eunav/eunav.component';
import { EuEditorComponent } from './eueditor/eueditor.component';
import { RiskCalcComponent} from './eueditor/risk-calc/risk-calc.component';

import { Ng2PageScrollModule } from 'ng2-page-scroll';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    Ng2PageScrollModule.forRoot()
  ],
  declarations: [
    AppComponent,
    EuNavComponent,
    EuEditorComponent,
    RiskCalcComponent
  ],
  providers: [
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
