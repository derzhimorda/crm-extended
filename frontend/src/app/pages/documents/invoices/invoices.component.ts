import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {IContent, ILayout} from "../../../_metronic/layout/core/default-layout.config";
import {LayoutService} from "../../../_metronic/layout";

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  layoutPage: ILayout;
  content: IContent;

  constructor(private router: Router, private layout: LayoutService) { }

  ngOnInit(): void {
    this.layoutPage = this.layout.getConfig();
    this.layoutPage.content.width = 'fluid';
    this.layout.setConfig(this.layoutPage);
  }

  linkInvoice(id: number) {
    this.router.navigateByUrl(`/invoices/${id}`);
  }
}
