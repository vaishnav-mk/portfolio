const truncate = (str: any, n: number) => {
  return str.length > n ? str.substr(0, n - 1) + '...' : str
}

export { truncate }
