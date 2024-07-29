import { Injectable } from "@angular/core";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { SaleStateNames } from "./app.constants";
import { AppService } from "./app.service";
import { content } from "html2canvas/dist/types/css/property-descriptors/content";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
    providedIn: 'root'
})
export class PdfGeneratorService {
    constructor(private appService: AppService) { }
    invoice = new Invoice();
    saleStateName = SaleStateNames;
    generatePDF(action = 'open') {
        console.log(this.invoice)
        let totalAmount = 0;
        let totalReturnAmount = 0;
        let docDefinition: any = {

            content: [
                {
                    columns: [
                        [{
                            columns: [
                                [{
                                    columns: [
                                        this.appService.currentSubOrg?.filename ? {
                                            image: this.appService.currentSubOrg?.filename,
                                            width: 24,
                                            margin: [0, 0, 5, 5],
                                            alignment: 'left',
                                        } : {}, {
                                            text: this.appService.currentSubOrg.name,
                                            fontSize: 24,
                                            bold: true,
                                            margin: [0, 0, 5, 5],
                                            alignment: 'left',

                                        }
                                    ]
                                },
                                {
                                    text: this.invoice.status,
                                    fontSize: 14,
                                    bold: true,
                                    alignment: 'left',
                                }],]
                        }],
                        [{

                            text: 'Veins Group of Companies,\n',
                            fontSize: 10,
                            alignment: 'right'
                        }, {
                            text: 'Choudhry Plaza, 1st Floor, Shop No. 1-6,\n',

                            fontSize: 10,
                            alignment: 'right'
                        }, {
                            text: 'Adjacent to Amazon Mall, GT Road, Islamabad',

                            fontSize: 10,
                            alignment: 'right'
                        }, {
                            text: 'Contact No: 0313 5444004',

                            fontSize: 10,
                            alignment: 'right'
                        },
                        ],

                    ]
                },


                {
                    text: this.invoice.invoiceDetailLabel,
                    style: 'sectionHeader'
                },
                {
                    columns: [
                        [
                            {
                                text: this.invoice.type === 'purchase' ? this.invoice.selectedVendor.name : this.invoice.type === 'sale' ? this.invoice.customer.name : this.invoice.personName,
                                bold: true
                            },
                            { text: this.invoice.address },
                            { text: this.invoice.email },
                            { text: this.invoice.contactNo }
                        ],
                        [
                            {
                                text: `Created By: ${this.invoice.created_by.name}`,
                                alignment: 'right'
                            }, {

                                text: `Date: ${this.formatDate(new Date(this.invoice.invoice_date))}`,
                                alignment: 'right'
                            },
                            {
                                text: this.invoice.type == 'purchase' ? 'PO - ' + this.invoice['purchase_no'] : '',
                                alignment: 'right'
                            }
                        ]
                    ]
                },
                {
                    text: 'Order Details :' + this.invoice.subject,
                    style: 'sectionHeader'
                },
                {
                    table: {
                        headerRows: 1,
                        widths: this.invoice.type == 'customer' ? ['*', 'auto', 'auto', 'auto', 'auto', 'auto'] : ['*', 'auto', 'auto', 'auto', 'auto'],
                        body:
                            this.invoice.type == 'customer' ? [
                                ['Quote number', 'Date', 'Subject', 'Status', 'Amount', 'Balance'],
                                ...this.invoice.items.map(p => ([p.sale_no, this.formatDate(p.date_created), p.subject, this.saleStateName[p.state], p.total, p.balance])),
                                [{ text: 'Total Balance', colSpan: 5 }, {}, {}, {}, {}, this.invoice.items.reduce((acc, p) => acc + parseFloat(p.balance), 0)]
                            ] : [
                                ['Product', 'Unit Price', 'Quantity', 'Discount', 'Amount'],
                                ... this.invoice.items.map(item => {
                                    // Create a new array combining the item and its return details
                                    const combinedItems = [[item.name, item.unit_price, item.qty, item.discount, item.total]];
                                    totalAmount += Number(item.total)
                                    return combinedItems;
                                }).flat(),
                                [{ text: 'Total Amount', colSpan: 3 }, {}, {}, this.invoice.items_discount_total, totalAmount]
                            ]
                    }
                },
                this.invoice.type == 'Sale' ? {
                    text: 'Return Details',
                    style: 'sectionHeader'
                } : {},
                this.invoice.type == 'Sale' ? {

                    table: {
                        headerRows: 1,
                        widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                        body:
                            [
                                ['Product', 'Unit Price', 'Quantity', 'Discount', 'Amount', 'Reason', 'Date'],
                                ... this.invoice.items.map(item => {
                                    // Create a new array combining the item and its return details
                                    const combinedItems = [...item.return_details.map((returnDetail: any) => {
                                        totalReturnAmount += Number(returnDetail.returnAmount);
                                        return [
                                            item.name,
                                            item.unit_price || '',
                                            returnDetail.qty || 0,
                                            returnDetail.charge || 0,
                                            returnDetail.returnAmount || 0,
                                            returnDetail.reason,
                                            this.formatDate(returnDetail.date_created),
                                        ]
                                    })];

                                    return combinedItems;
                                }).flat(),
                                [{ text: 'Total Return Amount', colSpan: 3 }, {}, {}, {}, {}, {}, totalReturnAmount]

                            ]
                    }
                } : {},
                this.invoice.type == 'Sale' || this.invoice.type == 'purchase' ? {
                    columns: [
                        [{
                            margin: [0, 5, 0, 5],
                            columns: [[
                                { text: `Shipping Charges` },
                                { text: `Additional Cost` },
                                { text: `Discount %` },
                                {
                                    text: `Discount`,
                                    style: 'summaryText'
                                },
                                {
                                    text: `Total`,
                                    style: 'summaryText'
                                }],
                            [
                                { text: this.invoice.shipment_charges || '0', alignment: 'right', italics: true },
                                { text: this.invoice.additional_cost || '0', alignment: 'right', italics: true },
                                { text: this.invoice.overall_discount || '0', alignment: 'right', italics: true },
                                {
                                    text: this.invoice.overall_discount_total || '0',
                                    style: 'summaryText', alignment: 'right', italics: true
                                },
                                {
                                    text: this.invoice.total || '0',
                                    style: 'summaryText', alignment: 'right', italics: true
                                }],
                            ],

                        }],
                        [{ alignment: 'right', qr: `${location.href}`, fit: '100', margin: [0, 5, 0, 5] }]
                    ]
                } : {},
                {
                    text: 'Additional Details',
                    style: 'sectionHeader'
                },
                {
                    text: this.invoice.additionalDetails,
                    margin: [0, 0, 0, 15]
                },
                {
                    columns: [
                        [{ text: 'Signature', italics: true }],
                        [],

                    ]
                },
                {
                    text: 'Terms and Conditions',
                    style: 'sectionHeader'
                },
                {
                    text: this.invoice.terms,
                    style: 'sectionHeader'
                },
            ],
            styles: {
                sectionHeader: {
                    bold: true,
                    fontSize: 12,
                    margin: [0, 15, 0, 15],
                },
                summaryText: {
                    bold: true,
                    fontSize: 12,
                    margin: [0, 5, 0, 5],
                },
                sectionFooter: {
                    height: 'auto',
                    fontSize: 11,
                    margin: [15, 15, 15, 15],
                    textAlign: 'center',
                },
                sectionSubFooter: {
                    fontSize: 11,
                    margin: [15, 15, 15, 15],
                    textAlign: 'center',
                }
            }
        };

        if (action === 'download') {
            pdfMake.createPdf(docDefinition).download();
        } else if (action === 'print') {
            pdfMake.createPdf(docDefinition).print();
        } else {
            pdfMake.createPdf(docDefinition).open();
        }

    }

    addProduct() {
        this.invoice.items.push(new Product());
    }
    formatDate(dateString: any) {
        const date = new Date(dateString);

        // Get day, month and year
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
        const year = date.getUTCFullYear();

        // Return formatted date
        return `${day}-${month}-${year}`;
    };
}

class Product {
    name: string;
    unit_price: number;
    discount: number;
    qty: number;
    total: number;
    sale_no?: any;
    date_created?: any;
    subject?: any;
    state?: any;
    balance?: any;
    return_details?: any;
    id?: any;
    isCustom?: any;
    reason?: any

}
class Invoice {
    type: string;
    invoiceDetailLabel: string;
    personName: string;
    address: string;
    contactNo: number;
    terms: string;
    email: string;
    items: Product[] = [];
    additionalDetails: string;
    status: string;
    total: number;
    items_discount_total: number;
    invoice_date: Date;
    created_by: any;
    selectedVendor?: any;
    customer?: any;
    subject: string;
    purchase_no?: string;
    shipment_charges?: any;
    additional_cost?: any;
    overall_discount?: any;
    overall_discount_total?: any;
    constructor() {
        // Initially one empty product row we will show 
        this.items.push(new Product());
    }



}