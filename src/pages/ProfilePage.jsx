import React from 'react';
import PropTypes from 'prop-types';
import Profile from '../components/Profile/Profile';

const Profilepage = (props) => {
    return (
        <div style={{ marginLeft: '100px' }}>
            <Profile />
        </div>
    );
};

Profilepage.propTypes = {};

export default Profilepage;
