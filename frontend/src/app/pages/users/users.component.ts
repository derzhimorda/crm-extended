import { Component, OnInit } from '@angular/core';
import {IContent, ILayout} from "../../_metronic/layout/core/default-layout.config";
import {LayoutService} from "../../_metronic/layout";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  layoutPage: ILayout;
  content: IContent;
  roles: Role[] = [
    {
      id: 1, name: 'Администратор', created_at: ''
    },
    {
      id: 2, name: 'Директор', created_at: ''
    },
    {
      id: 3, name: 'Ответственный', created_at: ''
    },
    {
      id: 4, name: 'Менеджер', created_at: ''
    },
    {
      id: 5, name: 'Клиент', created_at: ''
    },
    {
      id: 6, name: 'Гость', created_at: ''
    },
    {
      id: 7, name: 'Склад', created_at: ''
    },
  ];
  users: User[] = [
    {
      id: 1, name: 'Admin', email: 'v.korako@gmail.com', email_verified_at: '', password: '123456',
      remember_token: '', created_at: '01.04.2022', updated_at: '01.04.2022', mobile: '+436674512026', role: 1, avatar: '/assets/media/avatars/300-1.jpg'
    },
    {
      id: 2, name: 'Евгений Дамаскин', email: 'jackinson@gmail.com', email_verified_at: '', password: '123456',
      remember_token: '', created_at: '01.04.2022', updated_at: '01.04.2022', mobile: '+436678897766', role: 4, avatar: '/assets/media/avatars/300-2.jpg'
    },
    {
      id: 3, name: 'Игорь Вышибала', email: 'igor@gmail.com', email_verified_at: '', password: '123456',
      remember_token: '', created_at: '01.04.2022', updated_at: '01.04.2022', mobile: '+436674512026', role: 2, avatar: '/assets/media/avatars/300-3.jpg'
    },
    {
      id: 4, name: 'Наталья Онегина', email: 'natali@gmail.com', email_verified_at: '', password: '123456',
      remember_token: '', created_at: '01.04.2022', updated_at: '01.04.2022', mobile: '+436674512026', role: 3, avatar: '/assets/media/avatars/300-4.jpg'
    },
    {
      id: 5, name: 'Евгений Думалкин', email: 'evgen@gmail.com', email_verified_at: '', password: '123456',
      remember_token: '', created_at: '01.04.2022', updated_at: '01.04.2022', mobile: '+436674512026', role: 4, avatar: '/assets/media/avatars/300-5.jpg'
    },
    {
      id: 6, name: 'Анастасия Лукина', email: 'nastya@gmail.com', email_verified_at: '', password: '123456',
      remember_token: '', created_at: '01.04.2022', updated_at: '01.04.2022', mobile: '+436674512026', role: 4, avatar: '/assets/media/avatars/300-6.jpg'
    },
    {
      id: 7, name: 'Олег Кашура', email: 'oleg@gmail.com', email_verified_at: '', password: '123456',
      remember_token: '', created_at: '01.04.2022', updated_at: '01.04.2022', mobile: '+436674512026', role: 4, avatar: '/assets/media/avatars/300-7.jpg'
    },
    {
      id: 8, name: 'Кирилл Дерегин', email: 'kirill@gmail.com', email_verified_at: '', password: '123456',
      remember_token: '', created_at: '01.04.2022', updated_at: '01.04.2022', mobile: '+436674512026', role: 4, avatar: '/assets/media/avatars/300-8.jpg'
    },
    {
      id: 9, name: 'Александр Кучай', email: 'sasha@gmail.com', email_verified_at: '', password: '123456',
      remember_token: '', created_at: '01.04.2022', updated_at: '01.04.2022', mobile: '+436674512026', role: 7, avatar: '/assets/media/avatars/300-9.jpg'
    },
    {
      id: 10, name: 'Иван Иванов', email: 'v.korako@gmail.com', email_verified_at: '', password: '123456',
      remember_token: '', created_at: '01.04.2022', updated_at: '01.04.2022', mobile: '+436674512026', role: 6, avatar: '/assets/media/avatars/300-10.jpg'
    },
  ];
  userForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    mobile: new FormControl(),
    role: new FormControl(),
    avatar: new FormControl()
  });

  constructor(private layout: LayoutService) { }

  ngOnInit(): void {
    this.layoutPage = this.layout.getConfig();
    this.layoutPage.content.width = 'fluid';
    this.layout.setConfig(this.layoutPage);
  }

  getRoleName(id:number){
    return this.roles.filter(x => x.id == id)[0].name;
  }

  saveUser() {
    console.log(this.userForm.value);
  }
}

export interface User{
  id: number,
  name: string,
  email: string,
  email_verified_at: string,
  password: string,
  remember_token: string,
  created_at: string,
  updated_at: string,
  mobile: string
  role: number,
  avatar: string
}

export interface Role{
  id: number,
  name: string,
  created_at: string
}
