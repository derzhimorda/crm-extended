import {Component, OnInit, ViewChild} from '@angular/core';
import {LayoutService} from "../../_metronic/layout";
import {IContent, ILayout} from "../../_metronic/layout/core/default-layout.config";
import {TranslationService} from "../../modules/i18n";
import {NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";
import {find, Observable, startWith} from "rxjs";
import {NgSelectComponent} from "@ng-select/ng-select";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute, Route} from "@angular/router";
import {ISettings} from "../../_metronic/layout/core/default-settings.config";
import {SettingsService} from "../../_metronic/layout/core/settings.service";
import {map} from "rxjs/operators";
import {UserType} from "../../modules/auth";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers: [NgbDropdownConfig]
})
export class ClientsComponent implements OnInit {
  layoutPage: ILayout;
  content: IContent;
  clientForm = new FormGroup({
    used_id: new FormControl(),
    name: new FormControl(),
    mobile: new FormControl(),
    add_mobile: new FormControl(),
    email: new FormControl(),
    ySell: new FormControl(),
    company: new FormControl(),
    adviser_id: new FormControl(),
    manager_id: new FormControl(),
    work_status_id: new FormControl(),
    fb_status_id: new FormControl(),
    ref_option_id: new FormControl(),
    delivery_id: new FormControl(),
    fb_link: new FormControl(),
    tg_link: new FormControl(),
    vb_link: new FormControl(),
    profile_avatar: new FormControl(),
    google_link: new FormControl(),
  });
  client: Client;
  miscAvatar: string;
  statuses = [
    {
      id: 0,
      label: 'Не выбрано'
    },
    {
      id: 1,
      label: 'Работает с Ardi'
    },
    {
      id: 2,
      label: 'В процессе запуска'
    },
    {
      id: 3,
      label: 'Занимается'
    },
    {
      id: 4,
      label: 'Не занимается'
    },
  ]
  work_statuses = [
    {
      id: 1,
      label: 'Работает с Ardi'
    },
    {
      id: 2,
      label: 'В процессе запуска'
    },
    {
      id: 3,
      label: 'Занимается'
    },
    {
      id: 4,
      label: 'Не занимается'
    },
  ];
  fb_status = [
    {
      id: 1,
      label: 'Не заполнено'
    },
    {
      id: 2,
      label: 'Жду подтверждения'
    },
    {
      id: 3,
      label: 'Ведеться общение'
    },
    {
      id: 4,
      label: 'Друзья'
    },
    {
      id: 5,
      label: 'Нет FB'
    },
  ]
  afilate_types = [
    {
      id: 1,
      label: 'Нашли мы в FB'
    },
    {
      id: 2,
      label: 'Нашел нас в FB'
    },
    {
      id: 3,
      label: 'Чат с Игорем'
    },
    {
      id: 4,
      label: 'SH Grad'
    },
    {
      id: 5,
      label: 'Англ. Игорь'
    },
  ]
  delivery = [
    {
      id: 1,
      label: 'Unreal China'
    },
    {
      id: 2,
      label: 'Partner Trade'
    },
    {
      id: 3,
      label: 'Unicargo'
    },
    {
      id: 4,
      label: 'FBA Help'
    },
    {
      id: 5,
      label: 'Поставищик'
    },
  ]
  cardActive: boolean = false;
  filter = new FormControl('');
  CLIENTS: Client[];
  clients$: Observable<Client[]>;
  page = 1;
  pageSize = 4;
  // collectionSize = this.CLIENTS.length;
  file: string;
  dealForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    budget: new FormControl(),
    deal_statuses_id: new FormControl(),
    manager_id: new FormControl(),
    adviser_id: new FormControl(),
    delivery_ways_id: new FormControl(),
    delivery_types_id: new FormControl(),
    pickup_types_id: new FormControl(),
    pay_types_id: new FormControl(),
    inspector: new FormControl(),
    deal_types_id: new FormControl(),
    client_id: new FormControl()
  });
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
      label: 'Pickup'
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
      label: 'Оплата агенту'
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
    },
  ]
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
  filterStatus = new FormControl('');
  settingsData: ISettings;
  users: any;
  advisers: any;
  managers: any;
  clients: Client[];
  clientAdviser: any;
  clientManager: any;
  dataload: boolean = false;

  @ViewChild('filterClients') filterClientRef: NgSelectComponent

  constructor(private layout: LayoutService,
              private config: NgbDropdownConfig,
              private apiUsers: UsersService,
              private route: ActivatedRoute,
              private settings: SettingsService)
  {
    config.placement = 'bottom-end';
    config.autoClose = 'outside';
  }

  ngOnInit(): void {
    this.layoutPage = this.layout.getConfig();
    this.layoutPage.content.width = 'fluid';
    this.layout.setConfig(this.layoutPage);

    // this.getRandProfileImage();

    this.users = this.route.snapshot.data.users ?? [];
    //
    // this.getUsers();

    if(this.users){
      this.users.map((user: any) => {
        let UserRoles = user.roles ?? null;
        user.roles = [];
        UserRoles?.map((roles:any) => {
          user.roles.push(roles.role_id);
        });
      });

      //First role this is Main role, everything after this additional roles
      this.advisers = this.users.filter((user:any) => user.roles[0] == 3)
      this.managers = this.users.filter((user:any) => user.roles[0] == 4)
      this.clients = this.users.filter((user:any) => user.roles[0] == 6)

      // this.clients$ = this.clients;

    }
    this.settingsData = this.settings.getSettings();

  }

  getUsers(){
    this.apiUsers.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  openClientCard(id: number) {
    this.clientForm.reset();
    this.client = this.clients.filter(x => x.user_id == id)[0];

    this.clientAdviser = this.advisers.filter((x:any) => x.user_id == this.client.adviser_id)
    this.cardActive = true;
  }

  getRandProfileImage(){
    const rand = Math.floor(Math.random() * 40) + 1;
    // this.miscAvatar = `/assets/media/stock/600x600/img-${rand}.jpg`;
    return `/assets/media/stock/600x600/img-${rand}.jpg`;
  }

  getStatusNameById(id: number){
    return this.work_statuses.filter((x:any) => x.id == id)[0].label;
  }

  newClient():void{

  }

  loadFile(event: any) {
    this.miscAvatar = '';
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.miscAvatar = reader.result as string;
      };
    }
  }

  newDeal() {

  }

  editClient(id: number) {
    this.miscAvatar = this.client.profile_avatar;
    this.clientForm.patchValue(this.client);
  }

  removeClient(event: any) {
    event.preventDefault();
  }

  getClientOption(optionName:string, optionId?:number){
    const options:any = this.settings.getProp(optionName);
    if(optionId){
      return options.find((value:any) => value.id == optionId).name;
    } else {
      return options;
    }
  }

  search(event:any) {
    console.log(event.value);
    this.clients = this.clients.filter(client => {
      return client.name.includes(event);
    })
  }

  getManagerName(manager_id:number | undefined){
    if(manager_id !== undefined) {
      let filterUsers = this.managers.filter((manager: any) => manager.id == manager_id);
      if (filterUsers.length > 0) {
        return filterUsers[0].name;
      } else {
        return null;
      }
    }
  }

  getAdviserName(adviser_id:number | undefined){
    if(adviser_id !== undefined){
      let filterUsers = this.advisers.filter((adviser:any) => adviser.id == adviser_id);
      if(filterUsers.length > 0){
        return filterUsers[0].name;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}

export interface Client{
  user_id: number,
  name: string,
  mobile: string,
  add_mobile: string,
  email: string,
  ySell: string,
  company: string,
  partner_fb: string,
  position: string,
  adviser_id: number,
  manager_id: number,
  work_status_id: number,
  fb_status_id: number,
  ref_option_id: number,
  delivery_id: number,
  fb_link: string,
  tg_link: string,
  vb_link: string,
  profile_avatar: string,
  google_link: string,
  roles: [any]
}

export interface Role{
  role_id: number,
  user_id: number
}
