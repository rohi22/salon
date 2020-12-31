// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// This Module's Components
import { AttendanceComponent } from './attendance.component';
import { AbsentComponent } from './deduction/absent/absent.component';
import { AbsentlistComponent } from './deduction/absent/absentlist/absentlist.component';
import { LateattendanceComponent } from './deduction/lateattendance/lateattendance.component';
import { LateattendancelistComponent } from './deduction/lateattendance/lateattendancelist/lateattendancelist.component';
import {
	MatAutocompleteModule,
	MatNativeDateModule,
	MatFormFieldModule,
	MatInputModule,
	MatRadioModule,
	MatButtonModule,
	MatCardModule,
	MatChipsModule,
	MatSelectModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatIconModule,
	MatSliderModule,
	MatPaginatorModule,
	MatSortModule,
	MatSidenavModule,
	MatSnackBarModule,
	MatStepperModule,
	MatToolbarModule,
	MatDividerModule,
	MatTabsModule,
	MatTableModule,
	MatTooltipModule,
	MatListModule,
	MatGridListModule,
	MatButtonToggleModule,
	MatBottomSheetModule,
	MatExpansionModule,
	MatMenuModule,
	MatTreeModule,
	MAT_BOTTOM_SHEET_DATA,
	MatBottomSheetRef,
	MAT_DATE_LOCALE,
	MAT_DATE_FORMATS, MatDatepickerModule, MatSlideToggleModule, MatCheckboxModule, MatIconRegistry

} from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialPreviewModule } from '../../partials/content/general/material-preview/material-preview.module';
import { PartialsModule } from '../../partials/partials.module';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { EmployeeattendanceComponent } from './attendance/employeeattendance/employeeattendance.component';
import { EmployeeattendacelistComponent } from './attendance/employeeattendance/employeeattendacelist/employeeattendacelist.component';
// import { CoreModule } from '../../../core/core.module';
const routes: Routes = [
	{
		path: '',
		component: AttendanceComponent,
		children: [
			{
				path: 'deduction/absent/absentlist',
				component: AbsentlistComponent
			},
			{
				path: 'deduction/lateattendance/lateattendancelist',
				component: LateattendancelistComponent
			},
			{
				path: 'attendance/employeeattendance/employeeattendancelist',
				component: EmployeeattendacelistComponent
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
		// CoreModule,
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
		AttendanceComponent,
		LateattendanceComponent,
		AbsentComponent,
		AbsentlistComponent,
		LateattendancelistComponent,
		EmployeeattendanceComponent,
		EmployeeattendacelistComponent,
	],
	exports: [
		AttendanceComponent,
	],
	providers: [
		MatIconRegistry,
		{ provide: MatBottomSheetRef, useValue: {} },
		{ provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
		{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
		{ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },

	],
	entryComponents:[
		AbsentComponent,
		LateattendanceComponent,
		EmployeeattendanceComponent
	]
})
export class AttendanceModule {

}
