import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeoutError } from 'rxjs/util/TimeoutError';
import { google_recaptcha } from '../../environments/environment';
import { ContactRequestService } from '../contact-request/contact-request.service';
import { WindowService } from '../window.service';
import { ContactRequest } from '../contact-request/contact-request';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  locale = 'en';
  createContactRequestForm: FormGroup;
  contactRequest: ContactRequest;
  formErrors = [];
  dataInvalid = false;
  contactRequestCreateSuccess = false;
  formSubmitting = false;
  site_key = google_recaptcha.site_key;
  g_recaptcha_response = '';

  constructor((
    private contactRequestService: ContactRequestService,
    public windowService: WindowService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if(this.windowService.getWindowLoaded() === null) {
      this.windowService.setWindowLoaded(false);
    }

    // Create form
    this.createContactRequestForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  get email() {
    return this.createContactRequestForm.get('email');
  }

  get message() {
    return this.createContactRequestForm.get('message');
  }

  get name() {
    return this.createContactRequestForm.get('name');
  }

  get phone() {
    return this.createContactRequestForm.get('phone');
  }

  reCaptchaResolved(captchaResponse: string) {
    this.g_recaptcha_response = captchaResponse;
  }

  storeContactRequest() {
    this.formErrors = [];
    this.formSubmitting = true;
    this.contactRequestCreateSuccess = false;
    let data = this.createContactRequestForm.value;
    console.log(data);
    data.g_recaptcha_response = this.g_recaptcha_response;
    this.contactRequestService.store(data).subscribe(res => {
      this.formSubmitting = false;
      this.createContactRequestForm.reset();
      this.dataInvalid = false;
      this.formErrors = [];
      this.contactRequestCreateSuccess = true;

    }, (err: HttpErrorResponse) => {
      this.formSubmitting = false;
      this.dataInvalid = true;
      if(err instanceof TimeoutError) {
        // A timeout error occurred. Handle it accordingly.
        this.formErrors.push(err.message);

      } else if(err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        this.formErrors.push(err.error.message);

      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        if (err.status === 0 || err.status === 500) {
          this.formErrors.push('Internal Server Error.');
        } else {

          // Get errors from proper format
          let errors = [];
          if(typeof err.error === 'string') {
            try {
              errors = JSON.parse(err.error).errors;

            } catch(exception) {
              console.log(exception);
              this.formErrors.push('Internal Server Error.');
            }

          } else if(typeof err.error === 'object') {
            errors = err.error.errors;
          }

          for (let property_errors of errors) {
            for(let msg of property_errors) {
              this.formErrors.push(msg);
            }
          }
        }
      }
    });
  }
}
