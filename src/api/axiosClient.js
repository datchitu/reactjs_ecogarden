import axios from 'axios';
import * as process from 'process';
// const cors = require("cors");
const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_URL_API,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS',
	},
	mode: "cors",
	body: JSON.stringify(),
})

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

if (localStorage.getItem('accessToken')) {
	axiosClient.defaults.headers.common['Authorization'] =  'Bearer ' + localStorage.getItem('accessToken');
}

export default axiosClient;
