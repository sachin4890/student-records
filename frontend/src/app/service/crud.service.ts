import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map, Observable, throwError} from 'rxjs';
import {Book} from './book'

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // nodejs API
  REST_API:string="http://localhost:8000/api";
  httpHeaders= new HttpHeaders().set("Content-Type",'application/json')

  constructor(private httpClient:HttpClient) { }

  // add records

  AddBook(data:Book):Observable<any>{
    let API_URL= `${this.REST_API}/add-book`;
    return this.httpClient.post(API_URL,data).pipe(catchError(this.handleError))
  }

  // get all record

 getBooks(){
  return this.httpClient.get(`${this.REST_API}/`);
 }

//  get single Book

getBook(id:any):Observable<any>{
  let API_URL = `${this.REST_API}/read-book/${id}`;
  return this.httpClient.get(API_URL,{headers:this.httpHeaders}).pipe(map((res:any)=>{
    return res || {}
  }),
  catchError(this.handleError)
  )
}
//  update Book
updateBook(id:any,data:any):Observable<any>{
  let API_URL = `${this.REST_API}/update-book/${id}`;
  return this.httpClient.put(API_URL,{headers:this.httpHeaders}).pipe(
    catchError(this.handleError)
  )
}

deleteBook(id:any):Observable<any>{
  let API_URL = `${this.REST_API}/delete-book/${id}`;
  return this.httpClient.delete(API_URL,{headers:this.httpHeaders}).pipe(
    catchError(this.handleError)
  )
}

// handle error
handleError(error:HttpErrorResponse){
  let errorMessage='';
  if(error.error instanceof ErrorEvent){
    errorMessage= error.error.message;
  }else{
    errorMessage= `Error code:${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage)
}


}
