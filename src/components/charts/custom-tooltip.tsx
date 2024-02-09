interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: string | number }>
  label?: string
  text?: string
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  text,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border shadow-xl rounded-md z-50 p-8">
        <h3 className="font-bold">{label}</h3>
        <p className="text-muted-foreground">
          {text} : <strong className="text-primary">{payload[0].value}</strong>
        </p>
      </div>
    )
  }

  return null
}

export default CustomTooltip
