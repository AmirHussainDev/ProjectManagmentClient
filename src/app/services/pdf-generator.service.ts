import { Injectable } from "@angular/core";
import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
import { SaleStateNames } from "./app.constants";
import { AppService } from "./app.service";

import { UserService } from "./user.service";

pdfMake.fonts = {
    Lobster: {
        normal: 'Lobster-Regular.ttf',
        bold: 'Lobster-Regular.ttf',
        italics: 'Lobster-Regular.ttf',
        bolditalics: 'Lobster-Regular.ttf'
    },
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-Italic.ttf'
    },
};
@Injectable({
    providedIn: 'root'
})
export class PdfGeneratorService {
    constructor(private appService: AppService, private userService: UserService) { }
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

                            text: 'Eleware ,\n',
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
                                text: this.invoice.personName,
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

                                text: `Date: ${this.formatDate(new Date(this.invoice.date_created))}`,
                                alignment: 'right'
                            },
                            {
                                text: 'Task - ' + this.invoice['task_no'],
                                alignment: 'right'
                            }
                        ]
                    ]
                },
                {
                    text: 'Order Details: ' + this.invoice.title,
                    style: 'sectionHeader'
                },

                {
                    text: 'Description: ' + this.invoice.description,
                    style: 'sectionHeader'
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
                    text: this.userService.loggedInUser.name, 
                    style: 'signatureStyle',
                    alignment: 'right', 

                },
                {
                    text:this.formatDate(new Date()), 
                    alignment: 'right', 

                },
                {
                    columns: [
                        [{ text: 'Signature', italics: true,                    decoration:'underline',bold:true,
                            alignment: 'right', 

                        }],

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
               
                columnStyle: {
                    fontSize: 12,
                    alignment: 'left',
                    textAlign: 'right',

                    noWrap: false,  // Allows text to wrap within the column
                    wordBreak: 'break-all', // Ensures words break if too long for the column width
                },
                columnStyleNumeric: {
                    fontSize: 12,
                    alignment: 'right',
                    textAlign: 'right',
                    noWrap: false,  // Allows text to wrap within the column
                    wordBreak: 'break-all', // Ensures words break if too long for the column width
                },
                sectionHeader: {
                    bold: true,
                    fontSize: 12,
                    margin: [0, 15, 0, 15],
                },
                signatureStyle: {
                    font: 'Lobster',
                    bold: true,
                    italics: true
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
            pdfMake.createPdf(docDefinition).download(this.invoice.type+'-'+this.invoice.task_no
            );
        } else if (action === 'print') {
            pdfMake.createPdf(docDefinition).print();
        } else {
            pdfMake.createPdf(docDefinition).open();
        }

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

class Invoice {
    type: string;
    invoiceDetailLabel: string;
    personName: string;
    address: string;
    contactNo: number;
    terms: string;
    email: string;
    additionalDetails: string;
    status: string;
    created_by: any;
    date_created:Date;
    title: string;
    task_no?:string;
    description?:string;
    id?: string;
    constructor() {
        // Initially one empty product row we will show 
    }



}