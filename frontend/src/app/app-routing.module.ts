import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { EditBookComponent } from './edit-book/edit-book.component';

const routes: Routes = [
  {
    path:'',redirectTo:'add-book',pathMatch:'full'
  },
  {
    path:'books-list',component:BookListComponent
  },
  {
    path:'add-book',component:AddBookComponent
  },
  {
    path:'edit-book/:id',component:BookDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
