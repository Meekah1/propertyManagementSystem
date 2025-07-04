// src/app/property-edit/property-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PropertyService } from '../../core/services/property.services';
import { PropertyFormComponent } from '../property-form/property-form';
import { Property } from '../../core/models/property.model';

@Component({
  selector: 'app-property-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    PropertyFormComponent,
  ],
  templateUrl: '../property-edit/property-edit.html',
  styleUrls: ['../property-edit/property-edit.scss'],
})
export class PropertyEditComponent implements OnInit {
  property!: Property;
  isEditMode = false;

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      const property = this.propertyService.getProperty(+id);
      if (property) {
        this.property = { ...property };
      } else {
        this.router.navigate(['/properties']);
      }
    }
  }

  onSubmit(property: Property): void {
    if (this.isEditMode) {
      this.propertyService.updateProperty(this.property.id, property);
    } else {
      this.propertyService.addProperty(property);
    }
    this.router.navigate(['/properties']);
  }
}
