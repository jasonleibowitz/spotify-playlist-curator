export type Song = {
	dateAdded: string;
	id: string;
	name: string;
	artists: string;
	album: string;
	thumbnails: SpotifyApi.ImageObject[];
	releaseDate: string;
	preview_url: string;
}