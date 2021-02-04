export interface PurchaseOrder {
	id: number,
	title: string,
	tax: number,
	grossAmount: number,
	netAmount: number,
	discount: number,
	poNumber: string,
	date: Date,
	branchId: number,
	vendorName: string,
	branchName: string,
	poList: [],
	createdBy: string,
	createdById: number,
	deliveryDate: any,
	poDate: any,
	subDiscount: any,
	subGrossAmount: any,
	subTaxAmount: any,
	subTotal: any,
	poStatus:any,
	vendorId: any,
}
