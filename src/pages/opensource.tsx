import axios, { AxiosResponse } from 'axios'
import { useState, useEffect } from 'react'
import { userDetails } from 'lib/types'
import Graph from 'components/Github/Graph'
import { GenericMeta } from 'components/DefaultMeta'
import { MainLayout } from 'layouts/MainLayout'
import { SubLayout } from 'layouts/SubLayout'
import OpenSourceLoading from 'components/OpenSourceLoading'
type APIResponse = AxiosResponse<userDetails>

const Github = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<userDetails | undefined>(undefined)

  const fetchData = async () => {
    setLoading(true)
    const apiData = (await axios.get(
      '/api/github/contributions',
    )) as APIResponse
    setData(apiData.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <OpenSourceLoading />

  return (
    <>
      <GenericMeta
        title="Vaishnav | Open Source"
        description="An overview of my open source contributions!"
      />
      <MainLayout margin={false}>
        <SubLayout
          title="Open Source"
          description="My open source contributions, a graph of my contributions over the past year and a list of organizations I have contributed to, sorted by stars."
          iconTitle={['fas', 'heart']}
        >
          <div className="mb-8"></div>
          <div className="mockup-window border border-lightText">
            <div className="flex flex-col items-center justify-center px-4 pt-16 pb-5 border-t border-lightText">
              <Graph userData={data} />
              <p className="uppercase font-bold">
                My contributions over the past month. The more{' '}
                <span className="badge badge-success badge-outline rounded-md">
                  green
                </span>{' '}
                the better!
              </p>
            </div>
          </div>
        </SubLayout>
        <div className="mb-8"></div>
        <SubLayout
          title="Organizations"
          description="The organizations I have contributed to."
          iconTitle={['far', 'folder-open']}
        >
          <div className="mb-8"></div>
          <div className="flex flex-row flex-wrap justify-center">
            {data?.repositoriesContributedTo?.map((repo, i) => (
              <div
                className="tooltip"
                key={i}
                data-tip={`${repo.stargazerCount} 🌟`}
              >
                <a
                  href={repo.url}
                  className={`btn ${
                    repo.stargazerCount > 100
                      ? 'btn-success'
                      : repo.stargazerCount > 50
                      ? 'btn-warning'
                      : 'btn-ghost'
                  } btn-outline h-auto p-2 w-96 md:w-auto rounded-md m-2 gap-1 font-bold`}
                >
                  <img
                    src={repo.owner.avatarUrl}
                    className="w-6 h-6 mask mask-squircle"
                  />
                  <a href={repo.owner.url} target="_blank" rel="noreferrer"></a>
                  <div className="badge rounded-md">{repo.owner.login}</div>/
                  <div className="badge badge-outline rounded-md">
                    {repo.name}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </SubLayout>
      </MainLayout>
    </>
  )
}

export default Github
