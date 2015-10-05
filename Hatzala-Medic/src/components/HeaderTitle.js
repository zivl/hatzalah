/**
 * HeaderTitle options:
 *
 */
import React from 'react';

class HeaderTitle extends React.Component {

    render() {
        return (
            <div className='header-title'>{this.props.title}</div>
        );
    }
}

HeaderTitle.defaultProps = {};
HeaderTitle.propTypes = {
    title: React.PropTypes.string
};

export default HeaderTitle;