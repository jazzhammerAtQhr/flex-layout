import { Component } from '@angular/core';

@Component({
  selector: 'demo-responsive-layout-direction',
  styleUrls : [
    '../demo-app/material2.css'
  ],
  template: `
    <md-card class="card-demo" >
      <md-card-title>Responsive Layout Directions</md-card-title>
      <md-card-subtitle>Layout direction changes to 'column' for 'xs' or 'sm' viewport sizes:</md-card-subtitle>
      <md-card-content>
        <div class="containerX">
          <div fx-layout="row" fx-layout.xs="column" fx-layout.sm="column" fx-flex class="coloredContainerX box" >
            <div fx-flex> I'm above on mobile, and to the left on larger devices.   </div>
            <div fx-flex> I'm below on mobile, and to the right on larger devices.  </div>
          </div>
        </div>
      </md-card-content>
    </md-card>
  `
})
export class DemoResponsiveLayoutDirection {  }
