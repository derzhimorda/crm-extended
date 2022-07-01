import { Component, OnInit } from '@angular/core';
import {IContent, ILayout} from "../../_metronic/layout/core/default-layout.config";
import {LayoutService} from "../../_metronic/layout";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  layoutPage: ILayout;
  content: IContent;

  constructor(private layout: LayoutService) { }

  ngOnInit(): void {
    this.layoutPage = this.layout.getConfig();
    this.layoutPage.content.width = 'fluid';
    this.layout.setConfig(this.layoutPage);
  }

}
