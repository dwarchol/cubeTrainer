import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {MenuBtnComponent} from "./menu-btn/menu-btn.component";
import {StatsSpaceComponent} from "./stats-space/stats-space.component";
import {CubeDataViewerComponent} from "./cube-data-viewer/cube-data-viewer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, MenuBtnComponent, StatsSpaceComponent, CubeDataViewerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cubeTrainer';
}
