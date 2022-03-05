export interface TrackDetailResponse {
  track: TrackDetail;
}

interface TrackDetail {
  name: string;
  url: string;
  duration: string;
  streamable: {
    "#text": string;
    fulltrack: string;
  };
  listeners: string;
  playcount: string;
  artist: {
    name: string;
    url: string;
  };
  toptags: {
    tag: Tag[];
  };
  wiki: {
    published: string; // 17 Dec 2019, 09:44
    summary: string;
    content: string;
  };
}

interface Tag {
  name: string;
  url: string;
}
