import  tippy from 'tippy.js';
import { AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appToolTip]'
})
export class ToolTipDirective implements AfterViewInit, OnChanges{
  @Input('appToolTip') tooltipContent !: string;
  public tippyInstance: any;

  constructor(private elRef : ElementRef) { }

  ngAfterViewInit() : void {
    this.tippyInstance = tippy(this.elRef.nativeElement, {
      content: this.tooltipContent
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['tooltipContent']) {
      this.updateToolTipContent();
    }
  }

  updateToolTipContent() {
    if(this.tippyInstance) {
      this.tippyInstance.setContent(this.tooltipContent)
    }
  }
}
