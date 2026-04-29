import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './pages/about/about.component';
import { RubricsComponent } from './pages/rubrics/rubrics.component';
import { RubricDetailComponent } from './pages/rubric-detail/rubric-detail.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { MerchComponent } from './pages/merch/merch.component';
import { ContactsComponent } from './pages/contacts/contacts.component';

export const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: 'about', component: AboutComponent },
  { path: 'rubrics', component: RubricsComponent },
  { path: 'rubrics/:slug', component: RubricDetailComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'merch', component: MerchComponent },
  { path: 'contacts', component: ContactsComponent },
];
