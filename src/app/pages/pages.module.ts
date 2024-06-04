import {CommonModule} from "@angular/common";
import {PagesRoutingModule} from "./pages-routing.module";
import {NgModule} from "@angular/core";
import {EditorModule} from "primeng/editor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {TableModule} from 'primeng/table';
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {PagesComponent} from "./pages.component";

@NgModule({
    declarations: [PagesComponent],
    imports: [
        CommonModule,
        PagesRoutingModule,
        FormsModule,
        ToastrModule,
        ReactiveFormsModule,
        FormsModule,
        EditorModule,
        TableModule,
        TooltipModule.forRoot(),
    ]

})
export class PagesModule {
}
