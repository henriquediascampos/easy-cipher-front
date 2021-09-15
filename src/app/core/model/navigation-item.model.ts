export interface NavigationItem {
    name: string;
    icon?: string;
    path: string;
    describe?: string;
    childrens?: NavigationItem[]
}
