const express = require('express');
const router =express.Router();

const {createUser,login,getUserDetails}=require('../controller/user_controller');

const uploadMulter=require('../middlewares/upload');
const authorizeRoute=require('../middlewares/auth');
const validation=require('../middlewares/validation');
router.post('/registion',uploadMulter,validation,createUser);
router.post('/login',login);
router.get('/userDetails',authorizeRoute,getUserDetails);

module.exports = router;




// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (
//         localStorage.getItem('auth')
//             ? <Component {...props} />
//             : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
//     )} />
// )
// export default PrivateRoute;