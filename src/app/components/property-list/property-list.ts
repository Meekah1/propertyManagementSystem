// src/app/property-list/property-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Property, PropertyType } from '../../core/models/property.model';
import { PropertyService } from '../../core/services/property.services';
import { AuthService } from '../../core/services/auth.service';
// import { PropertyFormComponent } from '../property-form/property-form';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgbModule],
  templateUrl: '../property-list/property-list.html',
  styleUrls: ['../property-list/property-list.scss'],
})
export class PropertyListComponent implements OnInit {
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  isAdmin = false;

  // Pagination
  currentPage = 1;
  itemsPerPage = 6;
  totalItems = 0;

  // Filtering
  searchTerm = '';
  selectedType: PropertyType | 'all' = 'all';
  propertyTypes = Object.values(PropertyType);

  // Sorting
  sortField = 'price';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private propertyService: PropertyService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadProperties();
  }

  loadProperties(): void {
    this.properties = this.propertyService.getProperties();
    this.applyFilters();
  }

  applyFilters(): void {
    let result = this.properties;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.location.toLowerCase().includes(term)
      );
    }

    if (this.selectedType !== 'all') {
      result = result.filter((p) => p.type === this.selectedType);
    }

    result = this.sortProperties(result);

    this.filteredProperties = result;
    this.totalItems = result.length;
    this.currentPage = 1;
  }

  sortProperties(properties: Property[]): Property[] {
    return [...properties].sort((a, b) => {
      let comparison = 0;

      if (this.sortField === 'price') {
        comparison = a.price - b.price;
      } else if (this.sortField === 'location') {
        comparison = a.location.localeCompare(b.location);
      } else if (this.sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  onSort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  get paginatedProperties(): Property[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProperties.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  deleteProperty(id: number): void {
    if (confirm('Are you sure you want to delete this property?')) {
      this.propertyService.deleteProperty(id);
      this.loadProperties();
    }
  }

  exportToCsv(): void {
    const headers = [
      'ID',
      'Name',
      'Location',
      'Type',
      'Price',
      'Bedrooms',
      'Bathrooms',
      'Area',
    ];
    const rows = this.filteredProperties.map((p) => [
      p.id,
      p.name,
      p.location,
      p.type,
      p.price,
      p.bedrooms,
      p.bathrooms,
      p.area,
    ]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach((row) => {
      csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'properties.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
