import closeHand from '@/assets/closedhand.svg'
import { FormInput, Heading1 } from 'lucide-react'
import Image from 'next/image'
import { ImParagraphLeft } from 'react-icons/im'
import { IoCalendarNumberOutline } from 'react-icons/io5'

function DragAndDropDemo() {
  return (
    <div className="w-full h-96 space-y-5">
      <div className="space-y-5 opacity-50 mt-12">
        <div className="md:w-4/5 mx-auto bg-black/10 dark:bg-white/10 rounded-md h-12 border-l-[10px] border-emerald-600 flex items-center gap-3 px-4">
          <Heading1 />
          <h1 className="font-bold">Title field</h1>
        </div>
        <div className="md:w-4/5 mx-auto bg-black/10 dark:bg-white/10 rounded-md h-12 border-l-[10px] border-emerald-500 flex items-center gap-3 px-4">
          <ImParagraphLeft />
          <h1 className="font-bold">Paragraph field</h1>
        </div>
        <div className="md:w-4/5 mx-auto bg-black/10 dark:bg-white/10 rounded-md h-12 border-l-[10px] border-emerald-400 flex items-center gap-3 px-4">
          <FormInput />
          <h1 className="font-bold">Input field</h1>
        </div>
      </div>
      <div className="md:w-4/5 mx-auto bg-black/10 dark:bg-white/10 rounded-md h-12 border-l-[10px] border-emerald-200 flex items-center gap-3 px-4 shadow-xl">
        <IoCalendarNumberOutline />
        <h1 className="font-bold">Date picker field</h1>
      </div>
      <Image
        src={closeHand.src}
        alt="Cursor dragging"
        width={24}
        height={24}
        className="relative bottom-8 left-24"
      />
    </div>
  )
}

export default DragAndDropDemo
