import { getTopTracks } from 'lib/spotify'

export default async (_: any, res: any) => {
  const response = await getTopTracks()
  const { items } = await response.json()

  const tracks = items.slice(0, 10).map((track: any) => ({
    artist: track.artists.map((_artist: any) => _artist.name),
    songUrl: track.external_urls.spotify,
    title: track.name,
    images: track.album.images.map((image: any) => image.url),
    type: track.type,
    releaseDate: track.album.release_date,
    duration: track.duration_ms,
  }))

  return res.status(200).json(tracks)
}
