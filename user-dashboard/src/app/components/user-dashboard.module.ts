import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DASHBOARD_ROUTES } from './user-dashboard.routes';
import { UserDashboardComponent } from './user-dashboard.component';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../service/dashboard.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DASHBOARD_ROUTES),
    MatToolbarModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
  ],
  declarations: [
    UserDashboardComponent
  ],
  providers: [
    DashboardService
  ],
})
export class DashboardModule { }