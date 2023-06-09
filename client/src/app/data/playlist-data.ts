import { ResourceData } from './resource-data';
import { TrackData } from './track-data';

export class PlaylistData extends ResourceData {
    description: string;
    owner: string;
    length: number;
    tracks: TrackData[];

	constructor(objectModel:{}) {
		super(objectModel);
		this.category = "playlist";
        
        const temp = (objectModel['description'].includes("<") ? "" : objectModel['description']);  // remove tags
        this.description = (temp.length > 150 ? temp.substring(0, 150) + "..." : temp);             // truncate to 150 characters

        this.owner = objectModel['owner'].display_name;
        this.length = objectModel['tracks'].total;

        if(objectModel['tracks'].items) {
            var playlistTrackObjects = [];
            playlistTrackObjects = objectModel['tracks'].items;
            this.tracks = [];
            for(let i = 0; i < playlistTrackObjects.length; i++) {
                this.tracks.push(new TrackData(playlistTrackObjects[i].track));
            }
        }
	}

}