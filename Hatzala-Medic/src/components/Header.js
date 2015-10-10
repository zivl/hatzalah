/**
 * Header options:
 *
 */
import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import HeaderStore from '../stores/HeaderStore';
import HeaderActions from '../actions/HeaderActions';
import HeaderTitle from './HeaderTitle';
//import SearchIcon from 'material-ui/lib/svg-icons/action/search';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {menuItems: HeaderStore.getMenuItems()};

    }

    componentDidMount() {
        //HeaderStore.on('anyEvent', this.onAnyChange);
    }

    componentWillUnmount() {
        //HeaderStore.removeAllListeners();
    }

    render() {

        return (
            <div className='header'>
                <AppBar title={ <div className='header-title'></div> }
                        onLeftIconButtonTouchTap={this.onLeftHeaderIconClick.bind(this)}/>
                <LeftNav ref="leftNav" docked={false} menuItems={this.state.menuItems}
                         onChange={this.onSideBarLinkClick.bind(this)}/>
            </div>
        );
    }

    onLeftHeaderIconClick(event) {
        this.refs.leftNav.toggle();
    }

    onSideBarLinkClick(e, index, item) {
        HeaderActions.sideBarRouteClick(item.route);
    }

    onAnyChange(data) {

    }
}

Header.defaultProps = {};
Header.propTypes = {};

export default Header;