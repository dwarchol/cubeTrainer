import { Component } from '@angular/core';
import {CubeService} from "../cube.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-cube-data-viewer',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './cube-data-viewer.component.html',
  styleUrl: './cube-data-viewer.component.css'
})
export class CubeDataViewerComponent {
  constructor(protected cubeService: CubeService) {
  }
}
