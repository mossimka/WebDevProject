import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../product';
import { ShopItemsComponent } from '../shop-items/shop-items.component';
import { MusicsService } from '../musics.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-content',
  imports: [ShopItemsComponent, CommonModule, FormsModule],
  templateUrl: './content.component.html',
  styleUrl: `./content.component.css`,
})
export class ContentComponent {
  productsList: Product[] = [];
  musicService: MusicsService = inject(MusicsService);
  filteredProductsList: Product[] = [];
  filter: string;
  categories: string[] = [];
  selectedCategories: string[] = [];

  constructor() {
    this.musicService.getAllProducts().then((productsList: Product[]) => {
      this.productsList = productsList;
      this.filteredProductsList = productsList;
    });
    this.filter = '';
    this.musicService.getAllCategories().then(cats => {
      this.categories = cats;
      console.log(this.categories);
    });
  }

  filterResults(text:string) {
    if (!text) {
      this.applyFilters();
      return;
    }

    this.filteredProductsList = this.productsList.filter(product =>
      product?.name.toLowerCase().includes(text.toLowerCase())
    );
    this.applyCategoryFilter();
  }
  toggleCategory(category: string) {//switching category
    const index = this.selectedCategories.indexOf(category);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(category);
    }
    this.applyFilters();
  }
  private applyFilters() {
    let filtered = this.productsList;

    if (this.filter) {
      filtered = filtered.filter(product =>
        product?.name.toLowerCase().includes(this.filter.toLowerCase())
      );
    }

    if (this.selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        this.selectedCategories.includes(product.type)
      );
    }
    this.filteredProductsList = filtered;
  }
  private applyCategoryFilter() {
    if (this.selectedCategories.length === 0) {
      return;
    }
    this.filteredProductsList = this.filteredProductsList.filter(product =>
      this.selectedCategories.includes(product.type)
    );
  }
  onProductRemoved(productId: Number) {
    const productIndex = this.productsList.findIndex(p => p.id === productId);
    if (productIndex > -1) {
      this.productsList.splice(productIndex, 1);
    }
    const filteredIndex = this.filteredProductsList.findIndex(p => p.id === productId);
    if (filteredIndex > -1) {
      this.filteredProductsList.splice(filteredIndex, 1);
    }
  }
}

