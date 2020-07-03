import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../services/backend-service.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {

  form: FormGroup;
  formName: string;

  constructor(private BS: BackendServiceService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.form = this.fb.group({
      inputFields: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.formName = this.activatedRoute.snapshot.paramMap.get('id').toLowerCase();

    const data = JSON.parse(localStorage.getItem('form-' + this.formName))
    if (data) {
      data.map((key, i) => {
        this.addInputField(key['type'], key['label'], key['required'])
        if ( key['required']) {
          this.inputFields().controls[i]['controls'].value.setValidators(Validators.required);
          this.inputFields().controls[i]['controls'].value.updateValueAndValidity();
        }

        if(key['required'] && key['type'] == 'email') {
          this.inputFields().controls[i]['controls'].value.setValidators([Validators.required, Validators.email]);
          this.inputFields().controls[i]['controls'].value.updateValueAndValidity();
        }
      })
      this.form.markAsPristine();
    this.form.updateValueAndValidity();
    } else {
      this.router.navigate(['/']);
    }
  }

  inputFields(): FormArray {
    return this.form.get("inputFields") as FormArray
  }

  newInputTextBox(label: string = 'Name', required: boolean = false): FormGroup {
    return this.fb.group({
      type: 'name',
      label: label,
      value: null,
      required: required
    })
  }

  newInputEmail(label: string = 'Email', required: boolean = true): FormGroup {
    return this.fb.group({
      type: 'email',
      label: label,
      value: [null, [Validators.email]],
      required: required
    })
  }

  newInputRadio(label: string = 'Radio', required: boolean = false): FormGroup {
    return this.fb.group({
      type: 'radio',
      label: label,
      value: null,
      required: required
    })
  }

  newInputPhone(label: string = 'Phone Number', required: boolean = false): FormGroup {
    return this.fb.group({
      type: 'phone',
      label: label,
      value: null,
      required: required
    })
  }

  newTextarea(label: string = 'Textarea', required: boolean = false): FormGroup {
    return this.fb.group({
      type: 'textarea',
      label: label,
      value: null,
      required: required
    })
  }

  addInputField(field: string, label: string, required: boolean) {
    switch (field) {
      case 'name':
        this.inputFields().push(this.newInputTextBox(label, required))
        break;
      case 'email':
        this.inputFields().push(this.newInputEmail(label, required))
        break;
      case 'radio':
        this.inputFields().push(this.newInputRadio(label, required));
        break;
      case 'phone':
        this.inputFields().push(this.newInputPhone(label, required));
        break;
      case 'textarea':
        this.inputFields().push(this.newTextarea(label, required));
        break;
    }
    this.form.get('inputFields').markAsPristine();
    this.form.updateValueAndValidity();
  }


  getErrorMessage(field) {
    console.log(field)
    let str: string = null
    if (field.errors && field.errors.required) {
      str = 'Field is required';
      return str;
    }
    else {
      (field.errors && (field.errors.email || field.errors.mask))
      str = 'Field is invalid';
      return str;
    }

  }

  onSubmit() {
    let data = null;
    
    if (!this.form.get('inputFields').valid) {
      alert('Please fill the blank filed(s)');
    } else {

      data = {formName: this.formName}

      this.form.get('inputFields').value.some(val => {
          data = { ...data, [val.label]: val.value }
      })

      this.BS.submitContactUs(data).subscribe(
        (res) => {
          if (res.status === 200) {
            alert("successfully submitted");
            window.location.reload();
          }
        },
        error => alert(error)
      );
    }

  }

}
