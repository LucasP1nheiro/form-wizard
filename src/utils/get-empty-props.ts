import { ComponentPropsMap } from '@/types/components'

export function getEmptyProps<Type extends keyof ComponentPropsMap>(
  type: Type,
): ComponentPropsMap[Type] {
  switch (type) {
    case 'title':
    case 'subtitle':
      return { text: '' } as ComponentPropsMap[Type]
    case 'input':
      return {
        label: '',
        type: '',
        placeholder: '',
        required: false,
      } as ComponentPropsMap[Type]
    case 'text area':
      return {
        label: '',
        placeholder: '',
        required: false,
      } as ComponentPropsMap[Type]
    case 'date picker':
      return { label: '', required: false } as ComponentPropsMap[Type]
    case 'select':
      return {
        label: '',
        options: [] as string[],
        required: false,
      } as ComponentPropsMap[Type]
    case 'check box':
      return { label: '', checked: false } as ComponentPropsMap[Type]
    case 'radio group':
      return {
        label: '',
        options: [] as string[],
        checkedValue: '',
      } as ComponentPropsMap[Type]
    default:
      return {} as ComponentPropsMap[Type]
  }
}
