// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { AdminsetupComponent } from './adminsetup.component';
import { CountryComponent } from './country/country.component';

@NgModule({
    imports: [

    ],
    declarations: [
        AdminsetupComponent,
        CountryComponent,
    ],
    exports: [
        AdminsetupComponent,
    ]
})
export class AdminsetupModule {

}
