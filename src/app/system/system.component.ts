import {Component, HostBinding} from '@angular/core';
import {fadeStateTrigger} from '../shared/animations/fade.animation';

@Component({
  selector: 'smartmarket-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
  animations: [fadeStateTrigger]
})

export class SystemComponent {

  @HostBinding('@fade') a = true;

  sidebarIsOpen = false;

  onShowSidebar() {
    this.sidebarIsOpen = true;
  }

  onCloseSidebar() {
    this.sidebarIsOpen = false;
  }

}
