import AppDispatcher from '../dispatchers/AppDispatcher';
import HeaderConstants from '../constants/HeaderConstants';

class HeaderActions {

    sideBarRouteClick(routeData) {
        AppDispatcher.dispatch({
            actionType: HeaderConstants.SIDE_BAR_ROUTE_CLICK,
            data: routeData
        });
    }

    sideBarLinkClick(linkData) {
        AppDispatcher.dispatch({
            actionType: HeaderConstants.SIDE_BAR_LINK_CLICK,
            data: linkData
        });
    }

}

const instance = new HeaderActions();
export default instance;