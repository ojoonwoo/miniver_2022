import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserHistory } from 'history';
import styles from './WorkBox.module.scss';

function Loader(props) {

    useEffect(() => {
        console.log('Loader Component Mounted');
        // if(!boxRef.current) {
        //     console.log('null');
        // }
    }, []);


    return (
        <div className="global-loader"></div>
    );
}

export default Loader;