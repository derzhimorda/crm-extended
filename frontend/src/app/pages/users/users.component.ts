import { Component, OnInit } from '@angular/core';
import {IContent, ILayout} from "../../_metronic/layout/core/default-layout.config";
import {LayoutService} from "../../_metronic/layout";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersModule} from "./users.module";
import {UserType} from "../../modules/auth";
import {ActivatedRoute, Router} from "@angular/router";
import {SettingsService} from "../../_metronic/layout/core/settings.service";
import {ISettings} from "../../_metronic/layout/core/default-settings.config";
import {UsersService} from "../../services/users.service";
// import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  layoutPage: ILayout;
  content: IContent;
  roles: any[];
  users: any[];
  userForm = new FormGroup({
    name: new FormControl([], [Validators.required]),
    email: new FormControl([], [Validators.required, Validators.email]),
    password: new FormControl(),
    mobile: new FormControl(),
    role: new FormControl([Validators.required])
  });
  settingsData: ISettings;
  sendDataChecking: boolean = false;
  userPass: string;
  toastShow: boolean = false;
  toastText: string;
  toastClass: string;
  toastHeader: string;
  currentUser: any;

  constructor(private layout: LayoutService,
              private activeRoute: ActivatedRoute,
              private settings: SettingsService,
              private userService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
    this.layoutPage = this.layout.getConfig();
    this.layoutPage.content.width = 'fluid';
    this.layout.setConfig(this.layoutPage);

    this.settingsData = this.settings.getSettings();

    this.users = this.activeRoute.snapshot.data.users ?? [];

    this.users.map((user: any) => {
      let UserRoles = user.roles ?? null;
      user.roles = [];
      UserRoles?.map((roles:any) => {
        user.roles.push(roles.role_id);
      });
    });

    console.log(this.users)

    // this.toastText = 'test';
    // this.toastClass = 'bg-success text-light';
    // this.toastHeader = 'Успешно';
    // this.toastShow = true;
  }

  get getRoles():any{
    return this.settings.getProp('roles');
  }

  getRoleName(id:number){
    let roles:any = this.settings.getProp('roles');
    return roles.filter((x:any) => x.id == id)[0].name;
  }

  saveUser() {
    if(!this.userForm.valid){
      return;
    }

    let randomstring = Math.random().toString(36).slice(-8);
    this.userPass = randomstring;

    this.userForm.patchValue({
      password: randomstring
    })

    this.userService.makeNewUser(this.userForm.value).subscribe(data => {
      this.toastText = data.data;
      this.toastClass = 'bg-success text-light';
      this.toastHeader = 'Успешно';
      this.toastShow = true;
      console.log(data);
      this.sendDataChecking = true;
    }, error => {
      this.toastText = error.error;
      this.toastClass = 'bg-danger text-light';
      this.toastHeader = 'Ошибка';
      this.toastShow = true;
      console.log(error)
    });
  }

  linkToUser(id:number) {
    return this.router.navigateByUrl(`/users/${id}/overview`);
  }

  removeUser(id:number){
    this.userService.removeUser(id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  setUser(user: any) {
    this.currentUser = user;
  }
}

// export interface User{
//   id: number,
//   name: string,
//   email: string,
//   email_verified_at: string,
//   password: string,
//   remember_token: string,
//   created_at: string,
//   updated_at: string,
//   mobile: string
//   role: number,
//   avatar: string
// }
//
// export interface Role{
//   id: number,
//   name: string,
//   created_at: string
// }
