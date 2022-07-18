import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IContent, ILayout} from "../../../_metronic/layout/core/default-layout.config";
import {LayoutService} from "../../../_metronic/layout";
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
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
  dealForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    name: new UntypedFormControl(),
    deal_types_id: new UntypedFormControl(),
    deal_statuses_id: new UntypedFormControl(),
    manager_id: new UntypedFormControl(),
    adviser_id: new UntypedFormControl(),
    delivery_ways_id: new UntypedFormControl(),
    delivery_types_id: new UntypedFormControl(),
    pickup_types_id: new UntypedFormControl(),
    pay_types_id: new UntypedFormControl(),
    client_id: new UntypedFormControl(),
    inspector: new UntypedFormControl(),
    budget: new UntypedFormControl(),
    created_at: new UntypedFormControl(),
    updated_at: new UntypedFormControl(),
  });
  jobForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    deal_id: new UntypedFormControl(),
    user_id: new UntypedFormControl(),
    date: new UntypedFormControl(),
    time: new UntypedFormControl(),
    message: new UntypedFormControl(),
    job_type_id: new UntypedFormControl(),
    result_message: new UntypedFormControl(),
    end_time: new UntypedFormControl(),
    status: new UntypedFormControl()
  });
  invoiceForm = new UntypedFormGroup({
  });
  tasksForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    type: new UntypedFormControl(),
    description: new UntypedFormControl(),
    changed_option: new UntypedFormControl(),
    changed_from_id: new UntypedFormControl(),
    changed_to_id: new UntypedFormControl(),
    deal_id: new UntypedFormControl(),
    client_id: new UntypedFormControl(),
    manager_id: new UntypedFormControl()
  });
  textMessage = new UntypedFormControl();
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
