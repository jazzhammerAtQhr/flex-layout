import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentFixture, TestBed, async } from '@angular/core/testing';

import {MockMatchMedia} from '../../media-query/mock/mock-match-media';
import {MatchMedia} from '../../media-query/match-media';
import {BreakPointsProvider} from '../../media-query/providers/break-points-provider';
import {BreakPointRegistry} from '../../media-query/breakpoints/break-point-registry';
import {FlexLayoutModule} from '../_module';

import {extendObject} from '../../utils/object-extend';
import {customMatchers} from '../../utils/testing/custom-matchers';
import {makeCreateTestComponent, makeExpectDOMFrom, expectNativeEl} from '../../utils/testing/helpers';

describe('layout-align directive', () => {
  let fixture: ComponentFixture<any>;
  let createTestComponent = makeCreateTestComponent(()=> TestLayoutComponent);
  let expectDOMFrom = makeExpectDOMFrom(()=> TestLayoutComponent);

  beforeEach(async(() => {
    jasmine.addMatchers(customMatchers);

    // Configure testbed to prepare services
    TestBed.configureTestingModule({
      imports: [CommonModule, FlexLayoutModule.forRoot()],
      declarations: [TestLayoutComponent],
      providers: [
        BreakPointRegistry, BreakPointsProvider,
        {provide: MatchMedia, useClass: MockMatchMedia}
      ]
    })
  }));
  afterEach(() => {
    fixture = null;
  });

  describe('with static features', () => {

    it('should add work without a peer `fx-layout` directive', () => {
      expectDOMFrom(`<div fx-layout-align></div>`).toHaveCssStyle({
        'display': 'flex',
        'flex-direction': 'row',
        'box-sizing': 'border-box'
      });
    });
    it('should add correct styles for default `fx-layout-align` usage', () => {
      expectDOMFrom(`<div fx-layout-align></div>`).toHaveCssStyle({
        'justify-content' : 'flex-start',
        'align-items' : 'stretch',
        'align-content' : 'stretch'
      });
    });
    it('should add preserve fx-layout', () => {
      expectDOMFrom(`<div fx-layout="column" fx-layout-align></div>`).toHaveCssStyle({
        'display': 'flex',
        'flex-direction': 'column',
        'box-sizing': 'border-box',
        'justify-content' : 'flex-start',
        'align-items' : 'stretch',
        'align-content' : 'stretch'
      });
    });

    describe('for "main-axis" testing', ()=>{
      it('should add correct styles for `fx-layout-align="start"` usage', () => {
        expectDOMFrom(`<div fx-layout-align="start"></div>`).toHaveCssStyle(
            extendObject({ 'justify-content' : 'flex-start' }, CROSSAXIS_DEFAULTS)
        );
      });
      it('should add correct styles for `fx-layout-align="center"` usage', () => {
        expectDOMFrom(`<div fx-layout-align="center"></div>`).toHaveCssStyle(
            extendObject({ 'justify-content' : 'center' }, CROSSAXIS_DEFAULTS)
        );
      });
      it('should add correct styles for `fx-layout-align="space-around"` usage', () => {
        expectDOMFrom(`<div fx-layout-align="space-around"></div>`).toHaveCssStyle(
            extendObject({ 'justify-content' : 'space-around' }, CROSSAXIS_DEFAULTS)
        );
      });
      it('should add correct styles for `fx-layout-align="space-between"` usage', () => {
        expectDOMFrom(`<div fx-layout-align="space-between"></div>`).toHaveCssStyle(
            extendObject({ 'justify-content' : 'space-between' }, CROSSAXIS_DEFAULTS)
        );
      });
      it('should add correct styles for `fx-layout-align="end"` usage', () => {
        expectDOMFrom(`<div fx-layout-align="end"></div>`).toHaveCssStyle(
            extendObject({ 'justify-content' : 'flex-end' }, CROSSAXIS_DEFAULTS)
        );
      });
      it('should add ignore invalid main-axis values', () => {
        expectDOMFrom(`<div fx-layout-align="invalid"></div>`).toHaveCssStyle(
            extendObject({ 'justify-content' : 'flex-start' }, CROSSAXIS_DEFAULTS)
        );
      });
    });

    describe('for "cross-axis" testing', ()=>{
      it('should add correct styles for `fx-layout-align="start start"` usage', () => {
        expectDOMFrom(`<div fx-layout-align="start start"></div>`).toHaveCssStyle(
            extendObject(MAINAXIS_DEFAULTS, {
              'align-items' : 'flex-start',
              'align-content' : 'flex-start'
            })
        );
      });
      it('should add correct styles for `fx-layout-align="start baseline"` usage', () => {
        expectDOMFrom(`<div fx-layout-align="start baseline"></div>`).toHaveCssStyle(
            extendObject(MAINAXIS_DEFAULTS, {
              'align-items' : 'baseline',
              'align-content' : 'stretch'
            })
        );
      });
      it('should add correct styles for `fx-layout-align="start center"` usage', () => {
        expectDOMFrom(`<div fx-layout-align="start center"></div>`).toHaveCssStyle(
            extendObject(MAINAXIS_DEFAULTS, {
              'align-items' : 'center',
              'align-content' : 'center'
            })
        );
      });
      it('should add correct styles for `fx-layout-align="start end"` usage', () => {
        expectDOMFrom(`<div fx-layout-align="start end"></div>`).toHaveCssStyle(
            extendObject(MAINAXIS_DEFAULTS, {
              'align-items' : 'flex-end',
              'align-content' : 'flex-end'
            })
        );
      });
      it('should add ignore invalid cross-axis values',  () => {
        expectDOMFrom(`<div fx-layout-align="start invalid"></div>`).toHaveCssStyle(
            extendObject(MAINAXIS_DEFAULTS, {
              'align-items' : 'stretch',
              'align-content' : 'stretch'
            })
        );
      });
      it('should add special styles for cross-axis `stretch`', () => {
        expectDOMFrom(`<div fx-layout-align="start stretch"></div>`)
          .toHaveCssStyle({
            'max-height' : '100%'
          });
      });
      it('should add special styles for cross-axis `stretch` when layout is `column`', () => {
        expectDOMFrom(`<div fx-layout="column" fx-layout-align="end stretch"></div>`)
          .toHaveCssStyle({
            'max-width' : '100%'
          });
      });
    });

    describe('for dynamic inputs', ()=>{
      it('should add correct styles and ignore invalid axes values',  () => {
        fixture = createTestComponent(`<div [fx-layout-align]="alignBy"></div>`);

        fixture.componentInstance.alignBy = "center end";
        fixture.detectChanges();
        expectNativeEl(fixture).toHaveCssStyle({
          'justify-content' : 'center',
          'align-items' : 'flex-end',
          'align-content' : 'flex-end'
        });

        fixture.componentInstance.alignBy  = "invalid invalid";
        fixture.detectChanges();
        expectNativeEl(fixture).toHaveCssStyle(DEFAULT_ALIGNS);

        fixture.componentInstance.alignBy  = "";
        fixture.detectChanges();
        expectNativeEl(fixture).toHaveCssStyle(DEFAULT_ALIGNS);
      });
    });

  });

  describe('with responsive features', () => {

    it('should ignore responsive changes when not configured', () => {
      fixture = createTestComponent(`<div fx-layout-align="center center"></div>`);
      let matchMedia: MockMatchMedia = fixture.debugElement.injector.get(MatchMedia);

      matchMedia.activate('md');

      fixture.detectChanges();
      expectNativeEl(fixture).toHaveCssStyle({
        'justify-content' : 'center',
        'align-items' : 'center',
        'align-content' : 'center'
      });
    });

    it('should add responsive styles when configured', () => {
      fixture = createTestComponent(`
        <div fx-layout-align="center center" fx-layout-align.md="end"></div>
      `);
      let matchMedia: MockMatchMedia = fixture.debugElement.injector.get(MatchMedia);

      fixture.detectChanges();
      expectNativeEl(fixture).toHaveCssStyle({
        'justify-content' : 'center',
        'align-items' : 'center',
        'align-content' : 'center'
      });

      matchMedia.activate('md');

      fixture.detectChanges();
      expectNativeEl(fixture).toHaveCssStyle({
        'justify-content' : 'flex-end',
        'align-items' : 'stretch',
        'align-content' : 'stretch'
      });
    });

    it('should update responsive styles when the layout direction changes', () => {
      fixture = createTestComponent(`
        <div fx-layout
             [fx-layout.md]="direction" 
             fx-layout-align="center stretch" 
             fx-layout-align.md="end stretch">
        </div>
      `);

      fixture.detectChanges();
      expectNativeEl(fixture).toHaveCssStyle({
        'justify-content' : 'center',
        'max-height' : '100%'
      });

      let matchMedia: MockMatchMedia = fixture.debugElement.injector.get(MatchMedia);
      matchMedia.activate('md');

      fixture.detectChanges();
      expectNativeEl(fixture).toHaveCssStyle({
        'justify-content' : 'flex-end',
        'max-width' : '100%'
      });
    });

    it('should fallback to default styles when the active mediaQuery change is not configured', () => {
      fixture = createTestComponent(`
         <div fx-layout
              [fx-layout.md]="direction" 
              fx-layout-align="center stretch" 
              fx-layout-align.md="end stretch">
         </div>
       `);

      fixture.detectChanges();
      expectNativeEl(fixture).toHaveCssStyle({
        'justify-content': 'center',
        'max-height': '100%'
      });

      let matchMedia: MockMatchMedia = fixture.debugElement.injector.get(MatchMedia);
      matchMedia.activate('md');

      fixture.detectChanges();
      expectNativeEl(fixture).toHaveCssStyle({
        'justify-content': 'flex-end',
        'max-width': '100%'
      });

      matchMedia.activate('xs');
      fixture.detectChanges();
      expectNativeEl(fixture).toHaveCssStyle({
        'justify-content': 'center',
        'max-height': '100%'
      });
    });

    it('should fallback to closest overlapping value when the active mediaQuery change is not configured', () => {
      fixture = createTestComponent(`
          <div  fx-layout 
                fx-layout.md="column"
                fx-layout-align="start" 
                fx-layout-align.gt-xs="end"
                fx-layout-align.md="center">
          </div>
      `);
      let matchMedia: MockMatchMedia = fixture.debugElement.injector.get(MatchMedia);

      fixture.detectChanges();
      expectNativeEl(fixture).toHaveCssStyle({
        'flex-direction': 'row',
        'justify-content': 'flex-start'
      });

      matchMedia.activate('md');
      fixture.detectChanges();
      expectNativeEl(fixture).toHaveCssStyle({
        'flex-direction': 'column',
        'justify-content': 'center'
      });

      matchMedia.activate('xs');
      fixture.detectChanges();
      expectNativeEl(fixture).toHaveCssStyle({
        'flex-direction': 'row',
        'justify-content': 'flex-start'
      });

      // Should fallback to value for 'gt-xs' or default
      matchMedia.activate('lg', true);
      fixture.detectChanges();
      expectNativeEl(fixture).toHaveCssStyle({
        'flex-direction': 'row',
        'justify-content': 'flex-end'
      });

      matchMedia.activate('xs');
      fixture.detectChanges();
      expectNativeEl(fixture).toHaveCssStyle({
        'flex-direction': 'row',
        'justify-content': 'flex-start'
      });

      // Should fallback to value for 'gt-xs' or default
      matchMedia.activate('gt-lg', true);
      fixture.detectChanges();
      expectNativeEl(fixture).toHaveCssStyle({
        'flex-direction': 'row',
        'justify-content': 'flex-end'
      });

    });

  });

});


// *****************************************************************
// Template Component
// *****************************************************************

@Component({
  selector: 'test-layout',
  template: `<span>PlaceHolder Template HTML</span>`
})
export class TestLayoutComponent implements OnInit {
  direction = "column";
  mainAxis = "start";
  crossAxis = "end";

  set alignBy(style) {
    let vals = style.split(" ");
    this.mainAxis = vals[0];
    this.crossAxis = vals.length > 1 ? vals[1] : "";
  }

  get alignBy() {
    return `${this.mainAxis} ${this.crossAxis}`;
  }

  constructor() {  }
  ngOnInit() { }
}


// *****************************************************************
// Template Component
// *****************************************************************

  const DEFAULT_ALIGNS ={
          'justify-content' : 'flex-start',
          'align-items' : 'stretch',
          'align-content' : 'stretch'
        };
  const CROSSAXIS_DEFAULTS = {
          'align-items': 'stretch',
          'align-content': 'stretch'
        };
  const MAINAXIS_DEFAULTS = {
          'justify-content' : 'flex-start'
        };

