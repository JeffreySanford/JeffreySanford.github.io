import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Exchanges } from '../Models/exchanges';
import { EmitterService } from '../Services/emitter.service';
import { ExchangesService } from '../Services/exchanges.service';

@Component({
  selector: 'jeffrey-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.css']
})
export class ExchangesComponent {
       public exchanges =  [

    {
      "id":1,
      "exchange_name":"BTC-e",
      "trade_name": "Bitcoin to Etherium",
      "trade_name_code": "btc_eth",
      "report_type" : "ticker",
      "data" : {
        "high":945,
        "low":925,
        "avg":935,
        "vol":4073879.99351,
        "vol_cur":4342.8793,
        "last":939.999,
        "buy":939.999,
        "sell":939.004,
        "updated":1483054445,
        "server_time":1483054447
      }  
    },
        {
      "id":1,
      "exchange_name":"BTC-e",
      "trade_name":"Bitcoin to Litecoin",
      "trade_name_code": "btc_lte",
      "report_type" : "ticker",
      "data" : {
          "high":945,
          "low":925,
          "avg":935,
          "vol":4099171.99438,
          "vol_cur":4369.78356,
          "last":940,
          "buy":940,
          "sell":939.002,
          "updated":1483054191,
          "server_time":1483054191
      }  
    },
    {
      "id":3,
      "exchange_name":"BTC-e",
      "trade_name": "Bitcoin to DASH",
      "trade_name_code": "btc_dsh",
      "report_type" : "ticker",
      "data" : {
          "high":945,
          "low":925,
          "avg":935,
          "vol":4099171.99438,
          "vol_cur":4369.78356,
          "last":940,
          "buy":940,
          "sell":939.002,
          "updated":1483054191,
          "server_time":1483054191
      }  
    }
  ];
}