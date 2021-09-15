import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NavigationItem } from 'src/app/core/model/navigation-item.model';
import { MENU_ITENS } from 'src/app/ITEM-MENU';

@Component({
    selector: 'ec-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
    menus: NavigationItem[] = MENU_ITENS;
    opened: boolean = false

    constructor() { }

    ngOnInit(): void {

    }

    groupMenuToogle(groupmenuitems: HTMLElement,  childrens: number, iconToggle: MatIcon) {
        iconToggle._elementRef.nativeElement.classList.toggle('icon-toggle')

        if (groupmenuitems.attributes.getNamedItem('opened')?.value === 'false') {
            groupmenuitems.style.height = `${48 * childrens}px`;
            // @ts-ignore: Object is possibly 'null'.
            groupmenuitems.attributes.getNamedItem('opened').value = 'true';
        } else {
            // @ts-ignore: Object is possibly 'null'.
            groupmenuitems.attributes.getNamedItem('opened').value = 'false';
            groupmenuitems.style.height = `0px`;
        }

    }

    toggle() {
        this.opened = !this.opened
    }

}
