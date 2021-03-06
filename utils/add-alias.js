import { extendObject } from './object-extend';
/**
 * @internal
 *
 * For the specified MediaChange, make sure it contains the breakpoint alias
 * and suffix (if available).
 */
export function mergeAlias(dest, source) {
    return extendObject(dest, source ? {
        mqAlias: source.alias,
        suffix: source.suffix
    } : {});
}
//# sourceMappingURL=/Users/abraham.tio/code/flex-layout/src/lib/utils/add-alias.js.map