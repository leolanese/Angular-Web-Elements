import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import formConfig from './../../assets/form-config.json';
import { ApiService } from './../services/api.service';
import { HttpClientModule } from '@angular/common/http';

interface FormField {
  username: string;
  type: string;
  validations?: string[];
  errorMessage: string;
}

@Component({
  selector: 'app-dynamic-form',
  providers: [
    ApiService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './dynamic-form.component.html',
  styles: [],
  standalone: true,
})
export class DynamicFormComponent implements OnInit {
  fields: FormField[] = [];
  formGroup!: FormGroup;
  successResponse: any;
  errorResponse: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.fields = formConfig.fields;
    this.formGroup = this.formBuilder.group({});
    this.setupFormControls();

    // Catch and log any errors emitted by the service
    this.apiService.error$.subscribe(error => {
      if (error) {
        console.error('We have an error: ', error);
      }
    });
  }

  private setupFormControls() {
    for (const field of this.fields) {
      this.formGroup.addControl(
        field.username,
        this.formBuilder.control('', this.getValidators(field.validations))
      );
    }
  }

  private getValidators(validations: string[] = []) {
    const validators = [];

    if (validations.includes('required')) {
      validators.push(Validators.required);
    }
    if (validations.includes('password')) {
      validators.push(Validators.email);
    }
    if (validations.includes('minLength3')) {
      validators.push(Validators.minLength(3));
    }
    
    return validators;
  }

  onSubmit() {
    const { username, password } = this.formGroup.value;
  
    if (this.formGroup.valid) {
        console.log(this.formGroup.value);

        this.apiService.login(username, password).subscribe(
            response => {
                console.table(response);
                this.successResponse = response;  // Set the response

                // Log the sessionId + store it in localStorage
                const sessionId = response.sessionId;
                console.log('Received session id:', sessionId);
                localStorage.setItem('sessionId', sessionId);
            },
            (error: any) => {
              console.error(error);
              this.errorResponse = error;  // Set the error
            },
        );
    } else {
        // handle invalid form submission
        console.error('Invalid submission');
    }
  }

}