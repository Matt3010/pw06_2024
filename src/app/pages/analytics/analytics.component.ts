import {AfterViewInit, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AnalyticsService} from "../../_services/analytics.service";
import {ItemService} from "../../_services/item.service";
import {FornitoriService} from "../../_services/fornitori.service";
import {CategoryService} from "../../_services/category.service";

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {
    items$ = this.itemService.items$;
    categories$ = this.categoryService.categories$;
    suppliers$ = this.supplierService.suppliers$;
    itemSelected: any;
    item: any;
    fornitore: any;
    marketSelected: any;
    category: any;
    weekForm: FormGroup = new FormGroup({
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required]),
        item: new FormControl('', [Validators.required]),
        marketplaceId: new FormControl('', [Validators.required]),
        weekRange: new FormControl('', [Validators.required]),
    });

    purchaseForm: FormGroup = new FormGroup({
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required]),
        category: new FormControl('', [Validators.required]),
        item: new FormControl('', [Validators.required]),
        supplier: new FormControl('', [Validators.required]),
        weekRange: new FormControl('', [Validators.required]),
    });

    step: 1 | 2 = 2;


    constructor(
        private analyticsService: AnalyticsService,
        private itemService: ItemService,
        private supplierService: FornitoriService,
        private categoryService: CategoryService,
    ) {

        this.weekForm.valueChanges.subscribe((res: any) => {
            this.analyticsService.fetchSales(res);
        });

        this.purchaseForm.valueChanges.subscribe((res: any) => {
            this.analyticsService.fetchPurchases(res);
        });
    }

    resetField(control: string) {
        switch (control) {
            case 'week':
                this.weekForm.controls['startDate'].setValue('');
                this.weekForm.controls['endDate'].setValue('');
                break;
            case 'startDate':
                this.weekForm.controls['startDate'].setValue('');
                break;
            case 'endDate':
                this.weekForm.controls['endDate'].setValue('');
                break;
            case 'weekP':
                this.purchaseForm.controls['startDate'].setValue('');
                this.purchaseForm.controls['endDate'].setValue('');
                break;
            case 'startDateP':
                this.purchaseForm.controls['startDate'].setValue('');
                break;
            case 'endDateP':
                this.purchaseForm.controls['endDate'].setValue('');
                break;
            case 'item':
                this.weekForm.controls['item'].setValue('');
                break;
            case 'itemP':
                this.purchaseForm.controls['item'].setValue('');
                this.itemSelected = null;
                break;
            case 'supplier':
                this.purchaseForm.controls['supplier'].setValue('');
                break;
            case 'category':
                this.purchaseForm.controls['category'].setValue('');
                break;
            case 'marketplaceId':
                this.weekForm.controls['marketplaceId'].setValue('');
                this.marketSelected = null;
                break;
            default:
                break;
        }
    }


    MarkeplaceDictionary = [
        {countryCode: 'A2EUQ1WTGCTBG2', countryName: 'Canada'},
        {countryCode: 'ATVPDKIKX0DER', countryName: 'United States'},
        {countryCode: 'A1PA6795UKMFR9', countryName: 'Germany'},
        {countryCode: 'A1RKKUPIHCS9HS', countryName: 'Spain'},
        {countryCode: 'A13V1IB3VIYZZH', countryName: 'France'},
        {countryCode: 'A21TJRUUN4KGV', countryName: 'India'},
        {countryCode: 'APJ6JRA9NG5V4', countryName: 'Italy'},
        {countryCode: 'A1F83G8C2ARO7P', countryName: 'United Kingdom'},
        {countryCode: 'A1VC38T7YXB528', countryName: 'Japan'},
        {countryCode: 'A2Q3Y263D00KWC', countryName: 'Brazil'},
        {countryCode: 'A1AM78C64UM0Y8', countryName: 'Mexico'},
        {countryCode: 'A39IBJ37TRP1C6', countryName: 'Australia'},
        {countryCode: 'A2VIGQ35RCS4UG', countryName: 'Turkey'},
        {countryCode: 'A2NODRKZP88ZB9', countryName: 'Singapore'},
        {countryCode: 'A19VAU5U5O7RUS', countryName: 'United Arab Emirates'},
        {countryCode: 'A33AVAJ2PDY3EV', countryName: 'Saudi Arabia'},
        {countryCode: 'AMEN7PMS3EDWL', countryName: 'Netherlands'},
        {countryCode: 'A1C3SOZRARQ6R3', countryName: 'Sweden'},
        {countryCode: 'A2NSMJVQY0RV9S', countryName: 'Poland'}
    ];
}
