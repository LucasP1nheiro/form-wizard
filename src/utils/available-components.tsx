import { TbH1, TbH2 } from 'react-icons/tb'
import { LuFormInput } from 'react-icons/lu'
import { BsTextareaResize, BsUiRadios } from 'react-icons/bs'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import { GoSingleSelect } from 'react-icons/go'
import { IoIosCheckboxOutline } from 'react-icons/io'
import TitleFields from '@/components/fields/title-fields'
import SubtitleFields from '@/components/fields/subtitle-fields'
import InputFields from '@/components/fields/input-fields'
import TextareaFields from '@/components/fields/textarea-fields'
import DatePickerFields from '@/components/fields/datepicker-fields'
import SelectFields from '@/components/fields/select-fields'
import CheckboxFields from '@/components/fields/checkbox-fields'
import RadioGroupFields from '@/components/fields/radio-group-fields'

export interface AvailableComponentsProps {
  name: string
  icon: React.ReactNode
  sheetContent: (id: string) => React.ReactNode
  type:
    | 'title'
    | 'subtitle'
    | 'text area'
    | 'select'
    | 'check box'
    | 'input'
    | 'date picker'
    | 'radio group'
}

export const availableComponents: AvailableComponentsProps[] = [
  {
    name: 'Title field',
    icon: <TbH1 size={28} />,
    sheetContent: (id: string) => <TitleFields id={id} />,
    type: 'title',
  },
  {
    name: 'Subtitle field',
    icon: <TbH2 size={28} />,
    sheetContent: (id: string) => <SubtitleFields id={id} />,
    type: 'subtitle',
  },
  {
    name: 'Input field',
    icon: <LuFormInput size={28} />,
    sheetContent: (id: string) => <InputFields id={id} />,
    type: 'input',
  },
  {
    name: 'Textarea field',
    icon: <BsTextareaResize size={28} />,
    sheetContent: (id: string) => <TextareaFields id={id} />,
    type: 'text area',
  },
  {
    name: 'Date Picker field',
    icon: <IoCalendarNumberOutline size={28} />,
    sheetContent: (id: string) => <DatePickerFields id={id} />,
    type: 'date picker',
  },
  {
    name: 'Select field',
    icon: <GoSingleSelect size={28} />,
    sheetContent: (id: string) => <SelectFields id={id} />,
    type: 'select',
  },
  {
    name: 'Checkbox field',
    icon: <IoIosCheckboxOutline size={28} />,
    sheetContent: (id: string) => <CheckboxFields id={id} />,
    type: 'check box',
  },
  {
    name: 'Radio Group field',
    icon: <BsUiRadios size={28} />,
    sheetContent: (id: string) => <RadioGroupFields id={id} />,
    type: 'radio group',
  },
]
