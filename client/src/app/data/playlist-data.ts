import { ResourceData } from './resource-data';
import { TrackData } from './track-data';

export class PlaylistData extends ResourceData {
    description: string;
    tracks: TrackData[];

	constructor(objectModel:{}) {
		super(objectModel);
		this.category = "playlist";

        this.description = objectModel['description'];

        // if(objectModel['tracks']) {
        //     this.tracks = objectModel['tracks'].map((track) => {
        //         return new TrackData(track);
        //     });
        // }
	}

}
