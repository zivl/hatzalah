import EventEmitter from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher';
import HeaderConstants from '../constants/HeaderConstants';
import MedicAppConstants from '../constants/MedicAppConstants';

class MedicAppStore extends EventEmitter {


}

const instance = new MedicAppStore();

MedicAppStore.dispatchToken = AppDispatcher.register((action) => {

    switch (action.actionType) {
        case HeaderConstants.SIDE_BAR_ROUTE_CLICK:
            instance.emit(MedicAppConstants.ROUTE_TO, action.data);
            break;
        case HeaderConstants.SIDE_BAR_LINK_CLICK:
            break;
    }


});

export default instance;