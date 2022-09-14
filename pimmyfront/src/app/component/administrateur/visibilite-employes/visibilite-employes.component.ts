import { Component, OnInit } from '@angular/core';
import { GanttItem, } from '@worktile/gantt';

@Component({
  selector: 'app-visibilite-employes',
  templateUrl: './visibilite-employes.component.html',
  styleUrls: ['./visibilite-employes.component.scss']
})
export class VisibiliteEmployesComponent {

  // Laisser la dernière ligne de vide 
  items: GanttItem[] = [
    { id: '000000', title: 'Task 0', start: 1627729997, end: 1628421197 },
    { id: '000001', title: 'Task 1', start: 1617361997, end: 1625483597 },
    { id: '000002', title: 'Task 1', start: 1617361997, end: 1625483597 },
    { id: '000003', title: 'Task 1', start: 1617361997, end: 1625483597 },
    { id: '000004', title: 'Task 1', start: 1617361997, end: 1625483597 },
    { id: '000005', title: 'Task 1', start: 1617361997, end: 1625483597 },
    { id: '000006', title: '', start: 1617361997, end: 1625483597 },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}