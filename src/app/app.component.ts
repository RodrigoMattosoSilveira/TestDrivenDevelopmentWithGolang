import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TestDrivenDevelopmentWithGolang';
   // version =  `0.3.2-rc.1`;

   public appVersion: string = '0.1';
   examples = [
     {
       name: 'Money Example Basic',
       icon: '',
       routeLink: 'moneyExampleBasic'
     },
   ];
}
