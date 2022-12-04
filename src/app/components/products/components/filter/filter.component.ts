import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BRANDS, OptionsModel } from './interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  constructor() {}

  @Input() brands!: string[] | null;
  @Input() categories!: string[] | null;
  filterForm!: FormGroup;
  brandsOptions: OptionsModel[] = [];
  categoryOptions: OptionsModel[] = [];
  errorMessage: string | undefined = undefined;

  ngOnInit() {
    this.initializeCheckboxes();
    this.filterForm = new FormGroup({
      selectedBrands: new FormArray([]),
      selectedCategories: new FormArray([]),
      search: new FormControl(''),
      minPrice: new FormControl(0),
      maxPrice: new FormControl(0),
      rating: new FormControl(0),
    });
  }

  initializeCheckboxes() {
    if (this.brands) {
      this.brands.forEach((brand) =>
        this.brandsOptions.push({ value: brand, selected: false, __typename: 'Brands' })
      );
    }
    if (this.categories) {
      this.categories.forEach((category) =>
        this.categoryOptions.push({ value: category, selected: false, __typename: 'Categories' })
      );
    }
  }

  resetCheckboxes() {
    this.brandsOptions.forEach((option) => (option.selected = false));
    this.categoryOptions.forEach((option) => (option.selected = false));
    this.selectedBrands.clear();
    this.selectedCategories.clear();
  }

  get selectedBrands() {
    return this.filterForm.get('selectedBrands') as FormArray;
  }
  get selectedCategories() {
    return this.filterForm.get('selectedCategories') as FormArray;
  }
  get search() {
    return this.filterForm.get('search');
  }
  get minPrice() {
    return this.filterForm.get('minPrice');
  }
  get maxPrice() {
    return this.filterForm.get('maxPrice');
  }
  get rating() {
    return this.filterForm.get('rating');
  }

  onCheckboxChange(event: Event, type: string) {
    const target = event.target as HTMLInputElement;
    let selected: FormArray;
    let toChange: OptionsModel[];
    if (type === BRANDS) {
      selected = this.selectedBrands;
      toChange = this.brandsOptions;
    } else {
      selected = this.selectedCategories;
      toChange = this.categoryOptions;
    }
    toChange.forEach((option) => {
      if (option.value === target.value) {
        option.selected = target.checked;
      }
    });
    if (target.checked) {
      selected.push(new FormControl(target.value));
    } else {
      const index = selected.controls.findIndex((x) => x.value === target.value);
      toChange[index].selected = target.checked;
      selected.removeAt(index);
    }
  }

  onSubmit() {
    const validPriceRange = this.validatePriceRange(this.minPrice?.value, this.maxPrice?.value);
    if (validPriceRange) {
      console.log(this.filterForm.value);
    } else {
      return;
    }
  }

  onReset() {
    this.resetCheckboxes();
    this.filterForm.reset();
  }

  validatePriceRange(a: string | undefined, b: string | undefined): boolean {
    const min: number = a !== undefined ? +a : 0;
    const max: number = b !== undefined ? +b : 0;

    if (min > max) {
      this.errorMessage = 'Invalid price range. Please verify your form.';
      return false;
    } else {
      this.errorMessage = undefined;
      return true;
    }
  }
}
