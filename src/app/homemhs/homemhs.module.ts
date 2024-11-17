import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomemhsPageRoutingModule } from './homemhs-routing.module';

import { HomemhsPage } from './homemhs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomemhsPageRoutingModule
  ],
  declarations: [HomemhsPage]
})
export class HomemhsPageModule {}
