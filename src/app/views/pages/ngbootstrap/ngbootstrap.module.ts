import { CategorylistComponent } from './category/categorylist/categorylist.component';
import { TaxListComponent } from './../inventory/add-tax/tax-list/tax-list.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbootstrapComponent } from './ngbootstrap.component';
import { AlertComponent } from './alert/alert.component';
import { AccordionComponent } from './accordion/accordion.component';
import { NgbAlertConfig, NgbModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from '../../../core/core.module';
import { MaterialPreviewModule } from '../../partials/content/general/material-preview/material-preview.module';

import { ButtonsComponent } from './buttons/buttons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselComponent } from './carousel/carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { CollapseComponent } from './collapse/collapse.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModalComponent, NgbdModalContentComponent } from './modal/modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PopoverComponent } from './popover/popover.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { RatingComponent } from './rating/rating.component';
import { TabsComponent } from './tabs/tabs.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TypeheadComponent } from './typehead/typehead.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { CityComponent } from './location/city/city.component';
import { CitylistComponent } from './location/city/citylist/citylist.component';
import { StateComponent } from './location/state/state.component';
import { StatelistComponent } from './location/state/statelist/statelist.component';
import { CountryComponent } from './location/country/country.component';
import { CountrylistComponent } from './location/country/countrylist/countrylist.component';
import { AreaComponent } from './location/area/area.component';
import { ArealistComponent } from './location/area/arealist/arealist.component';
import { PermissionComponent } from './role/permission/permission.component';
import { PermissionlistComponent } from './role/permission/permissionlist/permissionlist.component';
import { ServiceComponent } from './role/service/service.component';
import { ServicelistComponent } from './role/service/servicelist/servicelist.component';
import { AssignpermissionComponent } from './role/assignpermission/assignpermission.component';
import { AssignpermissionlistComponent } from './role/assignpermission/assignpermissionlist/assignpermissionlist.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { EmployeelistComponent } from './employee/employee/employeelist/employeelist.component';
import { BatchComponent } from './employee/batch/batch.component';
import { BatchlistComponent } from './employee/batch/batchlist/batchlist.component';
import { BankComponent } from './Bank/bank/bank.component';
import { BankaccountComponent } from './Bank/bankaccount/bankaccount.component';
import { BankbranchesComponent } from './Bank/bankbranches/bankbranches.component';
import { BanklistComponent } from './Bank/bank/banklist/banklist.component';
import { BankaccountlistComponent } from './Bank/bankaccount/bankaccountlist/bankaccountlist.component';
import { BankbrancheslistComponent } from './Bank/bankbranches/bankbrancheslist/bankbrancheslist.component';
import { AccounttypeComponent } from './Bank/accounttype/accounttype.component';
import { AccounttypelistComponent } from './Bank/accounttype/accounttypelist/accounttypelist.component';
import { BrandComponent } from './brand/brand.component';
import { UnitComponent } from './unit/unit.component';
import { ProductComponent } from './product/product.component';
import { BrandlistComponent } from './brand/brandlist/brandlist.component';
import { UnitlistComponent } from './unit/unitlist/unitlist.component';
import { ProduclistComponent } from './product/produclist/produclist.component';
import { CustomerrewardpointComponent } from './customerrewardpoint/customerrewardpoint.component';
import { CustomerrewardpointlistComponent } from './customerrewardpoint/customerrewardpointlist/customerrewardpointlist.component';
import { CustomercouponComponent } from './customercoupon/customercoupon.component';
import { CustomermembershipComponent } from './customermembership/customermembership.component';
import { CustomermembershiplistComponent } from './customermembership/customermembershiplist/customermembershiplist.component';
import { GrnComponent } from './grn/grn.component';
import { GrnlistComponent } from './grn/grnlist/grnlist.component';
import { CurrencyComponent } from './currency/currency.component';
import { CurrencylistComponent } from './currency/currencylist/currencylist.component';
import { AdvancesalaryComponent } from './advancesalary/advancesalary.component';
import { AdvancesalarylistComponent } from './advancesalary/advancesalarylist/advancesalarylist.component';
import { CustomercouponlistComponent } from './customercoupon/customercouponlist/customercouponlist.component';
import { EmployeeallownceComponent } from './employee/employeeallownce/employeeallownce.component';
import { EmployeeallowncelistComponent } from './employee/employeeallownce/employeeallowncelist/employeeallowncelist.component';
import { CustomerloyalitycardComponent } from './customerloyalitycard/customerloyalitycard.component';
import { CustomerloyalitycardlistComponent } from './customerloyalitycard/customerloyalitycardlist/customerloyalitycardlist.component';
import { CustomerloyalitycardtransactionComponent } from './customerloyalitycardtransaction/customerloyalitycardtransaction.component';
import { CustomerloyalitycardtransactionlistComponent } from './customerloyalitycardtransaction/customerloyalitycardtransactionlist/customerloyalitycardtransactionlist.component';
import { PurchaseorderComponent } from './purchaseorder/purchaseorder.component';
import { PurchaseorderlistComponent } from './purchaseorder/purchaseorderlist/purchaseorderlist.component';
import { PurchasereturnComponent } from './purchasereturn/purchasereturn.component';
import { PurchasereturnlistComponent } from './purchasereturn/purchasereturnlist/purchasereturnlist.component';
import { CustomerbillComponent } from './customerbill/customerbill.component';
import { CustomerbilllistComponent } from './customerbill/customerbilllist/customerbilllist.component';
import { CustomerorderComponent } from './customerorder/customerorder.component';
import { CustomerorderlistComponent } from './customerorder/customerorderlist/customerorderlist.component';
import { AdminmenuComponent } from './adminmenu/adminmenu.component';
import { AttendancemenuComponent } from './menus/attendancemenu/attendancemenu.component';
import { InventorymenuComponent } from './menus/inventorymenu/inventorymenu.component';
import { PurchaseordermenuComponent } from './menus/purchaseordermenu/purchaseordermenu.component';
import { UsermenuComponent } from './menus/usermenu/usermenu.component';
import { CustomermenuComponent } from './menus/customermenu/customermenu.component';
import { WebsettingComponent } from './websetting/websetting.component';
import { WebsettinglistComponent } from './websetting/websettinglist/websettinglist.component';
import { SalesandprofitmenuComponent } from './menus/salesandprofitmenu/salesandprofitmenu.component';
import { SalesComponent } from './sales/sales.component';
import { ProfitComponent } from './profit/profit.component';
import { SaleslistComponent } from './sales/saleslist/saleslist.component';
import { ProfitlistComponent } from './profit/profitlist/profitlist.component';
import { SalesreturnComponent } from './salesreturn/salesreturn.component';
import { SalesreturnlistComponent } from './salesreturn/salesreturnlist/salesreturnlist.component';
import { CompanypaidpaymentsComponent } from './companypaidpayments/companypaidpayments.component';
import { CompanypaidpaymentslistComponent } from './companypaidpayments/companypaidpaymentslist/companypaidpaymentslist.component';
import { VendorupdateComponent } from './vendorupdate/vendorupdate.component';
import { VendorupdatelistComponent } from './vendorupdate/vendorupdatelist/vendorupdatelist.component';
import { CustomerupdateComponent } from './customerupdate/customerupdate.component';
import { CustomerupdatelistComponent } from './customerupdate/customerupdatelist/customerupdatelist.component';
import { AttributeComponent } from './junaid/attribute/attribute.component';
import { JbrandComponent } from './junaid/jbrand/jbrand.component';
import { JcategoryComponent } from './junaid/jcategory/jcategory.component';
import { JproductComponent } from './junaid/jproduct/jproduct.component';
import { AddTaxComponent } from '../inventory/add-tax/add-tax.component';
import { SalonPosComponent } from './menus/salon-pos/salon-pos.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
	{
		path: '',
		component: NgbootstrapComponent,
		children: [
			{
				path: 'accordion',
				component: AccordionComponent
			},
			{
				path: 'alert',
				component: AlertComponent
			},
			{
				path: 'buttons',
				component: ButtonsComponent
			},
			{
				path: 'carousel',
				component: CarouselComponent
			},
			{
				path: 'collapse',
				component: CollapseComponent
			},
			{
				path: 'datepicker',
				component: DatepickerComponent
			},
			{
				path: 'dropdown',
				component: DropdownComponent
			},
			{
				path: 'modal',
				component: ModalComponent
			},
			{
				path: 'pagination',
				component: PaginationComponent
			},
			{
				path: 'popover',
				component: PopoverComponent
			},
			{
				path: 'progressbar',
				component: ProgressbarComponent
			},
			{
				path: 'rating',
				component: RatingComponent
			},
			{
				path: 'tabs',
				component: TabsComponent
			},
			{
				path: 'timepicker',
				component: TimepickerComponent
			},
			{
				path: 'tooltip',
				component: TooltipComponent
			},
			{
				path: 'typehead',
				component: TypeheadComponent
			},
			{
				path: 'location/city/citylist',
				component: CitylistComponent
			},
			{
				path: 'location/country/countrylist',
				component: CountrylistComponent
			},
			{
				path: 'location/state/statelist',
				component: StatelistComponent
			},
			{
				path: 'location/area/arealist',
				component: ArealistComponent
			},
			{
				path: 'role/permission/permissionlist',
				component: PermissionlistComponent
			},
			{
				path: 'role/service/servicelist',
				component: ServicelistComponent
			},
			{
				path: 'emplyee/employee/employeelist',
				component: EmployeelistComponent
			},
			{
				path: 'employee/batch/batchlist',
				component: BatchlistComponent
			},
			{
				path: 'Bank/bank/banklist',
				component: BanklistComponent
			},
			{
				path: 'Bank/bankaccount/bankaccountlist',
				component: BankaccountlistComponent
			},
			{
				path: 'Bank/bankbranches/bankbrancheslist',
				component: BankbrancheslistComponent
			},
			{
				path: 'Bank/accounttype/accounttypelist',
				component: AccounttypelistComponent
			},
			{
				path: 'brand',
				component: BrandlistComponent
			},
			{
				path: 'tax',
				component: TaxListComponent
			},
			{
				path: 'unit',
				component: UnitlistComponent
			},
			{
				path: 'product',
				component: ProduclistComponent
			},
			{
				path: 'customercoupon',
				component: CustomercouponlistComponent
			},
			{
				path: 'customerrewardpoint',
				component: CustomerrewardpointlistComponent
			},
			{
				path: 'customermembershipcard',
				component: CustomermembershiplistComponent
			},
			{
				path: 'currency',
				component: CurrencylistComponent
			},
			{
				path: 'advancedsalary',
				component: AdvancesalarylistComponent
			},
			{
				path: 'grn',
				component: GrnlistComponent
			},
			{
				path: 'employeeallownce',
				component: EmployeeallowncelistComponent
			},
			{
				path: 'customerloyaltiycard',
				component: CustomerloyalitycardlistComponent
			},
			{
				path: 'customerloyaltiycardtransaction',
				component: CustomerloyalitycardtransactionlistComponent
			},
			{
				path: 'purchaseorder',
				component: PurchaseorderlistComponent
			},
			{
				path: 'purchaseorderreturn',
				component: PurchasereturnlistComponent
			},
			{
				path: 'customerbill',
				component: CustomerbilllistComponent
			},
			{
				path: 'customerorder',
				component: CustomerorderlistComponent
			},
			{
				path: 'adminmenu',
				component: AdminmenuComponent
			},
			{
				path: 'menus/attendancemenu',
				component: AttendancemenuComponent
			},
			{
				path: 'menus/inventorymenu',
				component: InventorymenuComponent
			},
			{
				path: 'menus/purchaseordermenu',
				component: PurchaseordermenuComponent
			},
			{
				path: 'menus/usermenu',
				component: UsermenuComponent
			},
			{
				path: 'menus/customermenu',
				component: CustomermenuComponent
			},
			{
				path: 'menus/salesmenu',
				component: SalesandprofitmenuComponent
			},
			{
				path: 'menus/websetting/websettinglist',
				component: WebsettinglistComponent
			},
			{
				path: 'menus/websetting/websettings',
				component: WebsettingComponent
			},
			{
				path: 'sales/saleslist',
				component: SaleslistComponent
			},
			{
				path: 'profit/profitlist',
				component: ProfitlistComponent
			},
			{
				path: 'salesreturn/salesreturnlist',
				component: SalesreturnlistComponent
			},
			{
				path: 'companypaidpayments/companypaidpaymentslist',
				component: CompanypaidpaymentslistComponent
			},
			{
				path: 'vendorupdate/vendorupdatelist',
				component: VendorupdatelistComponent
			},
			{
				path: 'customerupdate/customerupdatelist',
				component: CustomerupdatelistComponent
			},
			{
				path: 'junaid/attribute',
				component: AttributeComponent
			},
			{
				path: 'junaid/brand',
				component: JbrandComponent
			},
			{
				path: 'junaid/product',
				component: JproductComponent
			},
			{
				path: 'menus/salonPos',
				component: SalonPosComponent
			},
			{
				path: 'categorylist',
				component: CategorylistComponent
			},
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		NgbModule,
		CoreModule,
		MaterialPreviewModule,
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		PerfectScrollbarModule,

		MatDialogModule,
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
		MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
		NgbProgressbarModule,
	],
	exports: [RouterModule],
	declarations: [
		NgbootstrapComponent,
		AlertComponent,
		AccordionComponent,
		ButtonsComponent,
		CarouselComponent,
		CollapseComponent,
		DatepickerComponent,
		DropdownComponent,
		ModalComponent,
		NgbdModalContentComponent,
		PaginationComponent,
		PopoverComponent,
		ProgressbarComponent,
		RatingComponent,
		TabsComponent,
		TimepickerComponent,
		TooltipComponent,
		TypeheadComponent,
		CityComponent,
		CitylistComponent,
		StateComponent,
		StatelistComponent,
		CountryComponent,
		CountrylistComponent,
		AreaComponent,
		ArealistComponent,
		PermissionComponent,
		PermissionlistComponent,
		ServiceComponent,
		ServicelistComponent,
		AssignpermissionComponent,
		AssignpermissionlistComponent,
		EmployeeComponent,
		EmployeelistComponent,
		BatchComponent,
		BatchlistComponent,
		BankComponent,
		BankaccountComponent,
		BankbranchesComponent,
		BanklistComponent,
		BankaccountlistComponent,
		BankbrancheslistComponent,
		AccounttypeComponent,
		AccounttypelistComponent,
		BrandComponent,
		UnitComponent,
		TaxListComponent,
		ProductComponent,
		BrandlistComponent,
		UnitlistComponent,
		ProduclistComponent,
		CustomerrewardpointComponent,
		CustomerrewardpointlistComponent,
		CustomercouponComponent,
		CustomermembershipComponent,
		CustomermembershiplistComponent,
		GrnComponent,
		GrnlistComponent,
		CurrencyComponent,
		CurrencylistComponent,
		AdvancesalaryComponent,
		AdvancesalarylistComponent,
		CustomercouponlistComponent,
		EmployeeallownceComponent,
		EmployeeallowncelistComponent,
		CustomerloyalitycardComponent,
		CustomerloyalitycardlistComponent,
		CustomerloyalitycardtransactionComponent,
		CustomerloyalitycardtransactionlistComponent,
		PurchaseorderComponent,
		PurchaseorderlistComponent,
		PurchasereturnComponent,
		PurchasereturnlistComponent,
		CustomerbillComponent,
		CustomerbilllistComponent,
		CustomerorderComponent,
		CustomerorderlistComponent,
		AdminmenuComponent,
		AttendancemenuComponent,
		InventorymenuComponent,
		PurchaseordermenuComponent,
		UsermenuComponent,
		CustomermenuComponent,
		WebsettingComponent,
		WebsettinglistComponent,
		SalesandprofitmenuComponent,
		SalesComponent,
		ProfitComponent,
		SaleslistComponent,
		ProfitlistComponent,
		SalesreturnComponent,
		SalesreturnlistComponent,
		CompanypaidpaymentsComponent,
		CompanypaidpaymentslistComponent,
		VendorupdateComponent,
		VendorupdatelistComponent,
		CustomerupdateComponent,
		CustomerupdatelistComponent,
		AttributeComponent,
		JbrandComponent,
		JcategoryComponent,
		JproductComponent,
		AddTaxComponent,
		SalonPosComponent,
		CategorylistComponent,
		CategoryComponent

		//BrancheslistComponent,
	],
	providers: [
		NgbAlertConfig, DatePipe],
	entryComponents: [
		NgbdModalContentComponent,
		CountryComponent,
		AddTaxComponent,
		AreaComponent,
		CityComponent,
		StateComponent,
		PermissionComponent,
		ServiceComponent,
		EmployeeComponent,
		BatchComponent,
		BankComponent,
		BankaccountComponent,
		BankbranchesComponent,
		AccounttypeComponent,
		BrandComponent,
		UnitComponent,
		ProductComponent,
		CustomercouponComponent,
		CustomermembershipComponent,
		CustomerrewardpointComponent,
		GrnComponent,
		CurrencyComponent,
		AdvancesalaryComponent,
		GrnComponent,
		EmployeeallownceComponent,
		CustomerloyalitycardComponent,
		CustomerloyalitycardtransactionComponent,
		PurchaseorderComponent,
		PurchasereturnComponent,
		CustomerbillComponent,
		CustomerorderComponent,
		WebsettingComponent,
		SalesComponent,
		ProfitComponent,
		SalesreturnComponent,
		CompanypaidpaymentsComponent,
		VendorupdateComponent,
		CustomerupdateComponent,
		CategorylistComponent,
		CategoryComponent
	]
})
export class NgbootstrapModule {
}
