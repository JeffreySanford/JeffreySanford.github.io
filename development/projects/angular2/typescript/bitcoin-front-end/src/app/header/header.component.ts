import { Component } from '@angular/core';

@Component({
  selector: 'jeffrey-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = "Digital Currency Exchange";
  subtitle =  "By leveraging the usefulness of Angular 2 on the front-end and NodeJS we can create a create progressive, responsive and dynamic application for all devices.  The modular ability of Angular 2 specifically leads to clean code and test-driven development as a process instead of an after though.  Code can be viewed on Github.";
  constructor() { }

}
