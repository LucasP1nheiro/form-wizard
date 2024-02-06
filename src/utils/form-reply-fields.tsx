'use client'

import {
  CheckboxProps,
  ComponentProps,
  ComponentPropsMap,
  DatePickerProps,
  InputProps,
  ParagraphProps,
  RadioGroupProps,
  SelectProps,
  SubtitleProps,
  TextareaProps,
  TitleProps,
} from '@/types/components'
import React from 'react'
import ReplyInput from '@/components/reply/reply-input'
import ReplyTextArea from '@/components/reply/reply-text-area'
import ReplyDatePicker from '@/components/reply/reply-date-picker'
import ReplyCheckBox from '@/components/reply/reply-check-box'
import ReplySelect from '@/components/reply/reply-select'
import ReplyRadioGroup from '@/components/reply/reply-radio-group'

interface FormReplyFieldsProps {
  field: ComponentProps<keyof ComponentPropsMap>
}

export function FormReplyFields({
  field,
}: FormReplyFieldsProps): React.ReactNode {
  switch (field.type) {
    case 'title': {
      const props = field.props as TitleProps

      return <h1 className="text-3xl font-bold">{props?.text}</h1>
    }

    case 'subtitle': {
      const props = field.props as SubtitleProps

      return <h2 className="text-xl font-semibold">{props?.text}</h2>
    }

    case 'input': {
      const props = field.props as InputProps

      return (
        <ReplyInput
          required={props.required === undefined ? false : props.required}
          label={props.label}
          placeholder={props.placeholder}
          id={field.id}
        />
      )
    }

    case 'text area': {
      const props = field.props as TextareaProps

      return (
        <ReplyTextArea
          label={props.label}
          placeholder={props.placeholder}
          id={field.id}
          required={props.required === undefined ? false : props.required}
        />
      )
    }

    case 'date picker': {
      const props = field.props as DatePickerProps

      return (
        <ReplyDatePicker
          required={props.required === undefined ? false : props.required}
          label={props.label}
          placeholder={props.placeholder}
          id={field.id}
        />
      )
    }

    case 'select': {
      const props = field.props as SelectProps

      return (
        <ReplySelect
          required={props.required === undefined ? false : props.required}
          id={field.id}
          options={props.options}
          label={props.label}
        />
      )
    }

    case 'check box': {
      const props = field.props as CheckboxProps

      return <ReplyCheckBox id={field.id} label={props.label} />
    }

    case 'radio group': {
      const props = field.props as RadioGroupProps

      return (
        <ReplyRadioGroup
          required={props.required === undefined ? false : props.required}
          id={field.id}
          label={props.label}
          options={props.options}
        />
      )
    }

    case 'paragraph': {
      const props = field.props as ParagraphProps

      return <p className="text-muted-foreground">{props.text}</p>
    }
  }
}
