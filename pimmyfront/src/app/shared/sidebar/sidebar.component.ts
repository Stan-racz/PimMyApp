import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from "../../services/authentication.service/authentication.service";
import { UserRole } from "../../services/user.service/user.types";
import { RouteInfo } from './sidebar.metadata';

import { SIDEBAR_CONFIG } from './menu-items';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  showMenu = '';
  showSubMenu = '';
  sidebarnavItems: RouteInfo[] = [];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const role = localStorage.getItem('role') as UserRole | null;
    if (role) {
      this.sidebarnavItems = SIDEBAR_CONFIG[role];
    }
  }

  // this is for the open close
  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

}
