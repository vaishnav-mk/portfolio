import { stack } from 'data/stack'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'
import { SubLayout } from 'layouts/SubLayout'

export default function Stack() {
  return (
    <SubLayout
      title="My Stack"
      description="Some of the technologies I've worked with or I'm currently working with."
    >
      <div className="mb-8"></div>
      <div className="w-full flex flex-wrap -m-2 justify-center">
        {stack.map((item, index) => (
          <span
            className=" border border-lightText rounded-lg m-2 px-3 py-1 transition duration-500 ease select-none hover:bg-butLight dark:md:hover:bg-butDark"
            key={uuidv4()}
          >
            <div className="tooltip align-middle" data-tip={item}>
              <img
                src={`https://skillicons.dev/icons?i=${item.toLowerCase()}`}
                alt={item}
              ></img>
            </div>
          </span>
        ))}
      </div>
    </SubLayout>
  )
}
