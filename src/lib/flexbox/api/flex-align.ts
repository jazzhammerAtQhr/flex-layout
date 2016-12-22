import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  Renderer,
  SimpleChanges,
} from '@angular/core';

import {BaseFxDirective} from './base';
import {MediaChange} from '../../media-query/media-change';
import {MediaMonitor} from '../../media-query/media-monitor';

/**
 * 'flex-align' flexbox styling directive
 * Allows element-specific overrides for cross-axis alignments in a layout container
 * @see https://css-tricks.com/almanac/properties/a/align-self/
 */
@Directive({
  selector: `
  [fx-flex-align],
  [fx-flex-align.xs]
  [fx-flex-align.gt-xs],
  [fx-flex-align.sm],
  [fx-flex-align.gt-sm]
  [fx-flex-align.md],
  [fx-flex-align.gt-md]
  [fx-flex-align.lg],
  [fx-flex-align.gt-lg],
  [fx-flex-align.xl]
`
})
export class FlexAlignDirective extends BaseFxDirective implements OnInit, OnChanges, OnDestroy {

  @Input('fx-flex-align')       set align(val) {
    this._cacheInput('align', val);
  }

  @Input('fx-flex-align.xs')    set alignXs(val) {
    this._cacheInput('alignXs', val);
  }

  @Input('fx-flex-align.gt-xs') set alignGtXs(val) {
    this._cacheInput('alignGtXs', val);
  };

  @Input('fx-flex-align.sm')    set alignSm(val) {
    this._cacheInput('alignSm', val);
  };

  @Input('fx-flex-align.gt-sm') set alignGtSm(val) {
    this._cacheInput('alignGtSm', val);
  };

  @Input('fx-flex-align.md')    set alignMd(val) {
    this._cacheInput('alignMd', val);
  };

  @Input('fx-flex-align.gt-md') set alignGtMd(val) {
    this._cacheInput('alignGtMd', val);
  };

  @Input('fx-flex-align.lg')    set alignLg(val) {
    this._cacheInput('alignLg', val);
  };

  @Input('fx-flex-align.gt-lg') set alignGtLg(val) {
    this._cacheInput('alignGtLg', val);
  };

  @Input('fx-flex-align.xl')    set alignXl(val) {
    this._cacheInput('alignXl', val);
  };

  constructor(monitor: MediaMonitor, elRef: ElementRef, renderer: Renderer) {
    super(monitor, elRef, renderer);
  }


  // *********************************************
  // Lifecycle Methods
  // *********************************************

  /**
   * For @Input changes on the current mq activation property, see onMediaQueryChanges()
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['align'] != null || this._mqActivation) {
      this._updateWithValue();
    }
  }

  /**
   * After the initial onChanges, build an mqActivation object that bridges
   * mql change events to onMediaQueryChange handlers
   */
  ngOnInit() {
    this._listenForMediaQueryChanges('align', 'stretch', (changes: MediaChange) => {
      this._updateWithValue(changes.value);
    });
    this._updateWithValue();
  }

  // *********************************************
  // Protected methods
  // *********************************************

  private _updateWithValue(value?: string|number) {
    value = value || this._queryInput("align") || 'stretch';
    if (this._mqActivation) {
      value = this._mqActivation.activatedInput;
    }

    this._applyStyleToElement(this._buildCSS(value));
  }

  private _buildCSS(align) {
    let css = {};

    // Cross-axis
    switch (align) {
      case 'start':
        css['align-self'] = 'flex-start';
        break;
      case 'end':
        css['align-self'] = 'flex-end';
        break;
      default:
        css['align-self'] = align;
        break;
    }

    return css;
  }
}
