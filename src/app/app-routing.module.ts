import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { SectionsComponent } from './components/pages/sections/sections.component';
import { DocumentationComponent } from './components/pages/documentation/documentation.component';
import { RegisterComponent } from './components/pages/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'section/:id-sec', component: SectionsComponent },
  { path: 'doc/:id-doc', component: DocumentationComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
