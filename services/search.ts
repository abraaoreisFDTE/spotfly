import httpClient from '../api';
import { getToken } from '../utils/token';
const getFindSpotfly = async (search: String, type: String) => {
    let res = null
    await getToken().then((data) => {
        res = httpClient.get(`search?q=${search}&type=${type}&market=ES&limit=10&offset=5`, {
            headers: {
                Authorization: `Bearer ${data} `,
                'Content-Type': 'application/json'
            }
        });
    })
    return res
}

export {
    getFindSpotfly
}