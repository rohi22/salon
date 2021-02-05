import { CategoryService } from './../../../Services/product.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SalonResolverService implements Resolve<any>  {

  constructor(private _categoryService : CategoryService) { }

  resolve() {
    return forkJoin([
		this._categoryService.getCategoryByType(1),
		this._categoryService.getCategoryByType(2),
	])
  }
}
