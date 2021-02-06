// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { InventoryComponent } from './inventory.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatDatepickerModule, MatAutocompleteModule, MatListModule, MatSliderModule, MatCardModule, MatSelectModule, MatButtonModule, MatIconModule, MatNativeDateModule, MatSlideToggleModule, MatCheckboxModule, MatMenuModule, MatTabsModule, MatTooltipModule, MatSidenavModule, MatProgressBarModule, MatProgressSpinnerModule, MatSnackBarModule, MatTableModule, MatGridListModule, MatToolbarModule, MatBottomSheetModule, MatExpansionModule, MatDividerModule, MatSortModule, MatStepperModule, MatChipsModule, MatPaginatorModule, MatRadioModule, MatTreeModule, MatButtonToggleModule, MatIconRegistry, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MAT_DATE_LOCALE } from '@angular/material';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { Routes, RouterModule } from '@angular/router';
import { MaterialPreviewModule } from '../../partials/content/general/material-preview/material-preview.module';
import { PartialsModule } from '../../partials/partials.module';
import { AttendanceComponent } from '../attendance/attendance.component';
import { BrandComponent } from '../../theme/brand/brand.component';
import { BrandlistComponent } from './brand/brandlist/brandlist.component';
import { ProductComponent } from './product/product.component';
import { ProductlistComponent } from './product/productlist/productlist.component';
import { UnitComponent } from './unit/unit.component';
import { UnitlistComponent } from './unit/unitlist/unitlist.component';
import { CoreModule } from '../../../core/core.module';
import { AddTaxComponent } from './add-tax/add-tax.component';
import { TaxListComponent } from './add-tax/tax-list/tax-list.component';
const routes: Routes = [
	{
		path: '',
		component: InventoryComponent,
		children: [
			{
				path: 'brand',
				component: BrandlistComponent
			},
			{
				path: 'product',
				component: ProductlistComponent
			},
			{
				path: 'unit',
				component: UnitlistComponent
			},
			{
				path: 'tax',
				component: TaxListComponent
			},
		]
	}
];
@NgModule({
	imports: [
		MatInputModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatAutocompleteModule,
		MatListModule,
		MatSliderModule,
		MatCardModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		MatNativeDateModule,
		MatSlideToggleModule,
		MatCheckboxModule,
		MatMenuModule,
		MatTabsModule,
		MatTooltipModule,
		MatSidenavModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTableModule,
		MatGridListModule,
		MatToolbarModule,
		MatBottomSheetModule,
		MatExpansionModule,
		MatDividerModule,
		MatSortModule,
		MatStepperModule,
		MatChipsModule,
		MatPaginatorModule,
		MatRadioModule,
		MatTreeModule,
		CoreModule,
		CommonModule,
		MatRadioModule,
		MatTreeModule,
		MatButtonToggleModule,
		PartialsModule,
		MaterialPreviewModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes)
	],
    declarations: [
        InventoryComponent,

        UnitComponent,
        ProductComponent,
        UnitlistComponent,
        ProductlistComponent,
        BrandlistComponent,


    ],
    exports: [
        InventoryComponent,
	],
	entryComponents:[
		BrandComponent,
		UnitComponent,
		ProductComponent,

	],
	providers: [
		MatIconRegistry,
		{ provide: MatBottomSheetRef, useValue: {} },
		{ provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
		{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
		{ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },

	],
})
export class InventoryModule {

}
