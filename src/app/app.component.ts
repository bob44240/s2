import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 's2';

  onKey(event: any) {
    console.log("FRED");
  }
  onKeyUp() {
    console.log("FRED");
  }
  keypress() {
    console.log("FRED");
  }
}
//Try this 
