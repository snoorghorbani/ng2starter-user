import { Actions } from "@ngrx/effects";
import { UserService } from "../services";
import { SearchStartAction, SearchFailed, SearchSucceed } from "./search.actions";
import { Observable } from "rxjs/observable";
export declare class SearchEffects {
    private actions$;
    private userService;
    constructor(actions$: Actions<any>, userService: UserService);
    canSearch$: Observable<SearchStartAction>;
    search$: Observable<SearchSucceed | SearchFailed>;
}
