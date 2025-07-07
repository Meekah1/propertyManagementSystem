import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  enquiryName = '';
  enquiryEmail = '';
  enquiryMessage = '';
  isSubmitting = false;
  submitSuccess = false;

  constructor(private http: HttpClient) {}

  submitEnquiry() {
    this.isSubmitting = true;

    const enquiry = {
      name: this.enquiryName,
      email: this.enquiryEmail,
      message: this.enquiryMessage,
    };

    // Replace with your API endpoint
    this.http.post('https://your-api.com/enquiries', enquiry).subscribe({
      next: () => {
        this.submitSuccess = true;
        this.isSubmitting = false;
        setTimeout(() => (this.submitSuccess = false), 3000);
        this.resetForm();
      },
      error: () => {
        this.isSubmitting = false;
      },
    });
  }

  resetForm() {
    this.enquiryName = '';
    this.enquiryEmail = '';
    this.enquiryMessage = '';
  }
}
