import {Component} from '@angular/core';

@Component({
  selector: 'demo-flex-offset-values',
  styleUrls : [
    '../demo-app/material2.css'
  ],
  template: `
    <md-card class="card-demo" >
      <md-card-title>Flex Offset Values </md-card-title>
      <md-card-subtitle>Explore impact of values for the 'flex-offset' API:</md-card-subtitle>
      <md-card-content>
        <div class="containerX">
          <div fx-layout="row" class="colored box nopad" >
              <div fx-flex="66" fx-flex-offset="15">  [flex="66"] [flex-offset="15"]  </div>
              <div fx-flex>                           [flex]                          </div>
          </div>          
        </div>
      </md-card-content>
      <md-card-footer>
        <div class="hint">&lt;div fx-layout="row" &gt;</div>
      </md-card-footer>
    </md-card>
  `
})
export class DemoFlexOffsetValues {  }
