/* default */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* in memory web api */
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/services/in-memory-data.service';

/* ngrx */
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from '@store/root.reducer';
import { effects } from '@store/root.effects';
import { CustomSerializer } from '@store/router/custom-router-serializer';

/* components */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '@views/home/home.component';

/* modules */
import { ActivitiesModule } from './modules/activities/activities.module';

/* environment */
import { environment } from 'environments/environment';

/* material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@modules/material/material.module';

/* flex layout */
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ActivitiesModule,
    HttpClientModule,

    /* in memory web api */
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, delay: 2000 }
    ),

    /* ngrx */
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),

    /* material */
    BrowserAnimationsModule,
    MaterialModule,

    /* flex layout */
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
