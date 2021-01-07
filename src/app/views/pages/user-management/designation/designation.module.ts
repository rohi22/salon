// Angular Imports
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

// This Module's Components
import { DesignationComponent } from './designation.component';

@NgModule({
    imports: [
    ],
    declarations: [
		DesignationComponent,

    ],
    exports: [
        DesignationComponent,
	],
	schemas:[
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class DesignationModule {

}
