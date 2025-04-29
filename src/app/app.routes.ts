import { Routes } from '@angular/router';
import {SettingsComponent} from "./settings/settings.component";
import {AlgsWaveComponent} from "./algs-wave/algs-wave.component";
import {ShowSolutionModeComponent} from "./training_modes/show-solution-mode/show-solution-mode.component";

export const routes: Routes = [
  {path: 'settings', component: SettingsComponent},
  {path: 'wave', component: AlgsWaveComponent},
  {path: 'showSolution', component: ShowSolutionModeComponent},
];
