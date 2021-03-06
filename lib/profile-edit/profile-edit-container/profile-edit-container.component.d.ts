import { OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { UserModel } from "../../models";
import * as FeatureReducer from "../../feature/feature.reducers";
import { UserConfigurationService } from "../../services";
import { UserModuleConfig } from "../../user.config";
export declare class ProfileEditContainerComponent implements OnInit {
    private store;
    private configService;
    userInforamation$: Observable<UserModel>;
    formGroup: FormGroup;
    roles$: Observable<string[]>;
    groups: Observable<string[]>;
    config$: Observable<UserModuleConfig>;
    constructor(store: Store<FeatureReducer.FeatureState>, configService: UserConfigurationService);
    ngOnInit(): void;
    updateProfile(data: any): void;
}
