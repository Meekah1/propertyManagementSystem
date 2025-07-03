import { Injectable } from '@angular/core';
import { Property, PropertyType } from '../models/property.model';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private readonly STORAGE_KEY = 'properties';

  getProperties(): Property[] {
    const propertiesJson = localStorage.getItem(this.STORAGE_KEY);
    return propertiesJson ? JSON.parse(propertiesJson) : [];
  }

  getProperty(id: number): Property | undefined {
    const properties = this.getProperties();
    return properties.find((p) => p.id === id);
  }

  addProperty(property: Omit<Property, 'id'>): Property {
    const properties = this.getProperties();
    const newProperty = {
      ...property,
      id: this.generateId(properties),
    };
    properties.push(newProperty);
    this.saveProperties(properties);
    return newProperty;
  }

  updateProperty(
    id: number,
    property: Partial<Property>
  ): Property | undefined {
    const properties = this.getProperties();
    const index = properties.findIndex((p) => p.id === id);
    if (index !== -1) {
      const updatedProperty = { ...properties[index], ...property };
      properties[index] = updatedProperty;
      this.saveProperties(properties);
      return updatedProperty;
    }
    return undefined;
  }

  deleteProperty(id: number): boolean {
    const properties = this.getProperties();
    const index = properties.findIndex((p) => p.id === id);
    if (index !== -1) {
      properties.splice(index, 1);
      this.saveProperties(properties);
      return true;
    }
    return false;
  }

  private saveProperties(properties: Property[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(properties));
  }

  private generateId(properties: Property[]): number {
    return properties.length > 0
      ? Math.max(...properties.map((p) => p.id)) + 1
      : 1;
  }

  // Add other methods from previous implementation...
  // Start with just getProperties() first, then add others one by one
}
