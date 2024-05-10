import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/utils/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  subject: string = 'Tengo una pregunta';
  mail: string = 'Hola, me llamo User y quisiera saber...';

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    const name = this._authService.user.username;
    this.mail = this.mail.replace('User', name);
  }
}
