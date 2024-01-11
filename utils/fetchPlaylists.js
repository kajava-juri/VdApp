import axios from "axios";
export async function fetchPlaylists(userId) {
    try {

        const response = await axios.get("/api/playlistGetAll", {
            params:
                { userId: userId }
        });
        return response.data;
    } catch (e) {
        return null;
    }
}