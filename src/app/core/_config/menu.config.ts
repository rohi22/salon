export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Dashboards',
					root: true,
					alignment: 'left',
					icon: 'flaticon2-architecture-and-city',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
				},
				{
					title: 'Customer',
					root: true,
					alignment: 'left',
					icon: 'flaticon-network',
					page: '/ngbootstrap/menus/customermenu',
					// translate: 'MENU.DASHBOARD',
				},
				{
					title: 'Product',
					root: true,
					alignment: 'left',
					icon: 'flaticon-interface-7',
					page: '/ngbootstrap/product',
					// translate: 'MENU.DASHBOARD',
				},
				{
					title: 'Service',
					root: true,
					alignment: 'left',
					icon: 'flaticon-shopping-basket',
					page: '/ngbootstrap/role/service/servicelist',
					// translate: 'MENU.DASHBOARD',
				},
				{
					title: 'Sales POS',
					root: true,
					alignment: 'left',
					icon: 'flaticon-notes',
					page: '/ngbootstrap/menus/salonPos',
					// translate: 'MENU.DASHBOARD',
				},
				{
					title: 'Logout',
					root: true,
					alignment: 'left',
					icon: 'flaticon2-reload',
					page: '/auth/login',
					// translate: 'MENU.DASHBOARD',
				},
				// {
				// 	title: 'Components',
				// 	root: true,
				// 	alignment: 'left',
				// 	toggle: 'click',
				// 	submenu: [
				// 		{
				// 			title: ' Admin Setup',
				// 			bullet: 'dot',
				// 			icon: 'flaticon-interface-7',
				// 			submenu: [
				// 				{
				// 					title: 'Location',
				// 					bullet: 'dot',
				// 					submenu: [
				// 						{
				// 							title: 'Auto Complete',
				// 							page: '/material/form-controls/autocomplete',
				// 							permission: 'accessToECommerceModule'
				// 						},
				// 						{
				// 							title: 'Checkbox',
				// 							page: '/material/form-controls/checkbox'
				// 						},
				// 						{
				// 							title: 'Radio Button',
				// 							page: '/material/form-controls/radiobutton'
				// 						},
				// 						{
				// 							title: 'Datepicker',
				// 							page: '/material/form-controls/datepicker'
				// 						},
				// 					]
				// 				},
				// 			]
				// 		},
				// 		{
				// 			title: 'Ng-Bootstrap',
				// 			bullet: 'dot',
				// 			icon: 'flaticon-web',
				// 			submenu: [
				// 				{
				// 					title: 'Accordion',
				// 					page: '/ngbootstrap/accordion'
				// 				},
				// 				{
				// 					title: 'Alert',
				// 					page: '/ngbootstrap/alert'
				// 				},
				// 				{
				// 					title: 'Buttons',
				// 					page: '/ngbootstrap/buttons'
				// 				},
				// 				{
				// 					title: 'Carousel',
				// 					page: '/ngbootstrap/carousel'
				// 				},
				// 				{
				// 					title: 'Collapse',
				// 					page: '/ngbootstrap/collapse'
				// 				},
				// 				{
				// 					title: 'Datepicker',
				// 					page: '/ngbootstrap/datepicker'
				// 				},
				// 				{
				// 					title: 'Dropdown',
				// 					page: '/ngbootstrap/dropdown'
				// 				},
				// 				{
				// 					title: 'Modal',
				// 					page: '/ngbootstrap/modal'
				// 				},
				// 				{
				// 					title: 'Pagination',
				// 					page: '/ngbootstrap/pagination'
				// 				},
				// 				{
				// 					title: 'Popover',
				// 					page: '/ngbootstrap/popover'
				// 				},
				// 				{
				// 					title: 'Progressbar',
				// 					page: '/ngbootstrap/progressbar'
				// 				},
				// 				{
				// 					title: 'Rating',
				// 					page: '/ngbootstrap/rating'
				// 				},
				// 				{
				// 					title: 'Tabs',
				// 					page: '/ngbootstrap/tabs'
				// 				},
				// 				{
				// 					title: 'Timepicker',
				// 					page: '/ngbootstrap/timepicker'
				// 				},
				// 				{
				// 					title: 'Tooltips',
				// 					page: '/ngbootstrap/tooltip'
				// 				},
				// 				{
				// 					title: 'Typehead',
				// 					page: '/ngbootstrap/typehead'
				// 				}
				// 			]
				// 		},
				// 	]
				// },
				// {
				// 	title: 'Components',
				// 	root: true,
				// 	alignment: 'left',
				// 	toggle: 'click',
				// 	submenu: [
				// 		{
				// 			title: ' Admin Setup',
				// 			bullet: 'dot',
				// 			icon: 'flaticon-interface-7',
				// 			submenu: [
				// 				{
				// 					title: 'Form Controls',
				// 					bullet: 'dot',
				// 					submenu: [
				// 						{
				// 							title: 'Auto Complete',
				// 							page: '/material/form-controls/autocomplete',
				// 							permission: 'accessToECommerceModule'
				// 						},
				// 						{
				// 							title: 'Checkbox',
				// 							page: '/material/form-controls/checkbox'
				// 						},
				// 						{
				// 							title: 'Radio Button',
				// 							page: '/material/form-controls/radiobutton'
				// 						},
				// 						{
				// 							title: 'Datepicker',
				// 							page: '/material/form-controls/datepicker'
				// 						},
				// 						{
				// 							title: 'Form Field',
				// 							page: '/material/form-controls/formfield'
				// 						},
				// 						{
				// 							title: 'Input',
				// 							page: '/material/form-controls/input'
				// 						},
				// 						{
				// 							title: 'Select',
				// 							page: '/material/form-controls/select'
				// 						},
				// 						{
				// 							title: 'Slider',
				// 							page: '/material/form-controls/slider'
				// 						},
				// 						{
				// 							title: 'Slider Toggle',
				// 							page: '/material/form-controls/slidertoggle'
				// 						}
				// 					]
				// 				},
				// 				{
				// 					title: 'Navigation',
				// 					bullet: 'dot',
				// 					submenu: [
				// 						{
				// 							title: 'Menu',
				// 							page: '/material/navigation/menu'
				// 						},
				// 						{
				// 							title: 'Sidenav',
				// 							page: '/material/navigation/sidenav'
				// 						},
				// 						{
				// 							title: 'Toolbar',
				// 							page: '/material/navigation/toolbar'
				// 						}
				// 					]
				// 				},
				// 				{
				// 					title: 'Layout',
				// 					bullet: 'dot',
				// 					submenu: [
				// 						{
				// 							title: 'Card',
				// 							page: '/material/layout/card'
				// 						},
				// 						{
				// 							title: 'Divider',
				// 							page: '/material/layout/divider'
				// 						},
				// 						{
				// 							title: 'Expansion panel',
				// 							page: '/material/layout/expansion-panel'
				// 						},
				// 						{
				// 							title: 'Grid list',
				// 							page: '/material/layout/grid-list'
				// 						},
				// 						{
				// 							title: 'List',
				// 							page: '/material/layout/list'
				// 						},
				// 						{
				// 							title: 'Tabs',
				// 							page: '/material/layout/tabs'
				// 						},
				// 						{
				// 							title: 'Stepper',
				// 							page: '/material/layout/stepper'
				// 						},
				// 						{
				// 							title: 'Default Forms',
				// 							page: '/material/layout/default-forms'
				// 						},
				// 						{
				// 							title: 'Tree',
				// 							page: '/material/layout/tree'
				// 						}
				// 					]
				// 				},
				// 				{
				// 					title: 'Buttons & Indicators',
				// 					bullet: 'dot',
				// 					submenu: [
				// 						{
				// 							title: 'Button',
				// 							page: '/material/buttons-and-indicators/button'
				// 						},
				// 						{
				// 							title: 'Button toggle',
				// 							page: '/material/buttons-and-indicators/button-toggle'
				// 						},
				// 						{
				// 							title: 'Chips',
				// 							page: '/material/buttons-and-indicators/chips'
				// 						},
				// 						{
				// 							title: 'Icon',
				// 							page: '/material/buttons-and-indicators/icon'
				// 						},
				// 						{
				// 							title: 'Progress bar',
				// 							page: '/material/buttons-and-indicators/progress-bar'
				// 						},
				// 						{
				// 							title: 'Progress spinner',
				// 							page: '/material/buttons-and-indicators/progress-spinner'
				// 						},
				// 						{
				// 							title: 'Ripples',
				// 							page: '/material/buttons-and-indicators/ripples'
				// 						}
				// 					]
				// 				},
				// 				{
				// 					title: 'Popups & Modals',
				// 					bullet: 'dot',
				// 					submenu: [
				// 						{
				// 							title: 'Bottom sheet',
				// 							page: '/material/popups-and-modals/bottom-sheet'
				// 						},
				// 						{
				// 							title: 'Dialog',
				// 							page: '/material/popups-and-modals/dialog'
				// 						},
				// 						{
				// 							title: 'Snackbar',
				// 							page: '/material/popups-and-modals/snackbar'
				// 						},
				// 						{
				// 							title: 'Tooltip',
				// 							page: '/material/popups-and-modals/tooltip'
				// 						}
				// 					]
				// 				},
				// 				{
				// 					title: 'Data table',
				// 					bullet: 'dot',
				// 					submenu: [
				// 						{
				// 							title: 'Paginator',
				// 							page: '/material/data-table/paginator'
				// 						},
				// 						{
				// 							title: 'Sort header',
				// 							page: '/material/data-table/sort-header'
				// 						},
				// 						{
				// 							title: 'Table',
				// 							page: '/material/data-table/table'
				// 						}
				// 					]
				// 				}
				// 			]
				// 		},
				// 		{
				// 			title: 'Ng-Bootstrap',
				// 			bullet: 'dot',
				// 			icon: 'flaticon-web',
				// 			submenu: [
				// 				{
				// 					title: 'Accordion',
				// 					page: '/ngbootstrap/accordion'
				// 				},
				// 				{
				// 					title: 'Alert',
				// 					page: '/ngbootstrap/alert'
				// 				},
				// 				{
				// 					title: 'Buttons',
				// 					page: '/ngbootstrap/buttons'
				// 				},
				// 				{
				// 					title: 'Carousel',
				// 					page: '/ngbootstrap/carousel'
				// 				},
				// 				{
				// 					title: 'Collapse',
				// 					page: '/ngbootstrap/collapse'
				// 				},
				// 				{
				// 					title: 'Datepicker',
				// 					page: '/ngbootstrap/datepicker'
				// 				},
				// 				{
				// 					title: 'Dropdown',
				// 					page: '/ngbootstrap/dropdown'
				// 				},
				// 				{
				// 					title: 'Modal',
				// 					page: '/ngbootstrap/modal'
				// 				},
				// 				{
				// 					title: 'Pagination',
				// 					page: '/ngbootstrap/pagination'
				// 				},
				// 				{
				// 					title: 'Popover',
				// 					page: '/ngbootstrap/popover'
				// 				},
				// 				{
				// 					title: 'Progressbar',
				// 					page: '/ngbootstrap/progressbar'
				// 				},
				// 				{
				// 					title: 'Rating',
				// 					page: '/ngbootstrap/rating'
				// 				},
				// 				{
				// 					title: 'Tabs',
				// 					page: '/ngbootstrap/tabs'
				// 				},
				// 				{
				// 					title: 'Timepicker',
				// 					page: '/ngbootstrap/timepicker'
				// 				},
				// 				{
				// 					title: 'Tooltips',
				// 					page: '/ngbootstrap/tooltip'
				// 				},
				// 				{
				// 					title: 'Typehead',
				// 					page: '/ngbootstrap/typehead'
				// 				}
				// 			]
				// 		},
				// 	]
				// },
				// {
				// 	title: 'Applications',
				// 	root: true,
				// 	alignment: 'left',
				// 	toggle: 'click',
				// 	submenu: [
				// 		{
				// 			title: 'eCommerce',
				// 			bullet: 'dot',
				// 			icon: 'flaticon-business',
				// 			//permission: 'accessToECommerceModule',
				// 			submenu: [
				// 				{
				// 					title: 'Customers',
				// 					page: '/ecommerce/Department'
				// 				},
				// 				{
				// 					title: 'Products',
				// 					page: '/ecommerce/products'
				// 				},
				// 			]
				// 		},
				// 		{
				// 			title: 'User Management',
				// 			bullet: 'dot',
				// 			icon: 'flaticon-user',
				// 			submenu: [
				// 				{
				// 					title: 'Users',
				// 					page: '/user-management/users'
				// 				},
				// 				{
				// 					title: 'Roles',
				// 					page: '/user-management/roles'
				// 				}
				// 			]
				// 		},
				// 	]
				// },
				// {
				// 	title: 'Custom',
				// 	root: true,
				// 	alignment: 'left',
				// 	toggle: 'click',
				// 	submenu: [
				// 		{
				// 			title: 'Error Pages',
				// 			bullet: 'dot',
				// 			icon: 'flaticon2-list-2',
				// 			submenu: [
				// 				{
				// 					title: 'Error 1',
				// 					page: '/error/error-v1'
				// 				},
				// 				{
				// 					title: 'Error 2',
				// 					page: '/error/error-v2'
				// 				},
				// 				{
				// 					title: 'Error 3',
				// 					page: '/error/error-v3'
				// 				},
				// 				{
				// 					title: 'Error 4',
				// 					page: '/error/error-v4'
				// 				},
				// 				{
				// 					title: 'Error 5',
				// 					page: '/error/error-v5'
				// 				},
				// 				{
				// 					title: 'Error 6',
				// 					page: '/error/error-v6'
				// 				},
				// 			]
				// 		},
				// 		{
				// 			title: 'Wizard',
				// 			bullet: 'dot',
				// 			icon: 'flaticon2-mail-1',
				// 			submenu: [
				// 				{
				// 					title: 'Wizard 1',
				// 					page: '/wizard/wizard-1'
				// 				},
				// 				{
				// 					title: 'Wizard 2',
				// 					page: '/wizard/wizard-2'
				// 				},
				// 				{
				// 					title: 'Wizard 3',
				// 					page: '/wizard/wizard-3'
				// 				},
				// 				{
				// 					title: 'Wizard 4',
				// 					page: '/wizard/wizard-4'
				// 				},
				// 			]
				// 		},
				// 	]
				// },
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Web Setting',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/ngbootstrap/menus/websetting/websettings',
					bullet: 'dot',
				},
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				{
					title: 'User Management',
					root: true,
					icon: 'flaticon2-user',
					page: '/ngbootstrap/menus/usermenu',
					bullet: 'dot',
				},
				{
					title: 'Admin Setup',
					root: true,
					icon: 'flaticon2-avatar',
					page: '/ngbootstrap/adminmenu',
					bullet: 'dot',
				},

				{
					title: 'Customer',
					root: true,
					icon: 'flaticon-network',
					page: '/ngbootstrap/menus/customermenu',
					bullet: 'dot',
				},
				{
					title: 'Attendance',
					root: true,
					icon: 'flaticon-event-calendar-symbol',
					page: '/ngbootstrap/menus/attendancemenu',
					bullet: 'dot',
				},
				{
					title: 'Purchase Order',
					root: true,
					icon: 'flaticon-shopping-basket',
					page: '/ngbootstrap/menus/purchaseordermenu',
					bullet: 'dot',
				},
				{
					title: 'Sales & Profit',
					root: true,
					icon: 'flaticon-network',
					page: '/ngbootstrap/menus/salesmenu',
					bullet: 'dot',
				},
				{
					title: 'Inventory',
					root: true,
					icon: 'flaticon-map',
					page: '/ngbootstrap/menus/inventorymenu',
					bullet: 'dot',
				},


				{section: 'Components'},
				{
					title: 'Google Material',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-browser-2',
					submenu: [
						{
							title: 'Form Controls',
							bullet: 'dot',
							submenu: [
								{
									title: 'Auto Complete',
									page: '/material/form-controls/autocomplete',
									permission: 'accessToECommerceModule'
								},
								{
									title: 'Checkbox',
									page: '/material/form-controls/checkbox'
								},
								{
									title: 'Radio Button',
									page: '/material/form-controls/radiobutton'
								},
								{
									title: 'Datepicker',
									page: '/material/form-controls/datepicker'
								},
								{
									title: 'Form Field',
									page: '/material/form-controls/formfield'
								},
								{
									title: 'Input',
									page: '/material/form-controls/input'
								},
								{
									title: 'Select',
									page: '/material/form-controls/select'
								},
								{
									title: 'Slider',
									page: '/material/form-controls/slider'
								},
								{
									title: 'Slider Toggle',
									page: '/material/form-controls/slidertoggle'
								}
							]
						},
						{
							title: 'Navigation',
							bullet: 'dot',
							submenu: [
								{
									title: 'Menu',
									page: '/material/navigation/menu'
								},
								{
									title: 'Sidenav',
									page: '/material/navigation/sidenav'
								},
								{
									title: 'Toolbar',
									page: '/material/navigation/toolbar'
								}
							]
						},
						{
							title: 'Layout',
							bullet: 'dot',
							submenu: [
								{
									title: 'Card',
									page: '/material/layout/card'
								},
								{
									title: 'Divider',
									page: '/material/layout/divider'
								},
								{
									title: 'Expansion panel',
									page: '/material/layout/expansion-panel'
								},
								{
									title: 'Grid list',
									page: '/material/layout/grid-list'
								},
								{
									title: 'List',
									page: '/material/layout/list'
								},
								{
									title: 'Tabs',
									page: '/material/layout/tabs'
								},
								{
									title: 'Stepper',
									page: '/material/layout/stepper'
								},
								{
									title: 'Default Forms',
									page: '/material/layout/default-forms'
								},
								{
									title: 'Tree',
									page: '/material/layout/tree'
								}
							]
						},
						{
							title: 'Buttons & Indicators',
							bullet: 'dot',
							submenu: [
								{
									title: 'Button',
									page: '/material/buttons-and-indicators/button'
								},
								{
									title: 'Button toggle',
									page: '/material/buttons-and-indicators/button-toggle'
								},
								{
									title: 'Chips',
									page: '/material/buttons-and-indicators/chips'
								},
								{
									title: 'Icon',
									page: '/material/buttons-and-indicators/icon'
								},
								{
									title: 'Progress bar',
									page: '/material/buttons-and-indicators/progress-bar'
								},
								{
									title: 'Progress spinner',
									page: '/material/buttons-and-indicators/progress-spinner'
								},
								{
									title: 'Ripples',
									page: '/material/buttons-and-indicators/ripples'
								}
							]
						},
						{
							title: 'Popups & Modals',
							bullet: 'dot',
							submenu: [
								{
									title: 'Bottom sheet',
									page: '/material/popups-and-modals/bottom-sheet'
								},
								{
									title: 'Dialog',
									page: '/material/popups-and-modals/dialog'
								},
								{
									title: 'Snackbar',
									page: '/material/popups-and-modals/snackbar'
								},
								{
									title: 'Tooltip',
									page: '/material/popups-and-modals/tooltip'
								}
							]
						},
						{
							title: 'Data table',
							bullet: 'dot',
							submenu: [
								{
									title: 'Paginator',
									page: '/material/data-table/paginator'
								},
								{
									title: 'Sort header',
									page: '/material/data-table/sort-header'
								},
								{
									title: 'Table',
									page: '/material/data-table/table'
								}
							]
						}
					]
				},

				{section: 'Applications'},
				{
					title: 'eCommerce',
					bullet: 'dot',
					icon: 'flaticon2-list-2',
					root: true,
					permission: 'accessToECommerceModule',
					submenu: [
						{
							title: 'Customers',
							page: '/ecommerce/customers'
						},
						{
							title: 'Products',
							page: '/ecommerce/products'
						},
					]
				},

				{section: 'Custom'},
				{
					title: 'Error Pages',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-list-2',
					submenu: [
						{
							title: 'Error 1',
							page: '/error/error-v1'
						},
						{
							title: 'Error 2',
							page: '/error/error-v2'
						},
						{
							title: 'Error 3',
							page: '/error/error-v3'
						},
						{
							title: 'Error 4',
							page: '/error/error-v4'
						},
						{
							title: 'Error 5',
							page: '/error/error-v5'
						},
						{
							title: 'Error 6',
							page: '/error/error-v6'
						},
					]
				},
				{
					title: 'Wizard',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-mail-1',
					submenu: [
						{
							title: 'Wizard 1',
							page: '/wizard/wizard-1'
						},
						{
							title: 'Wizard 2',
							page: '/wizard/wizard-2'
						},
						{
							title: 'Wizard 3',
							page: '/wizard/wizard-3'
						},
						{
							title: 'Wizard 4',
							page: '/wizard/wizard-4'
						},
					]
				},
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
