import React, { useState } from "react";
import { Appbar, List, Avatar, Modal, Checkbox, Button } from "react-native-paper"
import { Searchbar } from 'react-native-paper';
import { IPLaylist } from "../../interface";
import { getPlaylistSpotplay } from "../../services/playlist";
import { getFindSpotfly } from "../../services/search";


interface IPropsFilteredPlaylist {
    visible: boolean
}
const containerStyle = { backgroundColor: 'white', padding: 20 };
const FilteredPlaylist: React.FC<IPropsFilteredPlaylist> = ({ visible }) => {
    const [check, setCheck] = useState({
        artist: true,
        playlist: true,
        album: true,
        tracks: true
    })

    const changeStringStatustoBoolean = (status: boolean) => {
        if (status == true) {
            return 'checked'
        } else {
            return 'unchecked'
        }
    }
    return (
        <Modal visible={visible} contentContainerStyle={containerStyle}>
            <>
                <Checkbox.Item label="Artists" status={changeStringStatustoBoolean(check.artist)} onPress={() => { setCheck({ ...check, artist: check.artist }) }} />
                <Checkbox.Item label="Playslist" status={changeStringStatustoBoolean(check.playlist)} onPress={() => { setCheck({ ...check, playlist: check.playlist }) }} />
                <Checkbox.Item label="Album" status={changeStringStatustoBoolean(check.album)} onPress={() => { setCheck({ ...check, album: check.album }) }} />
                <Checkbox.Item label="Tracks" status={changeStringStatustoBoolean(check.tracks)} onPress={() => { setCheck({ ...check, tracks: check.tracks }) }} />
            </>
            <Button style={{ marginTop: 30 }} onPress={() => { }}>
                Apply Filter
            </Button>
        </Modal>
    )
}

const PlaylistPage: React.FC = () => {
    const [responseQuery, setResponseQuery] = React.useState('');
    const [playlists, setPlaylists] = React.useState([]);
    React.useEffect(() => {
        getPlaylistSpotplay()
            .then(res => {
                const filtered = res?.data?.items
                    .filter((playlists: IPLaylist) => playlists.description != '')
                setPlaylists(filtered);
            })
            .catch(err => console.log(err));
    }, [])

    const onChangeSearch = (query: React.SetStateAction<string>) => {
        setResponseQuery(query);
    };
    const onHandleFindSpotfly = React.useCallback(() => {
        setTimeout(() => {
            getFindSpotfly(responseQuery, 'playlist')
                .then(res => {
                    const filtered = res?.data?.playlists?.items
                        .filter((playlists: IPLaylist) => playlists.description != '')
                    setPlaylists(filtered);
                })
                .catch(err => console.log(err));
        }, 600)
    }, [responseQuery])
    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="SPOTFLY" subtitle='These are your favorite music, enjoy!' />
                <Appbar.Action icon="dots-vertical" onPress={() => { }} />
            </Appbar.Header>
            <>
                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={responseQuery}
                    onIconPress={onHandleFindSpotfly}
                />
            </>
            <>
                {playlists.map((playlist: IPLaylist, index) => (
                    <List.Item
                        key={index}
                        left={props => <Avatar.Image {...props} source={{ uri: playlist?.images[2]?.url }} />}
                        title={playlist.name}
                        description={playlist.description}
                        right={props => <List.Icon {...props} icon="heart" color="#e4717a" />}
                    />
                ))
                }
            </>
            <>
                <FilteredPlaylist />
            </>
        </>
    )
}
export default PlaylistPage