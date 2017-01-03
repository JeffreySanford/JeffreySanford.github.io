webpackJsonp([0,4],{

/***/ 439:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 439;


/***/ },

/***/ 440:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(599);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__(593);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_37" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/home/jeffrey/repos/github.io/JeffreySanford.github.io/development/projects/angular2/typescript/bitcoin-front-end/src/main.js.map

/***/ },

/***/ 592:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'jeffrey works!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'jeffrey-root',
            template: __webpack_require__(761),
            styles: [__webpack_require__(756)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/home/jeffrey/repos/github.io/JeffreySanford.github.io/development/projects/angular2/typescript/bitcoin-front-end/src/app.component.js.map

/***/ },

/***/ 593:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(592);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__users_users_component__ = __webpack_require__(597);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__exchanges_exchanges_component__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__header_header_component__ = __webpack_require__(596);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__footer_footer_component__ = __webpack_require__(595);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_material__ = __webpack_require__(553);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__users_users_component__["a" /* UsersComponent */],
                __WEBPACK_IMPORTED_MODULE_6__exchanges_exchanges_component__["a" /* ExchangesComponent */],
                __WEBPACK_IMPORTED_MODULE_7__header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_8__footer_footer_component__["a" /* FooterComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["e" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material__["MaterialModule"].forRoot(),
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/home/jeffrey/repos/github.io/JeffreySanford.github.io/development/projects/angular2/typescript/bitcoin-front-end/src/app.module.js.map

/***/ },

/***/ 594:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ExchangesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ExchangesComponent = (function () {
    function ExchangesComponent() {
        this.exchanges = [
            {
                "id": 1,
                "exchange_name": "BTC-e",
                "trade_name": "Bitcoin to Etherium",
                "trade_name_code": "btc_eth",
                "report_type": "ticker",
                "data": {
                    "high": 945,
                    "low": 925,
                    "avg": 935,
                    "vol": 4073879.99351,
                    "vol_cur": 4342.8793,
                    "last": 939.999,
                    "buy": 939.999,
                    "sell": 939.004,
                    "updated": 1483054445,
                    "server_time": 1483054447
                }
            },
            {
                "id": 1,
                "exchange_name": "BTC-e",
                "trade_name": "Bitcoin to Litecoin",
                "trade_name_code": "btc_lte",
                "report_type": "ticker",
                "data": {
                    "high": 945,
                    "low": 925,
                    "avg": 935,
                    "vol": 4099171.99438,
                    "vol_cur": 4369.78356,
                    "last": 940,
                    "buy": 940,
                    "sell": 939.002,
                    "updated": 1483054191,
                    "server_time": 1483054191
                }
            },
            {
                "id": 3,
                "exchange_name": "BTC-e",
                "trade_name": "Bitcoin to DASH",
                "trade_name_code": "btc_dsh",
                "report_type": "ticker",
                "data": {
                    "high": 945,
                    "low": 925,
                    "avg": 935,
                    "vol": 4099171.99438,
                    "vol_cur": 4369.78356,
                    "last": 940,
                    "buy": 940,
                    "sell": 939.002,
                    "updated": 1483054191,
                    "server_time": 1483054191
                }
            }
        ];
    }
    ExchangesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'jeffrey-exchanges',
            template: __webpack_require__(762),
            styles: [__webpack_require__(757)]
        }), 
        __metadata('design:paramtypes', [])
    ], ExchangesComponent);
    return ExchangesComponent;
}());
//# sourceMappingURL=/home/jeffrey/repos/github.io/JeffreySanford.github.io/development/projects/angular2/typescript/bitcoin-front-end/src/exchanges.component.js.map

/***/ },

/***/ 595:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return FooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'jeffrey-footer',
            template: __webpack_require__(763),
            styles: [__webpack_require__(758)]
        }), 
        __metadata('design:paramtypes', [])
    ], FooterComponent);
    return FooterComponent;
}());
//# sourceMappingURL=/home/jeffrey/repos/github.io/JeffreySanford.github.io/development/projects/angular2/typescript/bitcoin-front-end/src/footer.component.js.map

/***/ },

/***/ 596:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return HeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HeaderComponent = (function () {
    function HeaderComponent() {
        this.title = "Digital Currency Exchange";
        this.subtitle = "By leveraging the usefulness of Angular 2 on the front-end and NodeJS we can create a create progressive, responsive and dynamic application for all devices.  The modular ability of Angular 2 specifically leads to clean code and test-driven development as a process instead of an after though.  Code can be viewed on Github.";
    }
    HeaderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'jeffrey-header',
            template: __webpack_require__(764),
            styles: [__webpack_require__(759)]
        }), 
        __metadata('design:paramtypes', [])
    ], HeaderComponent);
    return HeaderComponent;
}());
//# sourceMappingURL=/home/jeffrey/repos/github.io/JeffreySanford.github.io/development/projects/angular2/typescript/bitcoin-front-end/src/header.component.js.map

/***/ },

/***/ 597:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UsersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UsersComponent = (function () {
    function UsersComponent() {
        this.users = [
            {
                "id": 1,
                "first_name": "Christine",
                "last_name": "Young",
                "email": "cyoung0@blogs.com",
                "gender": "Female",
                "ip_address": "142.220.239.150",
                "avatar": "https://robohash.org/quasteneturvoluptatem.png?size=50x50&set=set1",
                "currency_code": "BRL",
                "currency": "Real"
            },
            { "id": 2, "first_name": "Christina", "last_name": "Powell", "email": "cpowell1@1688.com", "gender": "Female", "ip_address": "85.147.222.103", "avatar": "https://robohash.org/minusdoloremfuga.png?size=50x50&set=set1", "currency_code": "CNY", "currency": "Yuan Renminbi" },
            { "id": 3, "first_name": "Samuel", "last_name": "Clark", "email": "sclark2@sakura.ne.jp", "gender": "Male", "ip_address": "200.241.235.106", "avatar": "https://robohash.org/teneturdignissimoset.jpg?size=50x50&set=set1", "currency_code": "CNY", "currency": "Yuan Renminbi" }
        ];
    }
    UsersComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'jeffrey-users',
            template: __webpack_require__(765),
            styles: [__webpack_require__(760)]
        }), 
        __metadata('design:paramtypes', [])
    ], UsersComponent);
    return UsersComponent;
}());
//# sourceMappingURL=/home/jeffrey/repos/github.io/JeffreySanford.github.io/development/projects/angular2/typescript/bitcoin-front-end/src/users.component.js.map

/***/ },

/***/ 598:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/home/jeffrey/repos/github.io/JeffreySanford.github.io/development/projects/angular2/typescript/bitcoin-front-end/src/environment.js.map

/***/ },

/***/ 599:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(613);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(606);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(608);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(605);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(604);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(612);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(601);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(610);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(603);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(611);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(609);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(614);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(808);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/home/jeffrey/repos/github.io/JeffreySanford.github.io/development/projects/angular2/typescript/bitcoin-front-end/src/polyfills.js.map

/***/ },

/***/ 756:
/***/ function(module, exports) {

module.exports = "\n.users {\n  padding: 0;\n  width:48%;\n  margin: .5em .5em .5em .75em;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: column;\n      flex-flow: column;\n  height: 80%;\n}\n\n.exchanges {\n  margin: .5em .75em .5em .5em;\n  padding:0;\n  width:48%;\n  border: 2px solid green;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: column;\n      flex-flow: column;\n  height: 80%;\n  float:right;\n}\n\n.footer-style {\n  margin: 0 .5em 0 1em;\n\n}\n"

/***/ },

/***/ 757:
/***/ function(module, exports) {

module.exports = ".exchanges-style {\n    font-size:1.5em;\n    background-color:green; \n    color: lightgreen;\n    height: 25em;\n}\n\n.exchanges-style i {\n  font-size: 2.0em; \n  color: lightGreen;\n  margin: .1em .5em .1em .25em;\n  float: left;\n}\n\n.exchanges-style p {\n  float: left;\n  color: lightgreen;\n  margin: .5em 0 0 .1em;\n}\n\n.exchange-style {\n  margin: .25em .25em .25em .25em;\n  clear: both;\n  height: 150px;\n  background-color:lightgreen;\n  color: black;\n}\n\n.exchange-style h5 {\n  font-size: 1.2em;\n  color: purple;\n  margin: 0 0 .25em .25em;\n  padding-top: .9em;\n}\n\n.exchange-style p {\n  padding: 0 0 0 .5em;\n  font-size: 1.2em;\n  float: left;\n  color: black;\n}\n\n.data-table {\n  font-size: .6em;\n  clear: both;\n  margin-left: 2em;\n}\n\ntable {\n  width: 90%;\n  margin: 0 auto;\n}"

/***/ },

/***/ 758:
/***/ function(module, exports) {

module.exports = ".footer-style {\n  background-color:lightgreen;\n  color: darkgreen; \n  font-size:1.5em;\n  clear:both;\n  margin: .15em .5em .25em .4em;\n}\n\n.nav {\n  height: 2em;\n}\n\n.nav ul {\n  list-style: none;\n  padding: 0;\n  margin: 0 0 0 .5em;\n}\n.nav li {\n}\n \n.nav li a {\n  float: left;\n  margin: .3em .25em .5em;\n  text-decoration: none;\n  display: block;\n  -webkit-transition:.3s background-color;\n  transition: .3s background-color;\n}\n\ni {\n  color: darkgreen;\n  font-size: .8em;\n  opacity: .5;\n\n}\ni:hover {\n    color: black; \n    opacity: 1;\n}"

/***/ },

/***/ 759:
/***/ function(module, exports) {

module.exports = ".header-style {\n  background-color:lightgreen;\n  color: darkgreen; \n  font-size:1.3em;\n  clear:both;\n  padding: .25em 0;\n  margin: .5em .5em 0 .5em;\n}\n\n.header-style h1 {\n  color: black;\n  margin: .25em 0 0 .25em;\n}\n\n.header-style h4 {\n  color: darkgreen;\n  margin: .25em 0 0 .5em;\n  font-style: italic;\n}\n.nav {\n  height: 4em;\n  margin: 0 .5em 0 0;\n}\n\n.nav ul {\n  list-style: none;\n  padding: 0;\n  margin: -2em 0 0 0;\n}\n\n.nav li {\n}\n \n.nav li a {\n  float: right;\n  margin:0 .5em 0;\n  text-decoration: none;\n  display: block;\n}\n\ni {\n  float: right;\n    color: darkgreen;\n    font-size: 1.1em;\n    margin-left: .5em;\n    -webkit-transition:.3s background-color;\n    transition: .3s background-color;\n}\n\ni:hover {\n  color: darkblue;\n}"

/***/ },

/***/ 760:
/***/ function(module, exports) {

module.exports = ".users-style {\n  font-size:1.5em;\n  background-color:green;\n  color: black;\n  height: 25.25em;\n}\n\n.users-style i {\n  font-size: 2.0em; \n  color: lightGreen;\n  margin: .1em .5em .1em .25em;\n  float: left;\n}\n\n.users-style p {\n  padding: .5em 0 0 1em;\n  color: lightGreen\n}\n\n\n.user-style {\n  margin: .35em;\n  background-color: lightgreen;\n  color: purple;\n  font-size: .8em;\n  padding-top: .5em;\n  height: 25em;\n\n}\n\nu {\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n  float:right;\n}\n\n.user-style h5 {\n  font-size: 1.5em;\n  color: purple;\n  margin: .5em 0 .25em .25em;\n\n}\n\n.user-style p {\n  font-size: 1.2em;\n  color: black;\n  margin: 0 0 0 0;\n}\n\n.user-style i {\n  color: darkGreen;\n  margin: 0 .5em 0 .25em;\n  font-size: 1em;\n}\n\n.user-report p {\n  clear: both;\n  margin: 0 0 0 .25em;\n  font-size: 1.0em;\n  line-height: 1em;\n}\n\n.card {\n\n}"

/***/ },

/***/ 761:
/***/ function(module, exports) {

module.exports = "<jeffrey-header></jeffrey-header>\n\n<div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12 users\">\n  <jeffrey-users></jeffrey-users>\n</div>\n<div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12 exchanges\">\n  <jeffrey-exchanges></jeffrey-exchanges>\n</div>\n\n\n<jeffrey-footer></jeffrey-footer>\n"

/***/ },

/***/ 762:
/***/ function(module, exports) {

module.exports = "<div class=\"exchanges-style\">\n  <i class=\"fa fa-clock-o\"></i>\n  <p>Exchanges Section</p>\n  <div class=\"exchange-style\" *ngFor=\"let exchange of exchanges\">\n    <h5>{{exchange.trade_name}}({{exchange.report_type}})</h5>\n\n    <div class=\"data-table\">\n      <table>\n        <tr>\n          <td>high: {{exchange.data.high}}</td>\n          <td>low: {{exchange.data.low}}</td>\n          <td>avg: {{exchange.data.avg}}</td>\n          <td>last: {{exchange.data.last}}</td>\n        </tr>\n        <tr>\n          <td>vol: {{exchange.data.vol}}</td>\n          <td>vol_cur: {{exchange.data.vol_cur}}</td>\n          <td>buy: {{exchange.data.buy}}</td>\n          <td>sell: {{exchange.data.sell}}</td>\n        </tr>\n        <tr>\n          <td>updated: {{exchange.data.updated}}</td>\n          <td>server_time: {{exchange.data.server_time}}</td>\n        </tr>\n      </table>\n      <p>something from REST here</p>\n      \n    </div>\n  </div>\n</div>"

/***/ },

/***/ 763:
/***/ function(module, exports) {

module.exports = "<div class=\"footer-style nav\">\n  <ul>\n    <li><a href=\"\"><i class=\"fa fa-facebook\"></i></a></li>\n    <li><a href=\"\"><i class=\"fa fa-google-plus\"></i></a></li>\n    <li><a href=\"\"><i class=\"fa fa-pinterest\"></i></a></li>\n    <li><a href=\"\"><i class=\"fa fa-twitter\"></i></a></li>\n  </ul>\n</div>"

/***/ },

/***/ 764:
/***/ function(module, exports) {

module.exports = "<div class=\"header-style\">\n  <h1 style=\"\">{{ title }}</h1>\n  <h4 style=\"\">{{ subtitle }}</h4>\n\n  <div class=\"nav\" style=\"margin-top: -3em;\">\n    <ul>\n      <li><a href=\"\"><i class=\"fa fa-facebook\"></i></a></li>\n      <li><a href=\"\"><i class=\"fa fa-google-plus\"></i></a></li>\n      <li><a href=\"\"><i class=\"fa fa-pinterest\"></i></a></li>\n      <li><a href=\"\"><i class=\"fa fa-twitter\"></i></a></li>\n    </ul>\n    </div>\n</div>"

/***/ },

/***/ 765:
/***/ function(module, exports) {

module.exports = "<div class=\"users-style\">\n  <i class=\"fa fa-clock-o\"></i>\n  <p>User Section</p>\n  \n  <div class=\"user-style\" style=\"height: 150px;\" *ngFor=\"let user of users\">\n    <h5>{{user.first_name}}&nbsp;{{user.last_name}}</h5>\n    <div class=\"col-lg-1 col-md-1 col-sm-1 col-xs-1\">\n      <img src={{user.avatar}} />\n    </div>\n    <div class=\"col-lg-6 col-md-6 col-sm-6 col-xs-6 user-report\">\n      <p>Email: {{user.email}}</p>\n      <p>Currency: {{user.currency}} ({{user.currency_code}})</p>\n    </div>\n    <div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-4\">\n      <ul style=\"list-style-type: none; clear: both;\">\n        <li><a href=\"\"><i class=\"fa fa-pencil\">change</i></a></li><br />\n        <li><a href=\"\"><i class=\"fa fa-pencil\">something</i></a></li><br />\n        <li><a href=\"\"><i class=\"fa fa-pencil\">else</i></a></li><br />\n      </ul>\n    </div>\n  </div>\n</div>"

/***/ },

/***/ 809:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(440);


/***/ }

},[809]);
//# sourceMappingURL=main.bundle.map