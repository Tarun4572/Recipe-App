import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { dataStorageService } from "../shared/data-storage.service";

@Component({
    selector : 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

    private userSub: Subscription;
    isAuthenticated = false;
    constructor(private dataStorageService: dataStorageService, private authService: AuthService){}
  

    ngOnInit(): void {
      this.userSub =  this.authService.user.subscribe(user=>{
         this.isAuthenticated = !user? false : true; 
      })
    }


    onSave(){
        this.dataStorageService.storeRecipes();
    }

    onFetch(){
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout(){
        this.authService.logout();
        this.isAuthenticated = false;
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}