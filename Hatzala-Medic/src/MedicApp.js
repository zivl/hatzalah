/**
 * Test options:
 *
 */
import React from 'react';
import Button from 'material-ui/lib/raised-button';

class MedicApp extends React.Component {

    render() {
        return (
            <div>
                <Button label='ziv'/>
            </div>
        );
    }
}

MedicApp.defaultProps = {};
MedicApp.propTypes = {};

export default MedicApp;