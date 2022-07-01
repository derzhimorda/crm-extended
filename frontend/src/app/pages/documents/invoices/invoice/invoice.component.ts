import { Component, OnInit } from '@angular/core';
import {IContent, ILayout} from "../../../../_metronic/layout/core/default-layout.config";
import {LayoutService} from "../../../../_metronic/layout";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf"

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  layoutPage: ILayout;
  content: IContent;
  constructor(private layout: LayoutService) { }

  ngOnInit(): void {
    this.layoutPage = this.layout.getConfig();
    this.layoutPage.content.width = 'fixed';
    this.layout.setConfig(this.layoutPage);
    console.log(this.layoutPage)
  }

  exportAsPDF(invoice: string) {
    let data: HTMLElement = document.getElementById(invoice)!;
    let docWidth = data.offsetWidth;
    let docHeight = data.offsetHeight;
    let aspectRatio = 3.78;
    let scale = 1.5;
    let resultWidth = (docWidth/aspectRatio)/scale;
    let resultHeight = (docHeight/aspectRatio)/scale;

    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
      let pdf = new jsPDF('p', 'mm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', (210 - resultWidth)/2, 10, resultWidth, resultHeight);
      pdf.save('Filename.pdf');
    });
  }
}
