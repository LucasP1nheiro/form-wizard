import { FormInput } from 'lucide-react'
import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const CustomFieldsDemo = () => {
  return (
    <div className="w-full h-full">
      <div className="h-32 w-32 bg-emerald-300 rounded-full relative top-64 2xl:left-[450px] md:left-[340px] left-24 opacity-60" />
      <div className="h-80 w-full rounded-lg bg-black/5 dark:bg-white/5 duration-300 transition-all border border-border relative left-16 bottom-8 group-hover:scale-105 backdrop-blur-xl z-30">
        <div className="h-8 border-b border-border w-full px-2 flex items-center gap-3 mb-5">
          <div className="w-4 h-4 rounded-full bg-emerald-500" />
          <div className="w-4 h-4 rounded-full bg-emerald-400" />
          <div className="w-4 h-4 rounded-full bg-emerald-300" />
        </div>
        <div className="flex items-center gap-2 ml-4">
          <FormInput />
          <h1 className="font-bold">Input field</h1>
        </div>
        <div className="ml-4 space-y-5 mt-8">
          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input
              placeholder="Specify the label for your input here."
              readOnly
              id="label"
              className="w-[350px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="placeholder">Placeholder</Label>
            <Input
              placeholder="Specify the placeholder for your input here."
              readOnly
              id="placeholder"
              className="w-[350px]"
            />
          </div>
        </div>
      </div>
      <div className="h-32 w-32 bg-emerald-400 rounded-full relative bottom-64 2xl:left-[510px] md:left-[400px] left-36 z-0 opacity-60" />
    </div>
  )
}

export default CustomFieldsDemo
