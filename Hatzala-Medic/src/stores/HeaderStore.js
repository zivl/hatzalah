import EventEmitter from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher';
import HeaderConstants from '../constants/HeaderConstants';

var menuItems = [
    {route: '/', text: 'ראשי'},
    {route: 'settings', text: 'הגדרות'},
    {route: 'about', text: 'אודות'}
];

var headerTitle = 'איחוד הצלה';

class HeaderStore extends EventEmitter {

    getMenuItems() {
        return menuItems;
    }

    getTitle() {
        return headerTitle;
    }

}

const instance = new HeaderStore();

HeaderStore.dispatchToken = AppDispatcher.register((action) => {

    switch (action.actionType) {
        case HeaderConstants.SIDE_BAR_LINK_CLICK:
            break;
    }


});

export default instance;