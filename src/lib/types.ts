export type Views = {
  total: number
}

export type Song = {
  artist: string[]
  songUrl: string
  title: string
  images: string[]
  type: string
  releaseDate: string
  duration: string
  index: number
}

export type NowPlayingSong = {
  album: string
  albumImageUrl: string
  artist: string
  isPlaying: boolean
  songUrl: string
  title: string
}

export type TopTracks = {
  tracks: Array<Song>
}

export type YouTube = {
  subscriberCount: number
  viewCount: number
}

export type GitHub = {
  followers: number
  stars: number
}
