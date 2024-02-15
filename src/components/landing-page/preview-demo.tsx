import { Heading1, FormInput } from 'lucide-react'
import { ImParagraphLeft } from 'react-icons/im'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const PreviewDemo = () => {
  return (
    <>
      <div className="h-96 w-full lg:w-3/5 rounded-lg bg-white/5 duration-300 transition-all border border-border relative right-12 top-12 group-hover:scale-90">
        <div className="h-8 border-b border-border w-full px-2 flex items-center gap-3 mb-5">
          <div className="w-4 h-4 rounded-full bg-emerald-500" />
          <div className="w-4 h-4 rounded-full bg-emerald-400" />
          <div className="w-4 h-4 rounded-full bg-emerald-300" />
        </div>
        <div className="space-y-5">
          <div className="w-4/5 mx-auto bg-white/10 rounded-md h-12 border-l-[10px] border-emerald-600 flex items-center gap-3 px-4">
            <Heading1 />
            <h1 className="font-bold">Title field</h1>
          </div>
          <div className="w-4/5 mx-auto bg-white/10 rounded-md h-12 border-l-[10px] border-emerald-500 flex items-center gap-3 px-4">
            <ImParagraphLeft />
            <h1 className="font-bold">Paragraph field</h1>
          </div>
          <div className="w-4/5 mx-auto bg-white/10 rounded-md h-12 border-l-[10px] border-emerald-400 flex items-center gap-3 px-4">
            <FormInput />
            <h1 className="font-bold">Input field</h1>
          </div>
        </div>
      </div>
      <div className="h-full w-full lg:w-4/5 rounded-lg bg-white/5 duration-300 transition-all z-50 border border-border relative left-8 md:left-56 bottom-32 backdrop-blur-xl pb-8 group-hover:scale-110">
        <div className="h-8 border-b border-border w-full px-2 flex items-center gap-3 mb-5">
          <div className="w-4 h-4 rounded-full bg-emerald-500" />
          <div className="w-4 h-4 rounded-full bg-emerald-400" />
          <div className="w-4 h-4 rounded-full bg-emerald-300" />
        </div>
        <div className="space-y-5 w-4/5 mx-auto">
          <h1 className="font-bold text-2xl">Form title</h1>
          <p className="text-muted-foreground">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus
            excepturi dicta ut eligendi laborum quae nobis voluptatibus repellat
            cumque cupiditate distinctio eaque rem illo facere voluptate non
            quidem, provident ducimus.
          </p>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" readOnly />
          </div>
        </div>
      </div>
    </>
  )
}

export default PreviewDemo
