export interface TitleProps {
  text: string
}

export interface SubtitleProps {
  text: string
}

export interface InputProps {
  label: string
  type?: string
  placeholder: string
  required?: boolean
}

export interface TextareaProps {
  label: string
  placeholder: string
  required?: boolean
}

export interface DatePickerProps {
  label: string
  placeholder: string
  required?: boolean
}

export interface SelectProps {
  label: string
  options: string[]
  required?: boolean
}

export interface CheckboxProps {
  label: string
  checked?: boolean
}

export interface RadioGroupProps {
  label: string
  options: string[]
  checkedValue?: string
  required?: boolean
}

export interface ParagraphProps {
  text: string
}

export type ComponentPropsMap = {
  title: TitleProps
  subtitle: SubtitleProps
  input: InputProps
  'text area': TextareaProps
  'date picker': DatePickerProps
  select: SelectProps
  'check box': CheckboxProps
  'radio group': RadioGroupProps
  paragraph: ParagraphProps
}

export type ComponentProps<Type extends keyof ComponentPropsMap> = {
  type: Type
  id: string
  props: ComponentPropsMap[Type]
}
