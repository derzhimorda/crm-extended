import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LayoutService} from "../../_metronic/layout";
import {IContent, ILayout} from "../../_metronic/layout/core/default-layout.config";
import {TranslationService} from "../../modules/i18n";
import {NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {Subject} from "rxjs";
import {NgSelectComponent} from "@ng-select/ng-select";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {ISettings} from "../../_metronic/layout/core/default-settings.config";
import {SettingsService} from "../../_metronic/layout/core/settings.service";
import {map} from "rxjs/operators";
import {DealsService} from "../../services/deals.service";



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers: [NgbDropdownConfig]
})
export class ClientsComponent implements OnInit {
  layoutPage: ILayout;
  content: IContent;
  clientForm = new UntypedFormGroup({
    // used_id: new FormControl(),
    name: new UntypedFormControl(),
    mobile: new UntypedFormControl(),
    add_mobile: new UntypedFormControl(),
    email: new UntypedFormControl(),
    ySell: new UntypedFormControl(),
    company: new UntypedFormControl(),
    adviser_id: new UntypedFormControl(),
    manager_id: new UntypedFormControl(),
    work_status_id: new UntypedFormControl(),
    fb_status_id: new UntypedFormControl(),
    ref_option_id: new UntypedFormControl(),
    delivery_id: new UntypedFormControl(),
    fb_link: new UntypedFormControl(),
    tg_link: new UntypedFormControl(),
    vb_link: new UntypedFormControl(),
    profile_avatar: new UntypedFormControl(),
    google_link: new UntypedFormControl(),
    partner_fb: new UntypedFormControl(),
    position: new UntypedFormControl()
  });
  client: any;
  miscAvatar: string;
  cardActive: boolean = false;
  filter = new UntypedFormControl('');
  clients$: Subject<Client[]>;
  page = 1;
  pageSize = 4;
  file: string;
  dealForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    name: new UntypedFormControl(),
    budget: new UntypedFormControl(),
    deal_statuses_id: new UntypedFormControl(),
    manager_id: new UntypedFormControl(),
    adviser_id: new UntypedFormControl(),
    delivery_ways_id: new UntypedFormControl(),
    delivery_types_id: new UntypedFormControl(),
    pickup_types_id: new UntypedFormControl(),
    pay_types_id: new UntypedFormControl(),
    inspector: new UntypedFormControl(),
    deal_types_id: new UntypedFormControl(),
    client_id: new UntypedFormControl()
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
  filterStatus = new UntypedFormControl('');
  settingsData: ISettings;
  users: any;
  advisers: any;
  managers: any;
  clients: Client[];
  clientAdviser: any;
  clientManager: any;
  dataload: boolean = false;
  term = '';
  searchTerm = '';
  clientId: any = null;
  clientDeals: any;

  @ViewChild('filterClients') filterClientRef: NgSelectComponent
  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild('closeRemoveModal') closeRemoveModal: ElementRef;


  constructor(private layout: LayoutService,
              private config: NgbDropdownConfig,
              private apiUsers: UsersService,
              private route: ActivatedRoute,
              private settings: SettingsService,
              private dealApi: DealsService,
              private cRef: ChangeDetectorRef)
  {
    config.placement = 'bottom-end';
    config.autoClose = 'outside';
  }

  ngOnInit(): void {
    this.layoutPage = this.layout.getConfig();
    this.layoutPage.content.width = 'fluid';
    this.layout.setConfig(this.layoutPage);
    this.layout.initConfig();

    this.settingsData = this.settings.getSettings();

    // this.route.data.subscribe(({users}) => {
    //   this.users = users;
    //
    //   this.users.map((user: any) => {
    //     let UserRoles = user.roles ?? null;
    //     user.roles = [];
    //     UserRoles?.map((roles:any) => {
    //       user.roles.push(roles.role_id);
    //     });
    //   });
    //
    //   this.clients = this.users.filter((user:any) => user.roles[0] == 6);
    //   this.managers = this.users.filter((user:any) => user.roles[0] == 4);
    //   this.advisers = this.users.filter((user:any) => user.roles[0] == 3);
    // })

    this.getUsers();
  }

  getUsers(){
    this.apiUsers.getAllUsers().subscribe(data => {
      this.users = data;
      // this.cRef.detectChanges();

      this.users.map((user: any) => {
        let UserRoles = user.roles ?? null;
        user.roles = [];
        UserRoles?.map((roles:any) => {
          user.roles.push(roles.role_id);
        });
      });

      this.clients = this.users.filter((user:any) => user.roles[0] == 6);
      this.managers = this.users.filter((user:any) => user.roles[0] == 4);
      this.advisers = this.users.filter((user:any) => user.roles[0] == 3);
      console.log(this.clients)
    }, error => {
      console.log(error)
    });
  }

  getClientDeals(client_id:number){
    this.dealApi.getClientDeals(client_id).subscribe(data => {
     this.clientDeals = data;
    }, error => {
      console.log(error)
    });
  }

  openClientCard(id: number) {
    this.clientForm.reset();
    // this.clientDeals = [];
    this.client = this.clients.filter(client => client.user_id == id)[0];

    this.getClientDeals(this.client.user_id);
    this.cardActive = true;
  }

  getRandProfileImage(){
    const rand = Math.floor(Math.random() * 40) + 1;
    this.miscAvatar = `/assets/media/stock/600x600/img-${rand}.jpg`;
    return `/assets/media/stock/600x600/img-${rand}.jpg`;
  }

  newClient():void{
    console.log(this.clientForm.value);
    if(!this.clientForm.valid){
      return;
    }

    if(this.clientId !== null){
      this.apiUsers.editUser(this.clientForm.value, this.clientId).subscribe(data => {
        console.log(data);
        this.getUsers();
        this.closeModal.nativeElement.click();
      }, error => {
        console.log(error)
      });
    } else {
      if(this.miscAvatar){
        this.clientForm.patchValue({
          profile_avatar: this.miscAvatar
        })
      }

      this.apiUsers.makeNewUser(this.clientForm.value).subscribe(data => {
        console.log(data);
        this.getUsers();
        this.closeModal.nativeElement.click();
      }, error => {
        console.log(error)
      });
    }
  }

  loadFile(event: any) {
    this.miscAvatar = '';
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.miscAvatar = reader.result as string;
        this.file = reader.result as string;
      };
    }
  }

  newDeal() {

  }

  editClient(id: number) {
    this.miscAvatar = this.client.profile_avatar;
    this.clientForm.patchValue(this.client);
    this.clientId = this.client.user_id;
  }

  removeClient(id: number) {
    this.apiUsers.removeUser(id).subscribe(data => {
      this.getUsers();
      this.closeRemoveModal.nativeElement.click();
      }, error => {
      console.log(error)
    });
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
    if(event == ''){
      return this.clients;
    }
    let clients = this.clients;

    this.clients = clients.filter(client => {
      return client.name.includes(event);
    })


    console.log(this.clients);
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

  newUserModalTrigger() {
    this.clientForm.reset();
    this.client = null;
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
