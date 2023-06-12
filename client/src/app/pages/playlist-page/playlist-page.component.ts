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

  constructor( private activatedRoute : ActivatedRoute, private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    // this.grabData();
  }

  grabData() {
    this.spotifyService.getPlaylist(this.id).then(( data ) => {
      console.log("after fetching data");
      this.playlistdata = data;
      console.log("after setting data");
      // console.log(this.playlistdata.name);
    })
  }
}
