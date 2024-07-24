import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from '../Models/contact.model';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  http = inject(HttpClient);

  contactsForm = new FormGroup({
    name: new FormControl<string>(''),
    email: new FormControl<string | null>(null),
    phone: new FormControl<string>(''),
    favorite: new FormControl<boolean>(false)
  })

  contacts$ = this.getContacts();

  //Create
  onFromSubmit(){
    const addContactRequest = {
      name: this.contactsForm.value.name,
      email: this.contactsForm.value.email,
      phone: this.contactsForm.value.phone,
      favorite: this.contactsForm.value.favorite
    }

    this.http.post('https://localhost:7244/api/Contacts/PostContact', addContactRequest).subscribe({
      next: (value) => {
        console.log(value);
        this.contacts$ = this.getContacts();
        this.contactsForm.reset();
      }
    });
  }

  //Delete
  onDelete(id: string){
    this.http.delete(`https://localhost:7244/api/Contacts/DeleteContact?id=${id}`).subscribe({
      next: (value) => {
        alert('Item deleted')
        this.contacts$ = this.getContacts();
      }
    })
  }

  /*//Edit
  onEdit(id: string){
    this.http.put(`https://localhost:7244/api/Contacts/PutContact?id=${id}`, this.contactsForm).subscribe({
      next: (value) => {
        alert('Item updated')
        this.contacts$ = this.getContacts();
      }
    })
  }*/

 
  private getContacts():Observable<Contact[]>{
    return this.http.get<Contact[]>('https://localhost:7244/api/Contacts/GetContact');
  }
}

