import { Injectable } from '@angular/core';

import { BasicMoneyExampleAsset } from './basic-money-example-asset';
import { BasicMoneyExampleData } from './basic-money-example-data';

@Injectable({
  providedIn: 'root'
})
export class TestDrivenDevelopmentServerService {

   constructor() { }

   getBasicMoneyExampleData(): BasicMoneyExampleData {
      // This will be replaced by a server call
      let ibmAsset: BasicMoneyExampleAsset = {
         "underwriter": "IBM",
         "quantity": 1000,
         "price": 25,
         "total": 1000*25
      }
      let geAsset: BasicMoneyExampleAsset = {
         "underwriter": "GE",
         "quantity": 400,
         "price": 100,
         "total": 400*100
      }
      let assets: Array<BasicMoneyExampleAsset> = [];
      assets.push(ibmAsset);
      assets.push(geAsset);
      let basicMoneyExampleData: BasicMoneyExampleData = {
         "assets": assets,
         "total": 65000
      }
      return basicMoneyExampleData;
   }
}
