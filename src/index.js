import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd-mobile/dist/antd-mobile.css'
//引入store
import store from "./store/store.js";
//引入Provider，可以让组件拿到state状态
import { Provider } from "react-redux";

ReactDOM.render((<Provider store={store}><App /></Provider>), document.getElementById('root'));

