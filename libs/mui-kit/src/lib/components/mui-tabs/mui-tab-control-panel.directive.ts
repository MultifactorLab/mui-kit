import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[muiTabControlPanel]'
})
export class MuiTabControlPanelDirective {
  constructor(public readonly templateRef: TemplateRef<unknown>) {}
}
