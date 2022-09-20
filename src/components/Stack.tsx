import { stack } from 'data/stack'
import { futureStack } from 'data/stack'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'
import { SubLayout } from 'layouts/SubLayout'
import { useTheme } from 'next-themes'

export default function Stack() {
  const { theme } = useTheme()
  return (
    <>
      <SubLayout
        title="My Stack"
        description="Some of the technologies I've worked with or I'm currently working with."
        iconTitle={['fas', 'book']}
      >
        <div className="mb-8"></div>
        <div className="w-full flex flex-wrap gap-1 justify-between">
          {stack.map((item, index) => (
            <span
              className=" outline outline-2 outline-lightText rounded-md m-2 ml-0 px-3 py-1 ease select-none hover:bg-butLight dark:md:hover:bg-butDark transition duration-300 ease-in-out transform hover:scale-105"
              key={uuidv4()}
            >
              <div className="tooltip align-middle" data-tip={item}>
                <img
                  src={`https://skillicons.dev/icons?i=${item.toLowerCase()}&theme=${theme}`}
                  alt={item}
                ></img>
              </div>
            </span>
          ))}
        </div>
      </SubLayout>
      <div className="mb-8"></div>
      <SubLayout
        title="My Future Stack Add-ons"
        description="Some of the technologies I want to learn in the future."
        iconTitle={['fas', 'book']}
      >
        <div className="mb-8"></div>
        <div className="w-full flex flex-wrap gap-1 justify-between">
          {futureStack.map((item, index) => (
            <span
              className=" outline outline-2 outline-lightText rounded-md m-2 ml-0 px-3 py-1 ease select-none hover:bg-butLight dark:md:hover:bg-butDark transition duration-300 ease-in-out transform hover:scale-105"
              key={uuidv4()}
            >
              <div className="tooltip align-middle" data-tip={item}>
                <img
                  src={`https://skillicons.dev/icons?i=${item.toLowerCase()}&theme=${theme}`}
                  alt={item}
                ></img>
              </div>
            </span>
          ))}
        </div>
      </SubLayout>
    </>
  )
}
