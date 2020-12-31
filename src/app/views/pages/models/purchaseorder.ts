export interface PurchaseOrder {
	id: number,
	title: string,
	tax: number,
	grossAmount: number,
	netAmount: number,
	discount: number,
	poNumber: string,
	date: Date,
	vendorID: number,
	branchId: number,
	vendorName: string,
	branchName: string,
	polist: []

}
