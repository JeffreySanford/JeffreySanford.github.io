import { Component } from '@angular/core';

@Component({
  selector: 'jeffrey-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  public users = [

    {
        "id":1,
        "first_name":"Christine",
        "last_name":"Young",
        "email":"cyoung0@blogs.com",
        "gender":"Female",
        "ip_address":"142.220.239.150",
        "avatar":"https://robohash.org/quasteneturvoluptatem.png?size=50x50&set=set1",
        "currency_code": "BRL",
        "currency":"Real"
    },
{"id":2,"first_name":"Christina","last_name":"Powell","email":"cpowell1@1688.com","gender":"Female","ip_address":"85.147.222.103","avatar":"https://robohash.org/minusdoloremfuga.png?size=50x50&set=set1","currency_code":"CNY","currency":"Yuan Renminbi"},
{"id":3,"first_name":"Samuel","last_name":"Clark","email":"sclark2@sakura.ne.jp","gender":"Male","ip_address":"200.241.235.106","avatar":"https://robohash.org/teneturdignissimoset.jpg?size=50x50&set=set1","currency_code":"CNY","currency":"Yuan Renminbi"}
  ];
  constructor() { 

  }

}
