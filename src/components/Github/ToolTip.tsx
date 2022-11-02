interface Props {
  label?: string
  payload?: { value: number }[]
  active?: boolean
}

const ToolTip = ({ payload, active, label }: Props) => {
  const getString = (l: string) => {
    const n = 31 - parseInt(l)
    if (n) return `${n} days ago`
    return 'Today'
  }

  if (active && payload && payload.length) {
    return (
      <div className="md:alert md:p-auto p-1 rounded-md shadow-lg text-#76797d bg-slate-300 dark:alert-success">
        <p>{`${payload[0].value} contribution${
          payload[0].value === 1 ? '' : 's'
        } done ${getString(label || '')}`}</p>
      </div>
    )
  }

  return null
}

export default ToolTip
