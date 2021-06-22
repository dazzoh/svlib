
export let classCount = 0;
//
// /**
//  * ColumnSyncer synchronises the widths of columns in the column header and body tables.
//  */
// export class ColumnSyncer {
//
//     /**
//      * Class for column and row tables to apply in order for the style to apply to the cells.
//      */
//     readonly cssClass: string;
//
//     private readonly style: HTMLStyleElement;
//     private readonly styleSheet: CSSStyleSheet;
//
//
//     constructor(private cols: ObservableList<unknown>) {
//         this.style = document.createElement("style");
//         document.body.appendChild(this.style);
//         this.styleSheet = this.style.sheet as CSSStyleSheet;
//         this.cssClass = `_colSync${classCount++}`;
//         this.init();
//     }
//
//     disable() {
//         this.styleSheet.disabled = true;
//         // document.body.removeChild(this.style);
//     }
//
//     enable() {
//         this.styleSheet.disabled = false;
//     }
//
//     destroy() {
//         this.sub?.unsubscribe();
//         document.body.removeChild(this.style);
//     }
//
//     addRule(index: number, width = null) {
//         if (width == null) {
//             // this.styleSheet.insertRule(`.${this.cssClass}  > tr > td:nth-child(${index + 1}) {max-width:auto;}`, index);
//             this.styleSheet.insertRule(`.${this.cssClass} [dg-row="0"] :nth-child(${index + 1}) {width:300px}`, index);
//         } else {
//             this.styleSheet.insertRule(`.${this.cssClass}  > tr > td:nth-child(${index + 1}) {max-width:${width}px;min-width:${width}px;}`, index);
//         }
//     }
//
//     setWidth(index: number, width: number) {
//         const val = width == null ? "" : `${width}px`
//         this.styleSheet!.cssRules!.item(index)!.style.maxWidth = val;
//         this.styleSheet!.cssRules!.item(index)!.style.minWidth = val;
//     }
//
//     private init() {
//         this.cols.forEach((_, index) => {
//             this.addRule(index);
//         });
//
//         this.sub = this.cols.subscribe(event => {
//             // todo: the rest
//             switch (event.type) {
//                 case ListEventType.Load:
//                     break;
//                 case ListEventType.Add:
//                     this.addRule(event.index!);
//                     break;
//                 case ListEventType.Update:
//                     break;
//                 case ListEventType.Remove:
//                     break;
//                 case ListEventType.Clear:
//                     break;
//
//             }
//         })
//     }
// }
