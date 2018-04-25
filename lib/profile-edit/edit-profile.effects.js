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
var router_1 = require("@angular/router");
var effects_1 = require("@ngrx/effects");
var of_1 = require("rxjs/observable/of");
var services_1 = require("../services");
var operators_1 = require("rxjs/operators");
var edit_profile_actions_1 = require("./edit-profile.actions");
var profile_view_1 = require("../profile-view");
var EditProfileEffects = /** @class */ (function () {
    function EditProfileEffects(actions$, router, service) {
        var _this = this;
        this.actions$ = actions$;
        this.router = router;
        this.service = service;
        this.EditProfileRequest$ = this.actions$
            .ofType(edit_profile_actions_1.EditProfileActionTypes.EDIT_PROFILE)
            .pipe(operators_1.map(function (action) { return action.payload; }), operators_1.map(function (data) { return new edit_profile_actions_1.EditProfileStart(data); }));
        this.RequestEditProfileLink$ = this.actions$
            .ofType(edit_profile_actions_1.EditProfileActionTypes.EDIT_PROFILE_START)
            .pipe(operators_1.map(function (action) { return action.payload; }), operators_1.switchMap(function (data) { return _this.service.editProfile(data); }), operators_1.map(function (res) { return new edit_profile_actions_1.EditProfileSucceed(res); }), operators_1.catchError(function () { return of_1.of(new edit_profile_actions_1.EditProfileFailed()); }));
        // .switchMap((data: EditProfile_ApiModel.Request) => {
        // 	return this.service
        // 		.editProfile(data)
        // 		.map((res) => new EditProfileSucceed(res))
        // 		.catch(() => Observable.of(new EditProfileFailed()));
        // });
        this.goToView$ = this.actions$.ofType(edit_profile_actions_1.EditProfileActionTypes.EDIT_PROFILE_SUCCEED)
            .pipe(operators_1.map(function () {
            _this.router.navigate(["/user/profile"]);
            return new profile_view_1.GetProfile();
        }));
    }
    EditProfileEffects.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    EditProfileEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: router_1.Router, },
        { type: services_1.UserService, },
    ]; };
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Object)
    ], EditProfileEffects.prototype, "EditProfileRequest$", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Object)
    ], EditProfileEffects.prototype, "RequestEditProfileLink$", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Object)
    ], EditProfileEffects.prototype, "goToView$", void 0);
    return EditProfileEffects;
}());
exports.EditProfileEffects = EditProfileEffects;
//# sourceMappingURL=edit-profile.effects.js.map