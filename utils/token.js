import axios from 'axios';
import base64 from 'react-native-base64';

const clientId = 'a27fe7379fb24f59bec7b7cd883f4068';
const clientSecret = 'e2c13382cb304781a6f95839d87ba07b'

const Base64EncodedCredentials = base64.encode(`${clientId}:${clientSecret}`);
export const getToken = async () => {
    const res = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
        headers: {
            'Authorization': `Basic ${Base64EncodedCredentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    return res.data.access_token
}