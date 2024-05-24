import { Component, TemplateRef, inject } from '@angular/core';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faHeart = faHeart;
  faUser = faUser;
  faSearch = faSearch;
  faShoppingBag = faShoppingBag;
  count: number = 0

  isSubOpen: boolean[][] = []
  isOpen: boolean[] = []

  private offcanvasService = inject(NgbOffcanvas);

  constructor() {
    for (let i = 0; i < 3; i++) {
      this.isOpen.push(false)
      this.isSubOpen.push([])
      for (let j = 0; j < 10; j++) {
        this.isSubOpen[i].push(false)
      }
    }
    
  }

  openDropDown(index: number) {
    this.isOpen[index] = !this.isOpen[index]
    // this.updateDropDownAnimations();
  }

  openSubDropDown(itemIndex: number, subIndex: number) {
    this.isSubOpen[itemIndex][subIndex] = !this.isSubOpen[itemIndex][subIndex]
    // this.updateDropDownAnimations();
  }

  openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
	}

  openTop(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'top' });
	}

  // updateDropDownAnimations() {
  //   setTimeout(() => {
  //     document.querySelectorAll('.my-offcanvas-body-item-dropdown').forEach((dropdown) => {
  //       const dropdownElement = dropdown as HTMLElement;
  //       const isOpen = dropdownElement.classList.contains('open');
  //       if (isOpen) {
  //         dropdownElement.style.height = dropdownElement.scrollHeight + 'px'; 
  //       } else {
  //         dropdownElement.style.height = '0';
  //       }
  //     });
  
  //     document.querySelectorAll('.my-offcanvas-body-item-dropdown-sub').forEach((subDropdown) => {
  //       const subDropdownElement = subDropdown as HTMLElement;
  //       const isOpen = subDropdownElement.classList.contains('open');
  //       if (isOpen) {
  //         subDropdownElement.style.height = subDropdownElement.scrollHeight + 'px'; 
  //       } else {
  //         subDropdownElement.style.height = '0';
  //       }
  //     });
  //   }, 0);
  // }
}
