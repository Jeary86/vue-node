// import Vue from 'vue'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Vue.prototype.$http = axios;

axios.defaults.withCredentials = true;

export default class Server {
    static async callApi (apiName, data) {

        // const json  = qs.stringify(data);

        const result = await axios(
            {
                url: apiName,
                data: data,
                method: 'post',
                responseType : 'json',
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            })

        return result.data;
    }

    static async getCallApi (apiName,data) {
        const result = await axios({
                url: apiName,
                method: 'get',
                responseType : 'json',
                params : data,
            })

        return result;
    }
}
