import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  constructor(private http: Http) { }

  submitContactUs(ContactForm : any):Observable<any>
  {
    console.log(ContactForm);
    return this.http.post('http://localhost:3001/addContact',ContactForm);
  }


}
