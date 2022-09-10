// @ts-nocheck

import { MainLayout } from 'layouts/MainLayout'
import { GenericMeta } from 'components/DefaultMeta'
import useSWR from 'swr'
import fetcher from 'lib/fetcher'
import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TopTracks } from 'lib/types'

function millisToMinutesAndSeconds(millis: any) {
  var minutes = Math.floor(millis / 60000)
  var seconds = ((millis % 60000) / 1000).toFixed(0)
  return minutes + ':' + (seconds < '10' ? '0' : '') + seconds + ' mins'
}
export const Track = ({
  artist,
  songUrl,
  title,
  images,
  type,
  releaseDate,
  duration,
  index,
}: {
  artist: string[]
  songUrl: string
  title: string
  images: string[]
  type: string
  releaseDate: string
  duration: string
  index: number
}) => {
  return (
    <tr>
      <th>
        <label>
          <div className="flex justify-between">{index + 1}.</div>
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={images?.at(-1)} alt="Image description" />
            </div>
          </div>
          <div>
            <div className="font-bold">{title.slice(0, 20)}</div>
            <div className="text-sm opacity-50">{type}</div>
          </div>
        </div>
      </td>
      <td>{artist.join(',')}</td>
      <td>
        {' '}
        <div className="font-bold badge">{releaseDate}</div>
      </td>
      <td>
        <div className="badge">{millisToMinutesAndSeconds(duration)}</div>
      </td>
      <th>
        <Link href={songUrl}>
          <button className="btn btn-success btn-outline btn-xs">
            <FontAwesomeIcon className="w-4 h-4" icon={['fas', 'headphones']} />
          </button>
        </Link>
      </th>
    </tr>
  )
}

const Spotify = () => {
  const { data, error, isValidating } = useSWR<TopTracks>(
    '/api/spotify/top-tracks',
    fetcher,
  )
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <GenericMeta title="Spotify" description="Spotify stuff!" />
      <MainLayout margin={false}>
        <div className=" btn w-full btn-success btn-outline gap-2">
          <FontAwesomeIcon icon={['fab', 'spotify']} />
          Not Playing – Spotify
        </div>
        <div className="overflow-hidden">
          <h2 className=" landingSectionTitle relative mb-4 mt-4 w-max">
            <div className="btn btn-success btn-outline gap-2 font-semibold text-sm sm:text-regular">
              <FontAwesomeIcon icon={['fas', 'list-check']} />
              My top tracks
            </div>
          </h2>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full rounded-md">
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>track Info</th>
                <th>artist(s)</th>
                <th>release date</th>
                <th>track duration</th>
                <th>listen</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((track: any, index: number) => (
                <Track
                  key={uuidv4()}
                  artist={track.artist}
                  songUrl={track.songUrl}
                  title={track.title}
                  images={track.images}
                  type={track.type}
                  releaseDate={track.releaseDate}
                  duration={track.duration}
                  index={index}
                />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>track Info</th>
                <th>artist(s)</th>
                <th>release date</th>
                <th>track duration</th>
                <th>listen</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </MainLayout>
    </>
  )
}

export default Spotify
