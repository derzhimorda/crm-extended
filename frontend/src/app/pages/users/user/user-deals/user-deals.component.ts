import { Component, OnInit } from '@angular/core';
import {Observable, startWith, Subscription} from "rxjs";
import {AuthService, UserType} from "../../../../modules/auth";
import {Deal} from "../../../deals/deals.component";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {UntypedFormControl} from "@angular/forms";

@Component({
  selector: 'app-user-deals',
  templateUrl: './user-deals.component.html',
  styleUrls: ['./user-deals.component.scss']
})
export class UserDealsComponent implements OnInit {
  user$: Observable<UserType>;
  private unsubscribe: Subscription[] = [];
  DEALS: any[];
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
  filter = new UntypedFormControl('');
  filterStatus = new UntypedFormControl('');

  constructor( private auth: AuthService, private router: Router) {
    this.deals$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
  }

  ngOnInit(): void {
    this.user$ = this.auth.currentUserSubject.asObservable();
    this.DEALS = [
      { id: 1, name: 'СДелка от Лебедевой от 12.04.2022', deal_types_id: 1, deal_statuses_id: 1, manager_id: 1, adviser_id: 1,
        delivery_ways_id: 1, delivery_types_id: 1, pickup_types_id: 1, client_id: 1, inspector: 0, budget: 5000, pay_types_id: 1, miscalculation: 1,
        created_at: '29.06.2022', updated_at: '29.06.2022'
      },
      { id: 2, name: '254456776', deal_types_id: 1, deal_statuses_id: 2, manager_id: 1, adviser_id: 1,
        delivery_ways_id: 1, delivery_types_id: 1, pickup_types_id: 1, client_id: 1, inspector: 0, budget: 3500, pay_types_id: 1, miscalculation: 1,
        created_at: '15.05.2022', updated_at: '29.06.2022'
      },
      { id: 3, name: '254456734', deal_types_id: 1, deal_statuses_id: 3, manager_id: 1, adviser_id: 1,
        delivery_ways_id: 1, delivery_types_id: 1, pickup_types_id: 1, client_id: 1, inspector: 0, budget: 2000, pay_types_id: 1, miscalculation: 1,
        created_at: '16.06.2022', updated_at: '29.06.2022'
      },
      { id: 4, name: '254456769', deal_types_id: 1, deal_statuses_id: 4, manager_id: 1, adviser_id: 1,
        delivery_ways_id: 1, delivery_types_id: 1, pickup_types_id: 1, client_id: 1, inspector: 0, budget: 2470, pay_types_id: 1, miscalculation: 1,
        created_at: '17.06.2022', updated_at: '29.06.2022'
      },
      { id: 5, name: 'Pick up items China control @456642 tomorrow getting all', deal_types_id: 1, deal_statuses_id: 5, manager_id: 1, adviser_id: 1,
        delivery_ways_id: 1, delivery_types_id: 1, pickup_types_id: 1, client_id: 1, inspector: 0, budget: 1000, pay_types_id: 1, miscalculation: 1,
        created_at: '2.05.2022', updated_at: '29.06.2022'
      },
      { id: 6, name: '254456769', deal_types_id: 1, deal_statuses_id: 6, manager_id: 1, adviser_id: 1,
        delivery_ways_id: 1, delivery_types_id: 1, pickup_types_id: 1, client_id: 1, inspector: 0, budget: 0, pay_types_id: 1, miscalculation: 1,
        created_at: '29.06.2022', updated_at: '29.06.2022'
      },
      { id: 7, name: '254456769', deal_types_id: 1, deal_statuses_id: 7, manager_id: 1, adviser_id: 1,
        delivery_ways_id: 1, delivery_types_id: 1, pickup_types_id: 1, client_id: 1, inspector: 0, budget: 0, pay_types_id: 1, miscalculation: 1,
        created_at: '29.06.2022', updated_at: '29.06.2022'
      },
      { id: 8, name: 'СДелка от Лебедевой от 12.04.2022', deal_types_id: 1, deal_statuses_id: 8, manager_id: 1, adviser_id: 1,
        delivery_ways_id: 1, delivery_types_id: 1, pickup_types_id: 1, client_id: 1, inspector: 0, budget: 0, pay_types_id: 1, miscalculation: 1,
        created_at: '29.06.2022', updated_at: '29.06.2022'
      },
      { id: 9, name: 'СДелка от Лебедевой от 12.04.2022', deal_types_id: 1, deal_statuses_id: 9, manager_id: 1, adviser_id: 1,
        delivery_ways_id: 1, delivery_types_id: 1, pickup_types_id: 1, client_id: 1, inspector: 0, budget: 0, pay_types_id: 1, miscalculation: 1,
        created_at: '29.06.2022', updated_at: '29.06.2022'
      },
      { id: 10, name: 'СДелка от Лебедевой от 12.04.2022', deal_types_id: 1, deal_statuses_id: 10, manager_id: 1, adviser_id: 1,
        delivery_ways_id: 1, delivery_types_id: 1, pickup_types_id: 1, client_id: 1, inspector: 0, budget: 0, pay_types_id: 1, miscalculation: 1,
        created_at: '29.06.2022', updated_at: '29.06.2022'
      }
    ];
  }

  getStatusNameById(id: number){
    return this.deal_statuses.filter(x => x.id == id)[0].label;
  }

  search(text: any, filter?: any): Deal[] {
    return this.DEALS.filter(deal => {
      // const term = text.toLowerCase();
      if(!filter){
        return deal.name.includes(text) || deal.budget == text;
      } else {
        // console.log(text)
        if(text == 0){
          return deal;
        }
        return deal.deal_statuses_id == text;
      }
    });
  }

  linkDeal(id: any) {
    this.router.navigateByUrl(`/deals/${id}`);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
