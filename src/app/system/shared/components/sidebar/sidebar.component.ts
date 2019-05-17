import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'smartmarket-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    @Input() sidebarIsOpen = false;

    @Output() onCloseSidebar = new EventEmitter();

    productsMenuIsOpen = false;
    newsMenuIsOpen = false;
    contentMenuIsOpen = false;

    constructor() {
    }

    ngOnInit() {
        console.log(this.sidebarIsOpen);
    }

    productsMenuOpen() {
        this.productsMenuIsOpen = !this.productsMenuIsOpen;
    }

    newsMenuOpen() {
        this.newsMenuIsOpen = !this.newsMenuIsOpen;
    }

    contentMenuOpen() {
        this.contentMenuIsOpen = !this.contentMenuIsOpen;
    }

    closeSidebar() {
        this.onCloseSidebar.emit(false);
    }

}
