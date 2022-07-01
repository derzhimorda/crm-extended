import {Component, OnInit, ViewChild} from '@angular/core';
import {LayoutService} from "../../_metronic/layout";
import {IContent, ILayout} from "../../_metronic/layout/core/default-layout.config";
import {TranslationService} from "../../modules/i18n";
import {NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {NgSelectComponent} from "@ng-select/ng-select";

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
    id: new FormControl(),
    client_name: new FormControl(),
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
  CLIENTS: Client[] = [
    {
      id: 1, client_name: 'Анна Лебедева', mobile: '+380631234567', add_mobile: '+380631234567', email: 'oleg@gmail.com', ySell: 'https://ysell.com/etgde34435kdv324', company: 'ООО "ФИгачеси"',
      adviser_id: 1, manager_id: 1, work_status_id: 1, fb_status_id: 1, ref_option_id: 1, delivery_id: 1, fb_link: 'https://www.facebook.com/profile.php?id=100007855069368', tg_link: '', vb_link: '',
      google_link: 'https://docs.google.com/spreadsheets/d/1J1fTxbgjQApOYRhehbhv79m0NRfKs_LiLZ0U7_8tr8I/edit#gid=1147788206', profile_avatar: '/assets/media/avatars/300-2.jpg'
    },
    {
      id: 2, client_name: 'Кирил Чернышович', mobile: '+380992223355', add_mobile: '', email: 'anna@gmail.com', ySell: '', company: 'ИП Кордилон',
      adviser_id: 1, manager_id: 1, work_status_id: 1, fb_status_id: 1, ref_option_id: 1, delivery_id: 1, fb_link: '', tg_link: '', vb_link: '', google_link: '', profile_avatar: '/assets/media/avatars/300-3.jpg'
    },
    {
      id: 3, client_name: 'Олег Лагойда', mobile: '+380992223355', add_mobile: '+380992223355', email: 'anna@gmail.com', ySell: '', company: 'ФОП Курилка',
      adviser_id: 1, manager_id: 1, work_status_id: 1, fb_status_id: 1, ref_option_id: 1, delivery_id: 1, fb_link: '', tg_link: '', vb_link: '', google_link: '', profile_avatar: '/assets/media/avatars/300-5.jpg'
    },
    {
      id: 4, client_name: 'Денис Прокопенко', mobile: '+380992223355', add_mobile: '', email: 'anna@gmail.com', ySell: '', company: 'ЧП Мопед+',
      adviser_id: 1, manager_id: 1, work_status_id: 2, fb_status_id: 1, ref_option_id: 1, delivery_id: 1, fb_link: '', tg_link: '', vb_link: '', google_link: '', profile_avatar: '/assets/media/avatars/300-7.jpg'
    },
    {
      id: 5, client_name: 'Ольга Кириленко', mobile: '+380992223355', add_mobile: '+380992223355', email: 'anna@gmail.com', ySell: '', company: 'ЧПТУП Петраска Медиа',
      adviser_id: 1, manager_id: 1, work_status_id: 3, fb_status_id: 1, ref_option_id: 1, delivery_id: 1, fb_link: '', tg_link: '', vb_link: '', google_link: '', profile_avatar: '/assets/media/avatars/300-4.jpg'
    },
    {
      id: 6, client_name: 'Инна Груз', mobile: '+380992223355', add_mobile: '', email: 'anna@gmail.com', ySell: '', company: 'ЗАО Кощей и его команда',
      adviser_id: 1, manager_id: 1, work_status_id: 3, fb_status_id: 1, ref_option_id: 1, delivery_id: 1, fb_link: '', tg_link: '', vb_link: '', google_link: '', profile_avatar: '/assets/media/avatars/300-10.jpg'
    },
    {
      id: 7, client_name: 'Алексей Иванов', mobile: '+380992223355', add_mobile: '', email: 'anna@gmail.com', ySell: '', company: 'LLC ArniPed',
      adviser_id: 1, manager_id: 1, work_status_id: 4, fb_status_id: 1, ref_option_id: 1, delivery_id: 1, fb_link: '', tg_link: '', vb_link: '', google_link: '', profile_avatar: '/assets/media/avatars/300-9.jpg'
    },
    {
      id: 8, client_name: 'Ганьба Москалям', mobile: '+380992223355', add_mobile: '', email: 'anna@gmail.com', ySell: '', company: 'ФОП Корзюк',
      adviser_id: 1, manager_id: 1, work_status_id: 1, fb_status_id: 1, ref_option_id: 1, delivery_id: 1, fb_link: '', tg_link: '', vb_link: '', google_link: '', profile_avatar: '/assets/media/avatars/300-27.jpg'
    },
    {
      id: 9, client_name: 'Александр Батька', mobile: '+380992223355', add_mobile: '', email: 'anna33@gmail.com', ySell: '', company: '',
      adviser_id: 1, manager_id: 1, work_status_id: 1, fb_status_id: 1, ref_option_id: 1, delivery_id: 1, fb_link: '', tg_link: '', vb_link: '', google_link: '', profile_avatar: '/assets/media/avatars/300-19.jpg'
    },
    {
      id: 10, client_name: 'Вольф Мессинг', mobile: '+380992223355', add_mobile: '', email: '12anna@gmail.com', ySell: '', company: '',
      adviser_id: 1, manager_id: 1, work_status_id: 2, fb_status_id: 1, ref_option_id: 1, delivery_id: 1, fb_link: '', tg_link: '', vb_link: '', google_link: '', profile_avatar: '/assets/media/avatars/300-21.jpg'
    },
  ];
  clients$: Observable<Client[]>;
  page = 1;
  pageSize = 4;
  collectionSize = this.CLIENTS.length;
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

  @ViewChild('filterClients') filterClientRef: NgSelectComponent

  constructor(private layout: LayoutService, config: NgbDropdownConfig) {
    config.placement = 'bottom-end';
    config.autoClose = 'outside';

    this.clients$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
  }

  ngOnInit(): void {
    this.layoutPage = this.layout.getConfig();
    this.layoutPage.content.width = 'fluid';
    this.layout.setConfig(this.layoutPage);

    this.client = this.CLIENTS.filter(i => i.id == 1)[0];

    this.getRandProfileImage();
  }

  openClientCard(id: number) {
    this.client = this.CLIENTS.filter(x => x.id == id)[0];
    this.cardActive = true;
  }

  getRandProfileImage(){
    const rand = Math.floor(Math.random() * 40) + 1;
    this.miscAvatar = `/assets/media/stock/600x600/img-${rand}.jpg`;
  }

  getStatusNameById(id: number){
    return this.work_statuses.filter((x:any) => x.id == id)[0].label;
  }

  search(text: any): Client[] {
    return this.CLIENTS.filter(client => {
      // const term = text.toLowerCase();
        return client.client_name.includes(text) || client.mobile.includes(text) || client.email.includes(text) || client.company.includes(text);
    });
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
    const client = this.CLIENTS.filter(x => x.id = id)[0];
    this.miscAvatar = client.profile_avatar;
    this.clientForm.patchValue(client);
  }

  removeClient(event: any) {
    event.preventDefault();
  }

  filterOptions($event: any) {
    console.log($event)
    this.clients$ = this.clients$.pipe(
      map(value => this.CLIENTS.filter(x => x.work_status_id == $event.id))
    );
  }
}

export interface Client{
  id: number,
  client_name: string,
  mobile: string,
  add_mobile: string,
  email: string,
  ySell: string,
  company: string,
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
  google_link: string
}
