import {Component, Input} from '@angular/core';

@Component({
  selector: 'smartmarket-loader',
  template: `<div [ngClass]="{'loader-animator': true, 'big-loader': isBig }"></div>`,
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent {
  @Input() isBig = false;
}
