import { SERVER_API, JWT } from '../../../config';
import axios from 'axios';

export const LoginAccount = (info) => (dispatch) => {
    return new Promise((resolve, reject) => {
        console.log(info);
        axios({
            url: `${SERVER_API}/user/login`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            data: {
                username: info.username,
                password: info.password,
            }
        })
            .then((res) => {
                if (res.data.token) {
                    localStorage.setItem("nro13-tkn", res.data.token);
                    localStorage.setItem("nro13-info", JSON.stringify(res.data.info));
                    resolve(true);
                }
            })
            .catch(err => {
                console.log("AAAAAAAAAAAAAA");
                alert('Login Failed');
                // this.props.ToggleAlert("failed", 'Login Failed', true);
            })
    })
}
