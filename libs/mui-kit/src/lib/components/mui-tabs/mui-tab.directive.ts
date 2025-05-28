import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[muiTab]'
})
export class MuiTabDirective {
  @Input('muiTab') label!: string;

  constructor(public readonly templateRef: TemplateRef<unknown>) {}
}
