"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var effects_1 = require("@ngrx/effects");
var services_1 = require("../services");
var search_actions_1 = require("./search.actions");
var of_1 = require("rxjs/observable/of");
var SearchEffects = /** @class */ (function () {
    function SearchEffects(actions$, userService) {
        var _this = this;
        this.actions$ = actions$;
        this.userService = userService;
        this.canSearch$ = this.actions$.ofType(search_actions_1.SearchActionTypes.SEARCH)
            .pipe(operators_1.map(function (action) { return action.payload; }), operators_1.map(function (data) { return new search_actions_1.SearchStartAction(data); }));
        this.search$ = this.actions$
            .ofType(search_actions_1.SearchActionTypes.SEARCH_START)
            .pipe(operators_1.map(function (action) { return action.payload; }), operators_1.switchMap(function (data) {
            return _this.userService
                .getInfo(data)
                .pipe(operators_1.map(function (res) {
                return res == null ? new search_actions_1.SearchFailed() : new search_actions_1.SearchSucceed(res);
            }), operators_1.catchError(function () { return of_1.of(new search_actions_1.SearchFailed()); }));
        }));
    }
    SearchEffects.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    SearchEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: services_1.UserService, },
    ]; };
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Object)
    ], SearchEffects.prototype, "canSearch$", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Object)
    ], SearchEffects.prototype, "search$", void 0);
    return SearchEffects;
}());
exports.SearchEffects = SearchEffects;
//# sourceMappingURL=search.effects.js.map