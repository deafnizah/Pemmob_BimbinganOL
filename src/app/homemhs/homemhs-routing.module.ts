import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomemhsPage } from './homemhs.page';

const routes: Routes = [
  {
    path: '',
    component: HomemhsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomemhsPageRoutingModule {}
