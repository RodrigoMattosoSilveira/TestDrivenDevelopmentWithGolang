import { AfterViewInit, Component, OnInit } from '@angular/core';

import { BasicMoneyExampleData } from '../utils/basic-money-example-data';
import { TddServerService } from '../utils/tdd-server.service';

@Component({
  selector: 'app-money-example-basic',
  templateUrl: './money-example-basic.component.html',
  styleUrls: ['./money-example-basic.component.scss']
})
export class MoneyExampleBasicComponent implements OnInit {
   title: string = 'BasicMoneyExampleData';
   basicMoneyExampleData: BasicMoneyExampleData;
   displayedColumns: string[] = ['underwriter', 'quantity', 'price', 'total'];

  constructor(private testDrivenDevelopmentServerService: TddServerService) { }

  ngOnInit() {
     this.basicMoneyExampleData = this.testDrivenDevelopmentServerService.getBasicMoneyExampleData();
     console.log("MoneyExampleBasicComponent/basicMoneyExampleData: " + JSON.stringify(this.basicMoneyExampleData))
  }

  ngAfterViewInit() {
     // Was getting ExpressionChangedAfterItHasBeenCheckedError errors
     // Read this: https://hackernoon.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
     // Move it to ngOnInit
     // this.basicMoneyExampleData = this.testDrivenDevelopmentServerService.getBasicMoneyExampleData();
     // console.log("MoneyExampleBasicComponent/basicMoneyExampleData: " + JSON.stringify(this.basicMoneyExampleData))
  }
}
