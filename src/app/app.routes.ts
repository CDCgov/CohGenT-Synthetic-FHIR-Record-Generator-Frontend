import { Routes } from '@angular/router';
import {LandingPage} from './shared/components/landing-page/landing-page';
import {
  CohortGenerationComponent
} from './features/cohort-generation/components/cohort-generation/cohort-generation.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage
  },
  {
    path: 'generate',
    component: CohortGenerationComponent
  },
  { // Do not add any paths below this point, this path MUST ALWAYS be the last path!
    path: '**', redirectTo: ''
  }
];
