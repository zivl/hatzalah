/**
 * Test options:
 *
 */
import React from 'react';
import Header from '../components/Header';
import MedicAppConstants from '../constants/MedicAppConstants';
import MedicAppStore from '../stores/MedicAppStore';
import Topics from './Topics';

class MedicApp extends React.Component {

    componentDidMount() {
        MedicAppStore.on(MedicAppConstants.ROUTE_TO, this.onRouting.bind(this));
    }

    componentWillUnmount() {
        MedicAppStore.removeAllListeners();
    }

    render() {
        return (
            <div>
                <Header />
                {this.props.children}
            </div>
        );
    }

    onRouting(route) {
        debugger;
        this.context.router.transitionTo(route);
    }
}

MedicApp.defaultProps = {};
MedicApp.propTypes = {};
MedicApp.contextTypes = {
    router: React.PropTypes.object
};

export default MedicApp;