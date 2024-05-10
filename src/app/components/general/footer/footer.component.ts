import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  /** Company Email */
  email: string = "Coreo@prueba.com";
  /** Company Telephone */
  number: string = "+55 555555";
}
