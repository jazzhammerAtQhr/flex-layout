import { TestBed, inject, async } from '@angular/core/testing';

import {BreakPointRegistry } from './break-point-registry';
import {BREAKPOINTS} from '../providers/break-points-provider';
import {RAW_DEFAULTS} from "../providers/break-points-provider";
import {BreakPoint} from './break-point';

describe('break-points', () => {
  let breakPoints : BreakPointRegistry;
  beforeEach(() => { breakPoints = new BreakPointRegistry(RAW_DEFAULTS); });

  it('registry has all aliases defined', () =>{
    expect(breakPoints.items.length).toBeGreaterThan(0);

    expect(breakPoints.findByAlias('xs')).toBeDefined();
    expect(breakPoints.findByAlias('gt-xs')).toBeDefined();   // Overlapping
    expect(breakPoints.findByAlias('sm')).toBeDefined();
    expect(breakPoints.findByAlias('gt-sm')).toBeDefined();   // Overlapping
    expect(breakPoints.findByAlias('md')).toBeDefined();
    expect(breakPoints.findByAlias('gt-md')).toBeDefined();   // Overlapping
    expect(breakPoints.findByAlias('lg')).toBeDefined();
    expect(breakPoints.findByAlias('gt-lg')).toBeDefined();   // Overlapping
    expect(breakPoints.findByAlias('xl')).toBeDefined();

    expect(breakPoints.overlappings.length).toBe(4);
  });

  describe('overridden with custom provider', () =>{
     const CUSTOM_BPS : BreakPoint[] = [
       { alias: 'ab',  suffix: 'Ab', mediaQuery: '(max-width: 297px)', overlapping: false },
       { alias: 'cd',  suffix: 'Cd', mediaQuery: '(min-width: 298px) and (max-width:414px', overlapping: false }
     ];

     beforeEach(()=> {
         // Configure testbed to prepare services
         TestBed.configureTestingModule({
           providers: [ { provide: BREAKPOINTS, useValue: CUSTOM_BPS } ]
         });
       });

       it('has the custom breakpoints', async(inject( [BREAKPOINTS], (breakPoints) => {
         expect( breakPoints.length ).toEqual(CUSTOM_BPS.length);
         expect( breakPoints[0].alias ).toEqual('ab');
         expect( breakPoints[breakPoints.length - 1].suffix ).toEqual('Cd');
       })));
   })

});
