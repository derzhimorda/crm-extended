import { Component, OnInit } from '@angular/core';
import {IContent, ILayout} from "../../../_metronic/layout/core/default-layout.config";
import {LayoutService} from "../../../_metronic/layout";
import {FormControl, FormGroup} from "@angular/forms";
import {Deal} from "../deals.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit {
  layoutPage: ILayout;
  content: IContent;
  dealForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    deal_types_id: new FormControl(),
    deal_statuses_id: new FormControl(),
    manager_id: new FormControl(),
    adviser_id: new FormControl(),
    delivery_ways_id: new FormControl(),
    delivery_types_id: new FormControl(),
    pickup_types_id: new FormControl(),
    pay_types_id: new FormControl(),
    client_id: new FormControl(),
    inspector: new FormControl(),
    budget: new FormControl(),
    created_at: new FormControl(),
    updated_at: new FormControl(),
  });
  taskForm = new FormGroup({
    // id: new FormControl(),
    // deal_id: new FormControl(),
    // user_id: new FormControl(),
    // date: new FormControl(),
    // time: new FormControl(),
    // message: new FormControl(),
    // job_type_id: new FormControl(),
    // result_message: new FormControl(),
    // end_time: new FormControl(),
    // status: new FormControl()
  });
  jobForm = new FormGroup({
    id: new FormControl(),
    deal_id: new FormControl(),
    user_id: new FormControl(),
    date: new FormControl(),
    time: new FormControl(),
    message: new FormControl(),
    job_type_id: new FormControl(),
    result_message: new FormControl(),
    end_time: new FormControl(),
    status: new FormControl()
  });
  invoiceForm = new FormGroup({

  });
  textMessage = new FormControl();
  deal_statuses = [
    {
      id: 1,
      label: 'Запрос данных'
    },
    {
      id: 2,
      label: 'Просчет логиста'
    },
    {
      id: 3,
      label: 'Согласование деталей'
    },
    {
      id: 4,
      label: 'Pick-Up'
    },
    {
      id: 5,
      label: 'Выставлен счет'
    },
    {
      id: 6,
      label: 'Оплачено клиентом'
    },
    {
      id: 7,
      label: 'Ожидание оплаты агенту'
    },
    {
      id: 8,
      label: 'Процент не выплачен'
    },
    {
      id: 9,
      label: 'Успешно реализована'
    },
    {
      id: 10,
      label: 'Закрыта'
    }
  ];
  delivery_ways = [
    {
      id: 1,
      label: 'Украина'
    },
    {
      id: 2,
      label: 'Китай'
    },
    {
      id: 3,
      label: 'Другое'
    },
    {
      id: 4,
      label: '--'
    },
  ];
  delivery_types = [
    {
      id: 1,
      label: 'авиа экспресс'
    },
    {
      id: 2,
      label: 'авиа фрахт'
    },
    {
      id: 3,
      label: 'море'
    },
    {
      id: 4,
      label: 'море + авиа'
    },
    {
      id: 5,
      label: '--'
    },
  ];
  pickup_types = [
    {
      id: 1,
      label: 'EXW мы'
    },
    {
      id: 2,
      label: 'FOB производ.'
    },
    {
      id: 3,
      label: '--'
    },
  ];
  pay_types = [
    {
      id: 1,
      label: 'Payoneer'
    },
    {
      id: 2,
      label: 'Euro Bank'
    },
    {
      id: 3,
      label: 'Cash'
    },
    {
      id: 4,
      label: 'USA Bank'
    },
    {
      id: 5,
      label: 'Приват 24'
    },
    {
      id: 6,
      label: '--'
    },
  ];
  managers = [
    {
      id: 1,
      label: 'Наталья'
    },
    {
      id: 2,
      label: 'Евгений'
    },
    {
      id: 3,
      label: 'Игорь'
    },
    {
      id: 4,
      label: 'Анастасия'
    },
  ];
  jobTypes: any = [
    {
      id: 1, name: 'Связаться', icon: ''
    },
    {
      id: 2, name: 'Встреча', icon: ''
    },
    {
      id: 3, name: 'Получить данные', icon: ''
    },
    {
      id: 4, name: 'Дать просчет', icon: ''
    },
    {
      id: 5, name: 'Получить решение', icon: ''
    },
    {
      id: 6, name: 'Выставить счет', icon: ''
    },
    {
      id: 7, name: 'Контроль доставок', icon: ''
    },
    {
      id: 8, name: 'Оплата агенту', icon: ''
    },
  ]
  dealId: any;
  clientDeals: any;
  clientJobs: any;

  constructor(private layout: LayoutService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.layoutPage = this.layout.getConfig();
    this.layoutPage.content.width = 'fluid';
    this.layout.setConfig(this.layoutPage);

    this.route.paramMap.subscribe(params => {
      this.dealId = params.get('id') ? params.get('id') : null;
    });

    this.dealForm.patchValue({
      id: 1, name: 'СДелка от Лебедевой от 12.04.2022', deal_types_id: 1, deal_statuses_id: 1, manager_id: 1, adviser_id: 1,
      delivery_ways_id: 1, delivery_types_id: 1, pickup_types_id: 1, client_id: 1, inspector: 0, budget: 5000, pay_types_id: 1, miscalculation: 1,
      created_at: '29.06.2022', updated_at: '29.06.2022'
    });
  }

  newDeal() {

  }

  editDeal() {

  }

  removeDeal(){
    if(confirm('Вы уверены, что хотите удалить сделку?')){
      //todo
    }
  }

  loadFile($event: Event) {

  }

  editDealTrigger() {
    this.dealForm.reset();
    this.dealForm.patchValue({
      id: 1, name: 'СДелка от Лебедевой от 12.04.2022', deal_types_id: 1, deal_statuses_id: 1, manager_id: 1, adviser_id: 1,
      delivery_ways_id: 1, delivery_types_id: 1, pickup_types_id: 1, client_id: 1, inspector: 0, budget: 5000, pay_types_id: 1, miscalculation: 1,
      created_at: '29.06.2022', updated_at: '29.06.2022'
    });
  }

  newDealTrigger(){
    this.dealForm.reset();
  }

  sendMessage() {
    this.textMessage.reset()
  }

  editJob(id:number){

  }

  completeJob(id:number){

  }

  removeJob(id:number){

  }
}
