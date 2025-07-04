// src/app/property-form/property-form.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Property, PropertyType } from '../../core/models/property.model';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-property-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule],
  templateUrl: '../property-form/property-form.html',
  styleUrls: ['../property-form/property-form.scss'],
})
export class PropertyFormComponent {
  @Input() property: Partial<Property> = {};
  @Output() submitForm = new EventEmitter<Property>();

  propertyTypes = Object.values(PropertyType);

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.submitForm.emit(form.value as Property);
    }
  }
}
