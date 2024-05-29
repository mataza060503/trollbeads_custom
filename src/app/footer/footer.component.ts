import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  isRegister: boolean = false
  isOpen: boolean[] = []

  constructor() {
    for (let i = 0; i < 3; i++) {
      this.isOpen.push(false)
    }
  }

  openDropdown(index: number) {
    this.isOpen[index] = !this.isOpen[index]
  }

  onEmailInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.isRegister = inputElement.value.trim().length > 0;
  }

  
}
