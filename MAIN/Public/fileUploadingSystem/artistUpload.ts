const APIcontroller = (function(){
    const cliendId = '';
    const clientSecret = '';

    //private methods
    const _getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + btoa(cliendId + ':' + clientSecret)
            }, body: 'grant_type-client_credentials'
        });

        const data = await result.json();
        return data.access_token;// we will be able to use that bearer token to call a Spotify endpoint giving us actual playlists 
    }

    const _getGenres = async (token)=> {
        const result = await fetch('https://api.spotify.com/v1/browse/categories' , {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token}
        });

        const data = await result.json();
        return data.categories.items;
    }

    const _getPlaylistByGenre = async (token, genreId)=>{

        const limit = 10;

        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,{
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token}
        });

        const data = await result.json();
        return data.playlists.items;
    }

    const _getTracks = async(token, tracksEndPoint)=>{
        const limit = 10;

        const result = await fetch(`${tracksEndPoint}?limit=${limit}`,{
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token}
        });

        const data = await result.json();
        return data.items;
    }

    const _getTrack = async (token, trackEndPoint) => {

        const result = await fetch(`${trackEndPoint}`,{
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token}
        });

        const data = await result.json();
        return data;
    }

    return {
        getToken(){
            return _getToken();
        },
        getGenres(token){
            return _getGenres(token);
        },
        getPlaylistByGenre(token, genreId) {
            return _getPlaylistByGenre(token, genreId);
        },
        getTracks(token, tracksEndPoint){
            return _getTracks(token, tracksEndPoint);
        },
        _getTrack(token, trackEndPoint){
            return _getTrack(token, trackEndPoint);
        }
    }
    //By these two parentheses below we know that this module is an iffy(it cause the function to fire immediately.) 
}())

