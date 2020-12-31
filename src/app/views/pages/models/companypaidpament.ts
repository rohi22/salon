export interface CompanyPaidPayment {
	id: number,
	amount: number,
	employeeId: number,
	vendorId: number,
	customerId: number,
	branchId: number,
	billstatus: string,
	accountPayableGenericId: number,
	bankTransaction: boolean,
	cashTransaction: boolean,
	checqueTransaction: boolean,
	bankTransactionList: [],
	chequeTransactionList: [],
	cashTransactionList: []
}
