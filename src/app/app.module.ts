import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {GridManagerService} from "./game/brain/grid-manager.service";
import {GameService} from "./game/brain/game.service";
import { GameComponent } from './game/game/game.component';
import { GridComponent } from './game/grid/grid.component';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GridComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [GridManagerService,GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
