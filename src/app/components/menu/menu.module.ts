import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './presenter/menu.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
    declarations: [MenuComponent],
    imports: [
        CommonModule,
        MatListModule,
        MatSidenavModule,
        MatIconModule,
        MatTooltipModule,
        RouterModule,
        MatRippleModule,
        TranslateModule
    ],
    exports: [MenuComponent],
})
export class MenuModule {}
