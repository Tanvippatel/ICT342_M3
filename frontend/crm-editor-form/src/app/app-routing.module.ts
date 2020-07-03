import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactFromComponent } from './contact-from/contact-from.component';
import { FormViewComponent } from './form-view/form-view.component';


const routes: Routes = [
  {
    path:'',
    component: ContactFromComponent
  },
  {
    path: 'form/:id',
    component: FormViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
