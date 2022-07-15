import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IContent, ILayout} from "../../../_metronic/layout/core/default-layout.config";
import {LayoutService} from "../../../_metronic/layout";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DealsService} from "../../../services/deals.service";
import {Deal} from "../deals.component";
import {SettingsService} from "../../../_metronic/layout/core/settings.service";
import {ISettings} from "../../../_metronic/layout/core/default-settings.config";
import {AuthService, UserType} from "../../../modules/auth";
import {UsersService} from "../../../services/users.service";

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit {
  layoutPage: ILayout;
  content: IContent;
  DEAL: Deal;
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
  tasksForm = new FormGroup({
    id: new FormControl(),
    type: new FormControl(),
    description: new FormControl(),
    changed_option: new FormControl(),
    changed_from_id: new FormControl(),
    changed_to_id: new FormControl(),
    deal_id: new FormControl(),
    client_id: new FormControl(),
    manager_id: new FormControl()
  });
  textMessage = new FormControl();
  dealId: any;
  clientDeals: any;
  clientJobs: any;
  loadData: boolean = false;
  settingsData: ISettings;
  user: UserType;
  managers: any;
  advisers: any;
  users: any;
  private files: any;


  constructor(private layout: LayoutService,
              private route: ActivatedRoute,
              private router: Router,
              private dealsService: DealsService,
              private settings: SettingsService,
              private auth: AuthService,
              private usersService: UsersService,
              private cdRef:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.layoutPage = this.layout.getConfig();
    this.layoutPage.content.width = 'fluid';
    this.layout.setConfig(this.layoutPage);

    this.route.paramMap.subscribe(params => {
      this.dealId = params.get('id') ? params.get('id') : null;
    });

    this.loadDeal();
    this.loadUsers();

    this.user = this.auth.currentUserValue;
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  loadDeal(){
    this.dealsService.getDeal(this.dealId).subscribe((data:any) => {
      this.dealForm.patchValue(data);
      this.DEAL = data;

      this.DEAL.tasks = this.DEAL.tasks.sort((a, b) => b.id - a.id);

      Object.values(this.DEAL.tasks).map((task:any) => {
        if(task.files){
          task.files = JSON.parse(task.files);
        }
      });

      this.loadData = true;

      console.log(this.dealForm.value)
    });
  }

  getStatusNameById(id: number | undefined){
    if(id){
      let deal_statuses:any = this.settings.getProp('deal_statuses');
      return deal_statuses?.filter((x:any) => x.id == id)[0].name;
    }
  }

  newDeal() {
     if(!this.dealForm.valid){
       return;
     }

     this.dealsService.newDeal(this.dealForm.value).subscribe(data => {
       console.log(data);
     }, error => {
       console.log(error);
     });
  }

  editDeal() {
    console.log(11)
  }

  removeDeal(){
    if(confirm('Вы уверены, что хотите удалить сделку?')){
      //todo
    }
  }

  loadFile($event: Event) {

  }

  newDealTrigger(){
    this.dealForm.reset();
  }

  addJob(){

  }

  editJob(id:number){

  }

  completeJob(id:number){

  }

  removeJob(id:number){

  }

  link(id: number) {
    this.router.navigateByUrl(`/invoices/${id}`);
  }

  private loadUsers() {
    this.usersService.getAllUsers().subscribe(data => {
      this.users = data;

      this.users?.map((user: any) => {
        let UserRoles = user.roles ?? null;
        user.roles = [];
        UserRoles?.map((roles:any) => {
          user.roles.push(roles.role_id);
        });
      });

      this.advisers = this.users?.filter((user:any) => user.roles[0] == 3)
      this.managers = this.users?.filter((user:any) => user.roles[0] == 4)
    });
  }

  getUserPic(id:number | undefined){
    if(id){
      return this.users?.filter((x:any) => x.id == id)[0].profile_avatar
    }
  }

  getUserName(id:number | undefined){
    if(id){
      return this.users.filter((x:any) => x.id == id)[0].name
    }
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

  sendTask() {
    let filesData: any;
    const taskType = 1;
    let sendData = new FormData();

    if(this.tasksForm.value.description == null && this.files == null){
      return;
    }

    if(this.files){
      for (const file in this.files) {
        sendData.append('files[]', this.files[file]);
      }
    }

    this.tasksForm.patchValue({
      type: taskType,
      deal_id: this.dealId,
      client_id: this.DEAL?.client_id,
      manager_id: this.DEAL?.manager_id
    });

    if(this.tasksForm.value.id !== null){
      if(this.files){
        this.dealsService.editDealTask(this.tasksForm.value, sendData).subscribe((data: any) => {
            this.tasksForm.reset();
            // this.loadTasks();
            this.files = null;
          },
          error => {
            console.log(error);
          });
      } else {
        this.dealsService.editDealTask(this.tasksForm.value).subscribe((data: any) => {
            this.tasksForm.reset();
            // this.loadTasks();

          },
          error => {
            console.log(error);
          });
      }
    } else {
      if(this.files){
        this.dealsService.addTaskDeal(this.tasksForm.value, sendData).subscribe((data: any) => {
            this.tasksForm.reset();
            // this.loadTasks();
            this.files = null;

          },
          error => {
            console.log(error);
          });
      } else {
        this.dealsService.addTaskDeal(this.tasksForm.value).subscribe((data: any) => {
            this.tasksForm.reset();
            this.reloadComponent();
          },
          error => {
            console.log(error);
          });
      }
    }
  }
}

export interface DealTask{
  id: number,
  type: number,
  changed_from_id: number,
  changed_option: number,
  changed_to_id: number,
  client_id: number,
  deal_id: number,
  description: string,
  files: File[],
  manager_id: number,
  created_at: string,
  updated_at: string
}

export interface File{
  file: string,
  path: string
}
