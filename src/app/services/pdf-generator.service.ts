import { Injectable } from "@angular/core";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { SaleStateNames } from "./app.constants";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
    providedIn: 'root'
})
export class PdfGeneratorService {
    constructor() { }
    invoice = new Invoice();
    saleStateName=SaleStateNames;
    generatePDF(action = 'open') {
        console.log(this.invoice)
        let docDefinition: any = {

            content: [
                {
                    text: 'Veins Group of Companies',
                    fontSize: 16,
                    alignment: 'center',
                    color: '#047886'
                },
                {
                    text: this.invoice.status,
                    fontSize: 14,
                    bold: true,
                    alignment: 'center',
                    decoration: 'underline',
                    color: 'skyblue'
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
                        widths: this.invoice.type == 'customer' ?['*', 'auto', 'auto', 'auto', 'auto', 'auto']:['*', 'auto', 'auto', 'auto', 'auto'],
                        body:
                            this.invoice.type == 'customer' ? [
                                ['Quote number', 'Date', 'Subject', 'Status', 'Amount','Balance'],
                                ...this.invoice.items.map(p => ([p.sale_no, this.formatDate(p.date_created), p.subject, this.saleStateName[p.state],p.total, p.balance])),
                                [{ text: 'Total Balance', colSpan: 5 }, {}, {},{},{}, this.invoice.items.reduce((acc, p) => acc + parseFloat(p.balance), 0)]
                            ] : [
                                ['Product', 'Unit Price', 'Quantity', 'Discount', 'Amount'],
                                ...this.invoice.items.map(p => ([p.name, p.unit_price, p.qty, p.discount, p.total])),
                                [{ text: 'Total Amount', colSpan: 3 }, {}, {}, this.invoice.items_discount_total, this.invoice.total]
                            ]
                    }
                },
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
                        [{ qr: `${this.invoice.personName}`, fit: '50' }],
                        [{ text: 'Signature', alignment: 'right', italics: true }],
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
                {
                    ul: [
                        'Order can be return in max 10 days.',
                        'Warrenty of the product will be subject to the manufacturer terms and conditions.',
                        'This is system generated invoice.',
                    ],
                }
            ],
            styles: {
                sectionHeader: {
                    bold: true,
                    decoration: 'underline',
                    fontSize: 14,
                    margin: [0, 15, 0, 15]
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
    formatDate  (dateString:any) {
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
    constructor() {
        // Initially one empty product row we will show 
        this.items.push(new Product());
    }



}