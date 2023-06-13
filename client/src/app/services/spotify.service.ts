import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';
import { PlaylistData } from '../data/playlist-data';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //This function uses the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). 
    return lastValueFrom(this.http.get(this.expressBaseUrl + endpoint)).then((response) => {
      return response;
    }, (err) => {
      return err;
    });
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    console.log("category is " + category);
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album, playlist, etc.), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    switch (category) {
      case "playlist": {
        console.log("in switch case");
        return this.sendRequestToExpress('/search/playlist/' + encodeURIComponent(resource)).then((data) => {
          var playlists = [];
          for(var i = 0; i < data.playlists.items.length; i++) {
            console.log("before first loop");
            playlists[i] = new PlaylistData(data.playlists.items[i]);
            console.log("looping through");
          }
          console.log("after looping");
          return playlists;
        });
        break;
      }
    }
    return null as any;
  }

  getPlaylist(playlistId: string):Promise<PlaylistData> {
    return this.sendRequestToExpress('/playlist/' + playlistId).then((data) => {
      console.log(data);
      return new PlaylistData(data);
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    return null as any;
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
   return null as any;
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    return null as any;
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    return null as any;
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    return null as any;
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    return null as any;
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    return null as any;
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return this.sendRequestToExpress('/track-audio-features/' + trackId).then((data) => {
      var result = [];
      result.push(new TrackFeature("Tempo", data["Tempo"]));
      result.push(new TrackFeature("Energy", data["Energy"]));
      return result;
    })
  }
}
