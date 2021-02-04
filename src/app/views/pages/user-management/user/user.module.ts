// Angular Imports
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

// This Module's Components
import { UserComponent } from './user.component';

@NgModule({
    imports: [

    ],
    declarations: [
        UserComponent,
    ],
    exports: [
        UserComponent,
	],
	schemas:[
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class UserModule {

}
