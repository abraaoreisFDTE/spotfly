import httpClient from '../api';
import { getToken } from '../utils/token';
const getPlaylistSpotplay = async () => {
    let res = null
    await getToken().then((data) => {
        res = httpClient.get('users/smedjan/playlists', {
            headers: {
                Authorization: `Bearer ${data} `,
                'Content-Type': 'application/json'
            }
        });
    })
    return res
}

export {
    getPlaylistSpotplay
}