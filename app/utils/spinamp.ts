import {fetchPlaylistById} from "@spinamp/spinamp-sdk";
import {PLAYLIST_ID} from "../config";

var res: any = null; // don't want to wrestle with the api and ts right now

export const getRandomTrack = async () => {
    if (!res) {
        res = await fetchPlaylistById(PLAYLIST_ID)
        console.log(res)
    }

    const n: number = Math.floor(Math.random() * (res.playlist.trackIds.length + 1));

    return res.playlistTracks[n]
}
