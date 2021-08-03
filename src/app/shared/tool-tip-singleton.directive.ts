import { ToolTipDirective } from './tool-tip.directive';
import { AfterViewInit, ContentChildren, Directive, QueryList } from '@angular/core';
import { createSingleton } from 'tippy.js';
import { ThrowStmt } from '@angular/compiler';

@Directive({
  selector: '[appToolTipSingleton]'
})
export class ToolTipSingletonDirective implements AfterViewInit {

  @ContentChildren(ToolTipDirective, {descendants: true}) 
  elementsWithTooltips!: QueryList<ToolTipDirective>
  singletonInstance: any;

  constructor() { }

  ngAfterViewInit() {
    this.singletonInstance = createSingleton(this.getTippyInstances(), {
      delay: [200, 0],
      moveTransition: 'transform 0.2s ease-out'
    })

    this.elementsWithTooltips.changes.subscribe(() => {
      this.singletonInstance.setInstance(this.getTippyInstances())
    })
  }

  getTippyInstances() {
    return this.elementsWithTooltips
      .toArray()
      .map(t => t.tippyInstance)
  }

}
