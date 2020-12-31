
export class ApiLinks {

	readonly BaseUrl = "http://172.16.0.99:10000/api/";
	/// Login ///
	readonly LoginUrl = this.BaseUrl + "login";
	readonly imageUploader = this.BaseUrl + "image";

	/// Department ///
	readonly department = this.BaseUrl + "department";
	readonly departmentbyId = this.BaseUrl + "desingation/";
	readonly departmentbybranchId =  "desingation/branch/";
	readonly PostDepartment = this.BaseUrl + "department";
	readonly PutDepartment = this.BaseUrl + "department";
	readonly DeleteDepartment = this.BaseUrl + "department/";

	/// Designation ///
	readonly desingation = this.BaseUrl + "designation";
	readonly desingationbyId = this.BaseUrl + "designation";
	readonly desingationbydepartmentId = this.BaseUrl + "designation/department/";
	readonly desingationbyname = this.BaseUrl + "designation";
	readonly AddDesignation = this.BaseUrl + "designation";
	readonly PutDesignatoin = this.BaseUrl + "designation";
	readonly DeleteDesignation = this.BaseUrl + "designation/";

	/// Branch ///
	readonly branch = this.BaseUrl + "branch";
	readonly branchbyId = this.BaseUrl + "branch/";
	readonly branchbycountry = this.BaseUrl + "branch/country/";
	readonly PostBranch = this.BaseUrl + "branch";
	readonly PutBranch = this.BaseUrl + "branch";
	readonly DeleteBranch = this.BaseUrl + "branch/"

	/// Users///
	readonly users = this.BaseUrl + "user";
	readonly usersbyId = this.BaseUrl + "user/";
	readonly usersbyBranchId = this.BaseUrl + "user/branch/";
	readonly usersbyName = this.BaseUrl + "user//user/";
	readonly AddUser = this.BaseUrl + "user";
	readonly PutUser = this.BaseUrl + "user";
	readonly DeleteUser = this.BaseUrl + "user/";

	/// Country ///
	readonly allcountry = this.BaseUrl + "country";
	readonly CountryByID = this.BaseUrl + "country/";
	readonly CountryByName = this.BaseUrl + "country/name/";
	readonly postcountry = this.BaseUrl + "country";
	readonly PutCountry = this.BaseUrl + "country";
	readonly DeleteCountry = this.BaseUrl + "country/";


	/// City ///
	readonly citybyStateID = this.BaseUrl + "city/state/";
	readonly cityByID = this.BaseUrl + "city/";
	readonly allcity = this.BaseUrl + "city";
	readonly postcity = this.BaseUrl + "city";
	readonly PutCity = this.BaseUrl + "city/";
	readonly DeleteCity = this.BaseUrl + "city/";

	/// State ///
	readonly statebyCountryId = this.BaseUrl + "state/country/";
	readonly stateById = this.BaseUrl + "state/";
	readonly poststate = this.BaseUrl + "state";
	readonly allstate = this.BaseUrl + "state";
	readonly PutState = this.BaseUrl + "state";
	readonly DeleteState = this.BaseUrl + "state/";

	/// Area ///
	readonly areaByCityID = this.BaseUrl + "area/city/";
	readonly areaById = this.BaseUrl + "area/";
	readonly allarea = this.BaseUrl + "area";
	readonly postarea = this.BaseUrl + "area";
	readonly PutArea = this.BaseUrl + "area";
	readonly DeleteArea = this.BaseUrl + "area/";

	/// Services ///
	readonly AllServoices = this.BaseUrl + "service";
	readonly ServicesById = this.BaseUrl + "service/";

	/// Permission ///
	readonly AllPermission = this.BaseUrl + "permission";
	readonly PermissionByID = this.BaseUrl + "permission/";
	readonly PermissionByGeneric = this.BaseUrl + "permission/";
	readonly PermissionByBranch = this.BaseUrl + "permission/";
	readonly PermissionbyDesignation = this.BaseUrl + "permission/designation/";
	readonly postpermisoin = this.BaseUrl + "permission";
	readonly Putpermisoin = this.BaseUrl + "permission";
	readonly Deletepermisoin = this.BaseUrl + "permission/";

	/// User Type ///
	readonly AllUSerType = this.BaseUrl + "user-type";
	readonly UserTYpeBYID = this.BaseUrl + "user-type/";

	/// Header -footer-logo ///
	readonly allWebsetting = this.BaseUrl + "web-setting";
	readonly allHeader = this.BaseUrl + "web-setting";
	readonly HeaderByID = this.BaseUrl + "web-setting";
	readonly PostWebsetting = this.BaseUrl + "web-setting";
	readonly PutWebsetting = this.BaseUrl + "web-setting";
	readonly WebsettingByID = this.BaseUrl + "web-setting/";

	/// Employee ///
	readonly AllEmployee = this.BaseUrl + "employee";
	readonly EmployeeByBranch = this.BaseUrl + "employee/branch/";
	readonly EmployeeByID = this.BaseUrl + "employee/";
	readonly EmployeeByBatch = this.BaseUrl + "employee/batch/";
	readonly EmployeeBySerivce = this.BaseUrl + "employee/service/";
	readonly postEmployee = this.BaseUrl + "employee";
	readonly PutEmployee = this.BaseUrl + "employee";
	readonly DeletEmployee = this.BaseUrl + "employee/";

	/// Services ///
	readonly Allservices = this.BaseUrl + "service";
	readonly ServicesBYId = this.BaseUrl + "service/";
	readonly postServices = this.BaseUrl + "service";
	readonly PutServices = this.BaseUrl + "service";
	readonly DeleteServices = this.BaseUrl + "service/";

	/// Batch ///
	readonly AllBAtch = this.BaseUrl + "batch";
	readonly BatchByID = this.BaseUrl + "batch/";
	readonly postBatch = this.BaseUrl + "batch";
	readonly DeleteBatch = this.BaseUrl + "batch/";
	readonly putBatch = this.BaseUrl + "batch";


	/// Common salary Date ///
	readonly allcommonsalarydate = this.BaseUrl + "commonsalarydate";

	/// Employee Salary Date (Custom) ///
	readonly Allcustomsalarydate = this.BaseUrl + "customsalarydate";
	readonly customsalarydateforadddate = this.BaseUrl + "lcustomsalarydate/";
	readonly customsalarydatebyemployeeid = this.BaseUrl + "customsalarydate/employee/";

	/// Late Detail ///
	readonly Alllatedetail = this.BaseUrl + "latedetail";
	readonly latedetailbyid = this.BaseUrl + "latedetail";
	readonly latedetailwhichareunpaidbyemployeeid = this.BaseUrl + "latedetail/employeeunpaid/";
	readonly atedetailbyemployeeid = this.BaseUrl + "latedetail/employee/";

	/// Late attendance Deducation ///
	readonly GetAlllateAttendance = this.BaseUrl + "late";
	readonly Getlateattendancebyattendanceid = this.BaseUrl + "late/";
	readonly PostLateAttendanceDeducation = this.BaseUrl + "late";
	readonly PutLateDed = this.BaseUrl + "late";
	readonly DeleteLateDEd = this.BaseUrl + "late/";

	/// Attendance ///
	readonly allattendance = this.BaseUrl + "attendance";
	readonly Tickabsentattendancebyattendanceid = this.BaseUrl + "attendance/absent/";
	readonly TickPresentbyattendanceid = this.BaseUrl + "aattendance/present/";
	readonly attendancebyattendanceid = this.BaseUrl + "attendance/";

	/// Absent deduction ///
	readonly Allabsent = this.BaseUrl + "absent";
	readonly absentbyid = this.BaseUrl + "absent/";
	readonly POstAbsent = this.BaseUrl + "absent";
	readonly PutAbsentDed = this.BaseUrl + "absent";
	readonly DeleteAbsentDed = this.BaseUrl + "absent/";

	/// Allowances ///
	readonly Allallowance = this.BaseUrl + "allowance";
	readonly allowancebyid = this.BaseUrl + "allowance/";
	readonly PostAllowance = this.BaseUrl + "allowance";
	readonly PutAllownces = this.BaseUrl + "allowance";
	readonly DeleteAlownces = this.BaseUrl + "allowance/"

	/// Inventory ///
	readonly AllINventory = this.BaseUrl + "inventory";
	readonly inventorybyBranchAndProductId = this.BaseUrl + "inventory/";
	readonly InventoyrBYID = this.BaseUrl + "inventory/";

	/// Product ///
	readonly AllProduct = this.BaseUrl + "product";
	readonly ProductByBranch = this.BaseUrl + "product/branch/";
	readonly ProductByID = this.BaseUrl + "product/";
	readonly ProductBYImageFile = this.BaseUrl + "product/downloadfile/{fileName:.+}";
	readonly PostProduct = this.BaseUrl + "product";
	readonly PutProduct = this.BaseUrl + "product";
	readonly DeleteProduct = this.BaseUrl + "product/";

	/// Brand ///
	readonly AllBrand = this.BaseUrl + "brand";
	readonly BrandByActive = this.BaseUrl + "brand/";
	readonly BrandBYID = this.BaseUrl + "brand/";
	readonly PostBRand = this.BaseUrl + "brand";
	readonly PutBRand = this.BaseUrl + "brand";
	readonly DeleteBRand = this.BaseUrl + "brand/";

	/// Unit ///
	readonly ALLunit = this.BaseUrl + "unit";
	readonly UNITbyid = this.BaseUrl + "unit/";
	readonly PostUnit = this.BaseUrl + "unit";
	readonly PutUnit = this.BaseUrl + "unit";
	readonly DeleteUnit = this.BaseUrl + "unit/";

	/// Bank ///
	readonly AllBank = this.BaseUrl + "bank";
	readonly BankByID = this.BaseUrl + "bank/";
	readonly PostBank = this.BaseUrl + "bank";
	readonly PutBank = this.BaseUrl + "bank/";
	readonly DeleteBank = this.BaseUrl + "bank/";

	/// Bank Account ///
	readonly Allbankaccount = this.BaseUrl + "bankaccount";
	readonly bankaccountById = this.BaseUrl + "bankaccount/";
	readonly bankaccountBYBranchID = this.BaseUrl + "bankaccount/branch/";
	readonly PostBankAcount = this.BaseUrl + "bankaccount";
	// readonly PutBankAcount = this.BaseUrl + "bankaccount";
	// readonly DeleteBankAcount = this.BaseUrl + "bankaccount";

	/// Bank Branches ///
	readonly Allbankbranch = this.BaseUrl + "bankbranch";
	readonly BankbranchByID = this.BaseUrl + "bankbranch/";
	readonly BankbranchByBankID = this.BaseUrl + "bankbranch/bankid/";
	readonly Postbankbranch = this.BaseUrl + "bankbranch";
	readonly Putbankbranch = this.BaseUrl + "bankbranch/";
	readonly Deletebankbranch = this.BaseUrl + "bankbranch/";

	/// Account Type ///
	readonly AllAccountTYpe = this.BaseUrl + "accounttype";
	readonly AccounttypeBYID = this.BaseUrl + "accounttype/";
	readonly PostAccounttype = this.BaseUrl + "accounttype";
	readonly PutAccounttype = this.BaseUrl + "accounttype";
	readonly DeleteAccounttype = this.BaseUrl + "accounttype/";

	/// Vendor Bill ///
	readonly AllVendorBill = this.BaseUrl + "bill";
	readonly VendorBillByPurchaseorderId = this.BaseUrl + "bill/po/";
	readonly VendorBillByVBranch = this.BaseUrl + "bill/branch/";
	readonly VendorBillBYID = this.BaseUrl + "bill/";

	/// Stock ///
	readonly AllStock = this.BaseUrl + "inventory";
	readonly StockbyspecficbranchProduct = this.BaseUrl + "inventory/";
	readonly StockByInventoryId = this.BaseUrl + "inventory/";

	/// GRN ///
	readonly AllGRN = this.BaseUrl + "grn";
	readonly GrnByBranchID = this.BaseUrl + "grn/branch";
	readonly GrnByID = this.BaseUrl + "grn/";
	readonly GrnByPO = this.BaseUrl + "grn/po/";
	readonly PostGrn = this.BaseUrl + "grn/nonpo/";
	readonly PutGrn = this.BaseUrl + "grn/po/";

	/// Purchase Order ///
	readonly AllPO = this.BaseUrl + "po";
	readonly POByID = this.BaseUrl + "po/";
	readonly PObyBranchId = this.BaseUrl + "po/branch/";
	readonly PostPO = this.BaseUrl + "po";
	readonly PuttPO = this.BaseUrl + "po";

	/// Customer Update ///
	readonly PostCustomerUpdate = this.BaseUrl + "customer/updatedcustomer";
	readonly AllCustomer = this.BaseUrl + "customer";
	readonly CustomerByBranchId = this.BaseUrl + "customer/branch/";

	/// Customer Order ///
	readonly PostCustomerOrder = this.BaseUrl + "order";
	readonly PutCustomerOrder = this.BaseUrl + "order";
	readonly GetCustomerOrder = this.BaseUrl + "order";
	readonly DeleteCustomerOrder = this.BaseUrl + "order/";

	/// Customer Promotions (Reward Point) ///
	readonly PostCustomerRewardPoint = this.BaseUrl + "rewardpoint";
	readonly PutCustomerRewardPoint = this.BaseUrl + "rewardpoint";
	readonly GetCustomerRewardPoint = this.BaseUrl + "rewardpoint";
	readonly DeleteCustomerRewardPoint = this.BaseUrl + "rewardpoint/";

	/// Customer Promotions ( Coupon) ///
	readonly PostCustomerCoupon = this.BaseUrl + "coupon";
	readonly PutCustomerCoupon = this.BaseUrl + "coupon";
	readonly GetCustomerCoupon = this.BaseUrl + "coupon";
	readonly DeleteCustomerCoupon = this.BaseUrl + "coupon/";

	/// Customer Promotions (Loyalty Card) ///
	readonly PostCustomerLoyalityCard = this.BaseUrl + "loyalitycard";
	readonly PutCustomerLoyalityCard = this.BaseUrl + "loyalitycard";
	readonly GetCustomerLoyalityCard = this.BaseUrl + "loyalitycard";
	readonly DeleteCustomerLoyalityCard = this.BaseUrl + "loyalitycard/";
	readonly PostCustomerLoyalityCardTranstion = this.BaseUrl + "loyalitycard/transaction";

	/// Customer Promotions (Membership Card) ///
	readonly PostCustomerMemberdhipCard = this.BaseUrl + "membership";
	readonly PutCustomerMemberdhipCard = this.BaseUrl + "membership";
	readonly GetCustomerMemberdhipCard = this.BaseUrl + "membership";
	readonly DeleteCustomerMemberdhipCard = this.BaseUrl + "membership/";

	/// Customer bill ///
	readonly PostCustomerBill = this.BaseUrl + "customerbill";
	readonly GetCustomerBill = this.BaseUrl + "customerbill";
	readonly GetCustomerBillBYID = this.BaseUrl + "customerbill/";
	readonly GetCustomerBillByORderID = this.BaseUrl + "customerbill/order/";
	readonly GetCustomerBillByCustomerID = this.BaseUrl + "customerbill/customer/";

	/// Currency ///
	readonly PostCurrency = this.BaseUrl + "currency";
	readonly PutCurrency = this.BaseUrl + "currency";
	readonly DeleteCurrency = this.BaseUrl + "currency/";
	readonly GetAllCurrency = this.BaseUrl + "currency";
	readonly GetCurrencyByID = this.BaseUrl + "currency/";

	/// Advanced Salary ///
	readonly PostAdvancedSalary = this.BaseUrl + "advancepercentage";
	readonly PutAdvancedSalary = this.BaseUrl + "advancepercentage";
	readonly DeleteAdvancedSalary = this.BaseUrl + "advancepercentage/";
	readonly GetAdvancedSalary = this.BaseUrl + "advancepercentage";

	/// Vendor ///
	readonly GetALLvendor = this.BaseUrl + "vendor";
	readonly vendorByBranch = this.BaseUrl + "vendor/branch/";
	readonly vendorByID = this.BaseUrl + "vendor/";
	readonly PostVendorUpdate = this.BaseUrl + "vendor/update";

	/// Purchase Return ///
	readonly GetALLPOReturn = this.BaseUrl + "purchase-return";
	readonly POReturnByID = this.BaseUrl + "purchase-return/";
	readonly POstPOReturn = this.BaseUrl + "purchase-return";

	/// Sales ///
	readonly GetSales = this.BaseUrl + "sales";
	readonly SalesByID = this.BaseUrl + "sales/";
	readonly SalesByBranch = this.BaseUrl + "sales/branch/";
	readonly SalesByDate = this.BaseUrl + "sales/single-date ";
	readonly postSales = this.BaseUrl + "sales/range";

	/// Profit ///
	readonly GetProfitBYDate = this.BaseUrl + "profit/";
	readonly PostProfit = this.BaseUrl + "sales/range/profit";

	/// Sales Return ///
	readonly Getpurchasereturn = this.BaseUrl + "purchase-return";
	readonly Postpurchasereturn = this.BaseUrl + "api/sales-return";
	readonly GetsalesreturnByID = this.BaseUrl + "sales-return/";

	/// Company PAid pAyment ///
	readonly Getpayment = this.BaseUrl + "payment";
	readonly GetCheque = this.BaseUrl + "cheque";
	readonly PostPayment = this.BaseUrl + "payment/vendor";
	readonly GetpaymentByID = this.BaseUrl + "payment/";
	readonly GetAccountPayableGen = this.BaseUrl + "account-payable-gen";
	readonly GetAccountPayableGenByID = this.BaseUrl + "account-payable-gen/";
}

