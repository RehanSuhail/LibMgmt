import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login';
import { AdminComponent } from './components/admin/admin';
import { LibraryComponent } from './components/library/library';
import { BookComponent } from './components/book/book';
import { ErrorComponent } from './components/error/error';
import { HomeComponent } from './components/home/home';
import { AddLibraryComponent } from './components/add-library/add-library';
import { EditLibraryComponent } from './components/edit-library/edit-library';
import { DeleteLibraryComponent } from './components/delete-library/delete-library';
import { AuthGuard } from './guards/auth-guard';
import { AddBookComponent } from './components/add-book/add-book';
import { EditBookComponent } from './components/edit-book/edit-book';
import { DeleteBookComponent } from './components/delete-book/delete-book';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },

  { path: 'libraries', component: LibraryComponent, canActivate: [AuthGuard] },
  { path: 'libraries/add', component: AddLibraryComponent, canActivate: [AuthGuard] },
  { path: 'libraries/edit/:id', component: EditLibraryComponent, canActivate: [AuthGuard] },
  { path: 'libraries/delete/:id', component: DeleteLibraryComponent, canActivate: [AuthGuard] },

  { path: 'books', component: BookComponent, canActivate: [AuthGuard] },
  { path: 'books/add', component: AddBookComponent, canActivate: [AuthGuard] },
  { path: 'books/edit/:id', component: EditBookComponent, canActivate: [AuthGuard] },
  { path: 'books/delete/:id', component: DeleteBookComponent, canActivate: [AuthGuard] },

  { path: '**', component: ErrorComponent }
];

