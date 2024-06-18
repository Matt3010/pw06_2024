import { Component } from '@angular/core';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AnalyticsService } from "../../_services/analytics.service";
import { ItemService } from "../../_services/item.service";
import { FornitoriService } from "../../_services/fornitori.service";
import { CategoryService } from "../../_services/category.service";

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {
    selectedWeek: { start: Date, end: Date };
    items$ = this.itemService.items$;
    categories$ = this.categoryService.categories$;
    suppliers$ = this.supplierService.suppliers$;
    itemSelected: any;
    item: any;
    fornitore: any;
    marketSelected: any;
    category: any;
    weekForm: FormGroup = new FormGroup({
        startDate: new FormControl(null, [Validators.required]),
        endDate: new FormControl(null, [Validators.required]),
        item: new FormControl('', [Validators.required]),
        marketplaceId: new FormControl('', [Validators.required]),
    });

    purchaseForm: FormGroup = new FormGroup({
        startDate: new FormControl(null, [Validators.required]),
        endDate: new FormControl(null, [Validators.required]),
        category: new FormControl(null, [Validators.required]),
        item: new FormControl('', [Validators.required]),
        supplier: new FormControl('', [Validators.required]),
    });

    constructor(
        private analyticsService: AnalyticsService,
        private itemService: ItemService,
        private supplierService: FornitoriService,
        private categoryService: CategoryService,
    ) {
        this.selectedWeek = this.getCurrentWeek();

        this.weekForm.valueChanges.subscribe((res: any) => {
            this.analyticsService.fetchSales(res);
        });

        this.purchaseForm.valueChanges.subscribe((res: any) => {
            this.analyticsService.fetchPurchases(res);
        });
    }

    step: 1 | 2 = 2;

    getCurrentWeek(): { start: Date, end: Date } {
        const today = moment().startOf('day');
        const startOfWeek = today.clone().startOf('week').toDate(); // Monday
        const endOfWeek = today.clone().endOf('week').toDate(); // Sunday
        return { start: startOfWeek, end: endOfWeek };
    }

    weekSelected(event: any): void {
        const startDate = moment(event.target.value).startOf('week').toDate();
        const endDate = moment(event.target.value).endOf('week').toDate();
        this.selectedWeek = { start: startDate, end: endDate };
        this.weekForm.controls['startDate'].setValue(startDate);
        this.weekForm.controls['endDate'].setValue(endDate);
    }

    weekSelectedP(event: any): void {
        const startDate = moment(event.target.value).startOf('week').toDate();
        const endDate = moment(event.target.value).endOf('week').toDate();
        this.selectedWeek = { start: startDate, end: endDate };
        this.purchaseForm.controls['startDate'].setValue(startDate);
        this.purchaseForm.controls['endDate'].setValue(endDate);
    }

    setFormDate(control: string, event: any) {
        if (control === 'startDate') {
            const startDate = moment(event.target.value).startOf('week').toDate();
            this.weekForm.controls['startDate'].setValue(startDate);
        } else if (control === 'endDate') {
            const endDate = moment(event.target.value).endOf('week').toDate();
            this.weekForm.controls['endDate'].setValue(endDate);
        }
    }

    setFormDateP(control: string, event: any) {
        if (control === 'startDate') {
            const startDate = moment(event.target.value).startOf('week').toDate();
            this.purchaseForm.controls['startDate'].setValue(startDate);
        } else if (control === 'endDate') {
            const endDate = moment(event.target.value).endOf('week').toDate();
            this.purchaseForm.controls['endDate'].setValue(endDate);
        }
    }

    setItem(item: string) {
        this.weekForm.controls['item'].setValue(item);
    }

    setItemP(item: string) {
        this.purchaseForm.controls['item'].setValue(item);
    }

    setSupplier(item: string) {
        this.purchaseForm.controls['supplier'].setValue(item);
    }

    setCategory(item: string) {
        this.purchaseForm.controls['category'].setValue(item);
    }

    setMarketPlace(item: string) {
        this.weekForm.controls['marketplaceId'].setValue(item);
    }

    MarkeplaceDictionary = [
        { countryCode: 'A2EUQ1WTGCTBG2', countryName: 'Canada' },
        { countryCode: 'ATVPDKIKX0DER', countryName: 'United States' },
        { countryCode: 'A1PA6795UKMFR9', countryName: 'Germany' },
        { countryCode: 'A1RKKUPIHCS9HS', countryName: 'Spain' },
        { countryCode: 'A13V1IB3VIYZZH', countryName: 'France' },
        { countryCode: 'A21TJRUUN4KGV', countryName: 'India' },
        { countryCode: 'APJ6JRA9NG5V4', countryName: 'Italy' },
        { countryCode: 'A1F83G8C2ARO7P', countryName: 'United Kingdom' },
        { countryCode: 'A1VC38T7YXB528', countryName: 'Japan' },
        { countryCode: 'A2Q3Y263D00KWC', countryName: 'Brazil' },
        { countryCode: 'A1AM78C64UM0Y8', countryName: 'Mexico' },
        { countryCode: 'A39IBJ37TRP1C6', countryName: 'Australia' },
        { countryCode: 'A2VIGQ35RCS4UG', countryName: 'Turkey' },
        { countryCode: 'A2NODRKZP88ZB9', countryName: 'Singapore' },
        { countryCode: 'A19VAU5U5O7RUS', countryName: 'United Arab Emirates' },
        { countryCode: 'A33AVAJ2PDY3EV', countryName: 'Saudi Arabia' },
        { countryCode: 'AMEN7PMS3EDWL', countryName: 'Netherlands' },
        { countryCode: 'A1C3SOZRARQ6R3', countryName: 'Sweden' },
        { countryCode: 'A2NSMJVQY0RV9S', countryName: 'Poland' }
    ];
}