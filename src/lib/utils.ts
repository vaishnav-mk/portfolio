const truncate = (str: any, n: number) => {
  str?.length > n ? str.slice(0, n) + '...' : str
}

export { truncate }
