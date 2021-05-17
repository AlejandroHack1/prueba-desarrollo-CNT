import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OrderByPipe } from '../order-by.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FolderPageRoutingModule,
    NgxDatatableModule,
    
  ],
  declarations: [FolderPage, OrderByPipe],
  
})
export class FolderPageModule {}
