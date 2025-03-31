import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-menu-btn',
  standalone: true,
  imports: [],
  templateUrl: './menu-btn.component.html',
  styleUrl: './menu-btn.component.css'
})
export class MenuBtnComponent {
  @Input() text: string;
  @Input() imageName: string;
}
