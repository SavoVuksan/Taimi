import { Component, OnInit, Input } from '@angular/core';
import { Program } from '../../interfaces/program';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input()
  listElements: Program[];
  selectedElement: Program;

  constructor() { }

  ngOnInit() {

  }
  deleteListElement(element: Program){
    console.log(this.listElements);
    const index = this.listElements.indexOf(element, 0);
    this.listElements.splice(index, 1);
  }
  setSelected(element: Program){
    this.selectedElement = element;
  }
  addListElement(element: Program){
    this.listElements.push(element);
  }
}
