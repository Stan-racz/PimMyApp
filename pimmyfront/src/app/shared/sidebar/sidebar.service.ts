import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SIDEBAR_CONFIG, SidebarConfig } from './menu-items';


@Injectable({
    providedIn: 'root'
})
export class VerticalSidebarService {

    public screenWidth: any;
    public collapseSidebar: boolean = false;
    public fullScreen: boolean = false;

    MENUITEMS: SidebarConfig = SIDEBAR_CONFIG;
    items = new BehaviorSubject<SidebarConfig>(this.MENUITEMS);

    constructor() {
    }
}
