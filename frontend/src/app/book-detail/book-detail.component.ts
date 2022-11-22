import { Component, OnInit,NgZone} from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  editBookForm!: FormGroup;
  getId:any;
  constructor(private fb: FormBuilder,private router:Router, private crudApi:CrudService,private ngZone:NgZone,private activeRoute:ActivatedRoute) {
    this.getId= this.activeRoute.snapshot.paramMap.get('id');
    this.crudApi.getBook(this.getId).subscribe(res=>{
      this.editBookForm.setValue({
        name:res['name'],
        price:res['price'],
        description:res['description']
      })
    })
    this.editBookForm= this.fb.group({
      name:[''],
      price:[''],
      description:['']
    })
   }

  ngOnInit(): void {
  }

  editBook(){
    this.crudApi.updateBook(this.getId,this.editBookForm.value).subscribe(res=>{
      console.log("data updated successfully")
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/books-list')
      },(err:any)=>{
        console.log(err)
      })
    })
  }

}
