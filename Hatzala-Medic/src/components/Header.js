/**
 * Header options:
 *
 */
import React from 'react';
import mui from 'material-ui';

class Header extends React.Component {

    render() {
        var RaisedButton = mui.RaisedButton;
        return <RaisedButton label="Primary" primary={true}/>;
    }
}

Header.defaultProps = {};
Header.propTypes = {};

export default Header;