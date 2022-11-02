export default function OpenSourceLoading() {
  let circleCommonClasses = 'h-12 w-6 bg-current rounded-full'

  return (
    <div>
      <div className="grid place-items-center gap-10">
        <div className="flex animate-pulse">
          <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
          <div
            className={`${circleCommonClasses} mr-1 animate-bounce200`}
          ></div>
          <div
            className={`${circleCommonClasses} mr-1 animate-bounce400`}
          ></div>
          <div
            className={`${circleCommonClasses} mr-1 animate-bounce600`}
          ></div>
        </div>
        <div>
          <a
            className="animate-bounce gap-1 btn btn-success btn-outline btn-lg"
            href="/github"
            aria-label="View my GitHub profile"
            target="_blank"
          >
            <span className="animate-pulse">❤️</span>Open Source!
          </a>
        </div>
      </div>
    </div>
  )
}
