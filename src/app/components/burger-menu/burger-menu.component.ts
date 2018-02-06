import { Component, OnInit } from '@angular/core';
import { SharedVariablesService } from "../../services/shared-variables.service";

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss']
})
export class BurgerMenuComponent implements OnInit {

  constructor(private sharedVariables: SharedVariablesService) { }

  ngOnInit() {
  }

}
