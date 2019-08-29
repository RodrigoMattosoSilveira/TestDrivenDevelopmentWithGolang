import { AfterViewInit, Component, OnInit } from '@angular/core';

import { BasicMoneyExampleData } from '../utils/basic-money-example-data';
import { TddServerService } from '../utils/tdd-server.service';

@Component({
  selector: 'app-money-example-basic',
  templateUrl: './money-example-basic.component.html',
  styleUrls: ['./money-example-basic.component.scss']
})
export class MoneyExampleBasicComponent implements OnInit {
   title: string;
   basicMoneyExampleData: BasicMoneyExampleData = {
      "title": "",
      "assets": [],
      "total": 0
   };
   displayedColumns: string[] = ['underwriter', 'quantity', 'price', 'total'];

  constructor(private tddServerService: TddServerService) { }

  ngOnInit() {
      this.tddServerService.getMoneyExampleBasic().subscribe(
         // (results: string) => this.title = results, // success path
         // error =>  this.title = "Unable to retrieve title" // error path
         results =>{
            console.log("MoneyExampleBasicComponent/basicMoneyExampleData: " + JSON.stringify(results));
            this.basicMoneyExampleData.title = results["title"];
            this.basicMoneyExampleData.assets = results["assets"];
            this.basicMoneyExampleData.total = results["total"];
         }
      );
  }

  ngAfterViewInit() {
  }
}
