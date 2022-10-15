import React from 'react';
import PropTypes from 'prop-types';
import Message from '../components/Message/Message';
import { useParams } from 'react-router-dom';

const Home = (props) => {
    const { id } = useParams();
    return (
        <div>
            <Message params={id} />
        </div>
    );
};

Home.propTypes = {};

export default Home;
