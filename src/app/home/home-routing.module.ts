import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth-gaurd/auth-gaurd.service';
import { FeedsComponent } from './feeds/feeds.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: 'feeds',
    pathMatch: 'full',
  },
  {
    path: 'feeds',
    component: FeedsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
