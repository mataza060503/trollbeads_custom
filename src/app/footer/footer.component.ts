import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  isRegister: boolean = false

  onEmailInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.isRegister = inputElement.value.trim().length > 0;
  }
}
