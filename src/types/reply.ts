export type PossibleFieldsType =
  | 'select'
  | 'radio-group'
  | 'check-box'
  | 'input'
  | 'text-area'
  | 'date-picker'

export type ReplyFields = {
  id: string
  label: string
  value: string
  type?: PossibleFieldsType
}
