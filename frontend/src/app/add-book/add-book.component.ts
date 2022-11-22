import { Component, OnInit,NgZone} from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  bookForm!: FormGroup;

  constructor(private fb: FormBuilder,private router:Router, private crudApi:CrudService,private ngZone:NgZone) {
    this.bookForm= this.fb.group({
      name:[''],
      price:[''],
      description:['']
    })
   }

  ngOnInit(): void {
   
  }

  addBook():any{
    console.log(this.bookForm.value,'this.addbook.value')
    this.crudApi.addBook(this.bookForm.value).subscribe((res:any)=>{
      console.log('Data added successfully');
      this.ngZone.run(()=>{
        this.router.navigateByUrl('books-list');
      },(err: any)=>{
        console.log(err)
      })
    })
  }

}
