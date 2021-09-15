import { NavigationItem } from './core/model/navigation-item.model';

export const MENU_ITENS: NavigationItem[] = [
    // {
    //     name: 'Group do poder',
    //     icon: 'label_important',
    //     childrens: [
    //         {
    //             name: 'Children 1',
    //             icon: 'share',
    //             path: 'teste'
    //         },
    //         {
    //             name: 'Children 2',
    //             icon: 'share',
    //             path: 'teste'
    //         },
    //     ],
    // },
    {
        name: 'MENU.HOME',
        icon: 'home',
        path: 'home',
    },
    {
        name: 'MENU.CIPHER_FACTORY',
        icon: 'music_note',
        path: 'ciphers-factory',
    },
    {
        name: 'MENU.MUSIC_BOOK',
        icon: 'auto_stories',
        path: 'music-book',
    }

];
