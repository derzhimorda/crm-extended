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
import {Table} from "primeng/table";



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
  loading: boolean = true;

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
    this.apiUsers.getAllClients().toPromise().then(data => {
      this.clients = data;
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

  clear(table: Table) {
    table.clear();
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
