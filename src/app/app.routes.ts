import { Routes } from '@angular/router';

import { HomeComponent } from './layouts/home/home.component';

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'lista', children: [
    {path: '', loadChildren: './lista/lista.module#ListaModule'}
  ]}
];
