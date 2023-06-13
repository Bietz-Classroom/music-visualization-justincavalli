import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { PlaylistData } from 'src/app/data/playlist-data';

@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.css']
})
export class PlaylistPageComponent implements OnInit{
  id: string;
  playlistdata: PlaylistData;
  featuredata: object[] = [];

  constructor( private activatedRoute : ActivatedRoute, private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.grabData();
  }

  grabData() {
    this.spotifyService.getPlaylist(this.id).then(( data ) => {
      this.playlistdata = data;
      this.grabFeatureData();
    })
  }

  grabFeatureData() {
    for(let track of this.playlistdata.tracks) {
      this.spotifyService.getAudioFeaturesForTrack(track.id).then((data) => {
        let newFeature : object = {
          "Name": track.name,
          "Tempo (BPM)": data[0].percent,
          "Energy": data[1].percent * 100
        }
        this.featuredata.push(newFeature);
      })
    }

    console.log(this.featuredata);
  }
}
