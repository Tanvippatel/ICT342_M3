import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../services/backend-service.service';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-from',
  templateUrl: './contact-from.component.html',
  styleUrls: ['./contact-from.component.css']
})
export class ContactFromComponent implements OnInit {

  form: FormGroup;
  editForm: boolean = true;
  editField: boolean[] = [];
  isRequired: boolean = true;
  baseUrl: string;

  options = [{ id: 1, name: 'Name', type: 'name' }, { id: 2, name: 'Email', type: 'email' }, { id: 3, name: 'Radio', type: 'radio' }, { id: 4, name: 'Phone', type: 'phone' }, { id: 5, name: 'Textarea', type: 'textarea' }]

  constructor(private BS: BackendServiceService,
    private fb: FormBuilder,
    private router: Router) {
    this.form = this.fb.group({
      select: [null],
      formName: [null, Validators.required],
      inputFields: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.baseUrl = window.location.origin;
    const data = JSON.parse(localStorage.getItem('form'))
    if (data) {
      data.map(key => {
        this.addInputField(key['type'], key['label'])
      })
    }
  }

  inputFields(): FormArray {
    return this.form.get("inputFields") as FormArray
  }

  newInputTextBox(label: string = 'Name'): FormGroup {
    return this.fb.group({
      type: 'name',
      label: label,
      value: null,
      required: false,
    })
  }

  newInputEmail(label: string = 'Email'): FormGroup {
    return this.fb.group({
      type: 'email',
      label: label,
      value: [null, [Validators.email]],
      required: true,
    })
  }

  newInputRadio(label: string = 'Radio'): FormGroup {
    return this.fb.group({
      type: 'radio',
      label: label,
      value: null,
      required: false
    })
  }

  newInputPhone(label: string = 'Phone Number'): FormGroup {
    return this.fb.group({
      type: 'phone',
      label: label,
      value: null,
      required: false
    })
  }

  newTextarea(label: string = 'Textarea'): FormGroup {
    return this.fb.group({
      type: 'textarea',
      label: label,
      value: null,
      required: false
    })
  }

  addInputField(field: string, label: string) {
    switch (field) {
      case 'name':
        this.inputFields().push(this.newInputTextBox(label))
        break;
      case 'email':
        this.inputFields().push(this.newInputEmail(label))
        break;
      case 'radio':
        this.inputFields().push(this.newInputRadio(label));
        break;
      case 'phone':
        this.inputFields().push(this.newInputPhone(label));
        break;
      case 'textarea':
        this.inputFields().push(this.newTextarea(label));
        break;
    }
    this.form.get('inputFields').markAsPristine();
    this.form.updateValueAndValidity();

    setTimeout(() => {
      this.form.get('select').setValue(null);
    })
  }

  removeField(i: number) {
    this.inputFields().removeAt(i);
  }

  setRequired(i: number, value: boolean, field: string) {

    if (value) {
      this.inputFields().controls[i]['controls'].value.setValidators(Validators.required);
      this.inputFields().controls[i]['controls'].value.updateValueAndValidity();
    }
    else {
      this.inputFields().controls[i]['controls'].value.setValidators(null);
      this.inputFields().controls[i]['controls'].value.updateValueAndValidity();
    }

    this.form.markAsPristine();
    this.form.updateValueAndValidity();
  }

  createForm() {
    // this.form.get('inputFields').markAsPristine();
    // this.form.updateValueAndValidity();
    localStorage.setItem('form-' + (this.form.get('formName').value).toLowerCase(), JSON.stringify(this.form.get('inputFields').value));
    alert('Form created');
    this.router.navigate([`/form/${(this.form.get('formName').value).toLowerCase()}`])
  }

}
