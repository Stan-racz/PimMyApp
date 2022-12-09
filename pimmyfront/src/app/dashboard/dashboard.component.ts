import { Component, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { Router } from "@angular/router";

//declare var require: any;

@Component({
  templateUrl: './dashboard.component.html',
  styles: [`
    .max-width {
      max-width: 1440px;
      margin: 0 auto;
    }
  `]
})
export class DashboardComponent implements OnInit {
  constructor(public router: Router) {
  }

  public isCollapsed = false;
  public innerWidth: number = 0;
  public defaultSidebar: string = "";
  public showMobileMenu = false;
  public expandLogo = false;
  public subtitle = 'This is some text within a card block.'
  public sidebartype = "full";

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    console.log('je suis le dashboard component');
    // if (this.router.url === "/") {
    //   this.router.navigate(["/dashboard"]);
    // }
    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.sidebartype = "full";
    } else {
      this.sidebartype = this.defaultSidebar;
    }
  }

  toggleSidebarType() {
    switch (this.sidebartype) {
      case "full":
        this.sidebartype = "mini-sidebar";
        break;

      case "mini-sidebar":
        this.sidebartype = "full";
        break;

      default:
    }
  }
}
