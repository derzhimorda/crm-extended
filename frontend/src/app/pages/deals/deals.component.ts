import {Component, OnInit, ViewChild} from '@angular/core';
import {LayoutService} from "../../_metronic/layout";
import {IContent, ILayout} from "../../_metronic/layout/core/default-layout.config";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {NgSelectComponent} from "@ng-select/ng-select";
import {ActivatedRoute, Router} from "@angular/router";
import {ISettings} from "../../_metronic/layout/core/default-settings.config";
import {SettingsService} from "../../_metronic/layout/core/settings.service";
import {Client} from "../clients/clients.component";
import {DealsService} from "../../services/deals.service";
import {AuthService, UserType} from "../../modules/auth";
import {DealTask} from "./deal/deal.component";

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  layoutPage: ILayout;
  content: IContent;
  DEALS: Deal[];
  CLIENTS: Client[];
  USERS: UserType[];
  MANAGERS: UserType[];
  ADVISERS: UserType[];
  dealForm = new FormGroup({
    name: new FormControl(),
    deal_types_id: new FormControl([], [
      Validators.required
    ]),
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
  })
  filter = new FormControl('');
  filterStatus = new FormControl('');
  deals$: Observable<Deal[]>;
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
  settingsData: ISettings;
  currentUser: UserType;

  @ViewChild('filterClients') filterClientRef: NgSelectComponent

  constructor(private layout: LayoutService,
              private router: Router,
              private activeRouter: ActivatedRoute,
              private settings: SettingsService,
              private dealsService: DealsService,
              private auth: AuthService)
  {
    // let filterData = this.filter.valueChanges.pipe(
    //   startWith(''),
    //   map(text => this.search(text))
    // );
    //
    // let filterDataStatuses = this.filterStatus.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this.filterSt(value))
    // );

    this.deals$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );


  }

  ngOnInit(): void {
    this.layoutPage = this.layout.getConfig();
    this.layoutPage.content.width = 'fluid';
    this.layout.setConfig(this.layoutPage);
    this.settingsData = this.settings.getSettings();

    this.DEALS = this.activeRouter.snapshot.data.deals ?? [];
    this.CLIENTS = this.activeRouter.snapshot.data.clients ?? [];
    this.USERS = this.activeRouter.snapshot.data.users ?? [];

    this.USERS.map((user: any) => {
      user.roles?.map((roles:any) => {
        user.roles = [roles.role_id];
      });
    });

    this.MANAGERS = this.USERS.filter(user => user?.roles[0] == 4);
    this.ADVISERS = this.USERS.filter(user => user?.roles[0] == 3);

    // let filterStatuses = this.filterClientRef?.changeEvent.subscribe(data => console.log(data))

    this.currentUser = this.auth.currentUserValue;

    this.dealForm.patchValue({
      deal_types_id: 1,
      deal_statuses_id: 1,
      budget: 0,
      manager_id: this.currentUser?.id
    });

    // console.log(this.settings.getProp('pickup_types'))
  }

  search(text: any): Deal[] {
    return this.DEALS.filter(deal => {
      // let clientId = this.CLIENTS?.filter(client => client.client_name.includes(text))[0].user_id; //TODO search by client name
        return deal.name?.includes(text) || deal.budget == text || deal.id == text || deal.name?.toLowerCase().includes(text);
      })
  }

  filterStatusFunc(id:any) : Deal[]{
    return this.DEALS.filter(deal => {
      return deal.deal_statuses_id == id;
    })
  }

  getStatusNameById(id: number){
    let deal_statuses:any= this.settings.getProp('deal_statuses');
    return deal_statuses?.filter((x:any) => x.id == id)[0].name;
  }

  get dealStatuses():any{
    return this.settings.getProp('deal_statuses');
  }

  get dealTypes():any{
    return this.settings.getProp('deal_types');
  }

  get dealWays():any{
    return this.settings.getProp('delivery_ways');
  }

  get dealWayTypes():any{
    return this.settings.getProp('delivery_types');
  }

  get pickUpTypes():any{
    return this.settings.getProp('pickup_types');
  }

  get payTypes():any{
    return this.settings.getProp('pay_types');
  }

  linkDeal(id: any) {
    this.router.navigateByUrl(`/deals/${id}`);
  }

  newDeal() {
    if(!this.dealForm.valid){
      console.log(111)
      return;
    }

    this.dealsService.newDeal(this.dealForm.value).subscribe(data => {
      console.log(data)
    }, error => {
      console.log(error)
    });
    // console.log(this.dealForm.value)
  }

  getClientName(client_id: number) {
    return this.CLIENTS.filter(client => client.user_id == client_id)[0].name ?? '';
  }

  getClientAvatar(client_id: number) {
    return this.CLIENTS.filter(client => client.user_id == client_id)[0].profile_avatar ?? '';
  }

  // filterStatuses(data:any) {
  //   console.log(data.id)
  //
  //   let newObserver = new Observable();
  //
  //   this.deals$ = newObserver.pipe(
  //     map(value => this.filterSt(data.id))
  //   );
  // }
  //
  // filterSt(value: any): Deal[] {
  //   return this.DEALS?.filter(deal => {
  //     return deal.deal_statuses_id == value;
  //   })
  // }
}

export interface Deal{
  id: number | string | null,
  name: string,
  deal_types_id: number,
  deal_statuses_id: number,
  manager_id: number,
  adviser_id: number,
  delivery_ways_id: number,
  delivery_types_id: number,
  pickup_types_id: number,
  pay_types_id: number,
  client_id: number,
  inspector: number,
  budget: number,
  miscalculation: number,
  created_at: string,
  updated_at: string,
  client: Client,
  tasks: DealTask[],
  jobs: []
}
