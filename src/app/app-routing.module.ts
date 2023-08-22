import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { PhotoPageComponent } from './pages/photo-page/photo-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'favorites',
    component: FavoritesPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'photos/:id',
    component: PhotoPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
