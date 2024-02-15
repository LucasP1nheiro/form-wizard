import React from 'react'
import { Features } from '@/components/landing-page/features'
import { Github, RocketIcon, Sparkles, Star } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TypewriterEffect } from '@/components/ui/typewritter-effect'
import { Spotlight } from '@/components/ui/spotlight'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'

const Page = () => {
  const words = [
    {
      text: 'Build',
    },
    {
      text: 'forms',
    },
    {
      text: 'easily',
    },
    {
      text: 'with',
    },
    {
      text: 'Form Wizard.',
      className:
        'bg-gradient-to-r from-emerald-200 to-emerald-400 bg-clip-text text-transparent',
    },
  ]
  // <a target="_blank" rel="noreferrer" href="https://github.com/typehero/typehero" class="animate-bg-gradient-to-center group rounded-full bg-gradient-to-r from-yellow-600 via-[#3178c6] to-[#3178c6] to-70% bg-[length:420%_420%] bg-right-bottom p-[1px] brightness-90 contrast-150 duration-500 hover:bg-left-top hover:shadow-[0_0_2rem_-0.5rem_#3178c6] dark:from-yellow-500 dark:via-white dark:to-[#3178c6] dark:brightness-125 dark:contrast-100 dark:hover:shadow-[0_0_2rem_-0.5rem_#fff8]"><div class="rounded-full bg-white/80 px-3 py-1 dark:bg-black/80"><span class="animate-bg-gradient-to-center relative flex select-none items-center bg-gradient-to-r to-70% bg-[length:420%_420%] bg-clip-text bg-right-bottom text-transparent duration-500 group-hover:bg-left-top dark:from-yellow-500 dark:via-white dark:to-[#3178c6]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-oldstar absolute  -left-1 top-0.5 mr-2 h-5 w-5 translate-x-0.5 stroke-[#3178c6] stroke-2 duration-500 group-hover:rotate-180 group-hover:scale-110 group-hover:stroke-yellow-600 dark:duration-500  "><path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-newstar mr-2 h-4 w-4 stroke-[#3178c6] stroke-2 duration-500 group-hover:rotate-180 group-hover:scale-110 group-hover:fill-[#3178c6] dark:stroke-white dark:duration-500 dark:group-hover:fill-white"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"></path></svg> Star us on GitHub</span></div></a>

  return (
    <main className="w-screen min-h-screen pt-48 bg-background">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="lg:w-4/5 w-full mx-auto flex flex-col xl:flex-row items-center justify-between gap-8 text-center xl:text-start p-4">
        <div className="space-y-8">
          <a
            className="w-fit mx-auto xl:mx-0  rounded-full bg-gradient-to-r from-emerald-100 to-emerald-400 p-[1px] brightness-90 contrast-150 focus:outline-none focus:ring-emerald-600 focus-visible:ring-2 dark:brightness-125 dark:contrast-100 block hover:scale-105 duration-300 transition-all hover:shadow-[0_0_2rem_-0.5rem_#fff8]"
            href="https://github.com/LucasP1nheiro/form-wizard"
          >
            <div className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white/80 px-3 py-1 duration-300  dark:bg-black/80">
              {/* <Sparkles
                size={16}
                className="animate-oldstar translate-x-0.5 stroke-2 duration-500 group-hover:rotate-180 group-hover:scale-110  dark:duration-500  "
              /> */}
              <Star
                size={16}
                className="animate-oldstar translate-x-0.5 stroke-2 duration-500 group-hover:rotate-180 group-hover:scale-110  dark:duration-500  group-hover:fill-white"
              />
              <span className="select-none bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
                Star on github
              </span>
            </div>
          </a>
          <TypewriterEffect
            words={words}
            className="text-center xl:text-start"
          />
          <p className="dark:text-muted-foreground text-lg">
            Drag-and-drop interface, customizable fields, real-time previews,
            analytics, and more.
          </p>

          <div className="flex items-center gap-3 h-fit py-2 flex-col lg:flex-row lg:justify-center xl:justify-start">
            <Link
              href="/sign-in"
              className="relative h-12 z-30 overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 group hover:shadow-[0_0_2rem_-0.5rem_#fff8] transition-all duration-300 w-full lg:w-fit"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFFFFF_0%,#52525b_50%,#FFFFFF_100%)]" />
              <span className="flex items-center gap-3 h-full w-full cursor-pointer justify-center rounded-xl bg-background/90 group-hover:bg-background transition-all duration-300 px-3 py-1 text-md  text-white backdrop-blur-3xl font-bold">
                <RocketIcon size={18} />
                Start building
              </span>
            </Link>
            <Button
              variant={'outline'}
              className="py-6 h-12 rounded-lg flex items-center gap-2 w-full lg:w-fit"
              asChild
            >
              <a href="https://github.com/LucasP1nheiro/form-wizard">
                <Github size={18} />
                <span className="text-md font-bold">Github</span>
              </a>
            </Button>
          </div>
        </div>
        <CardContainer className="inter-var">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-background/50 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border backdrop-blur-2xl ">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              What suits you best
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Craft custom forms tailored to your specific needs
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <div className="rounded-md h-48 w-full bg-card p-4 space-y-5">
                <div className="w-full h-4 rounded-full  bg-emerald-200" />
                <div className="w-4/5 h-4 rounded-full  bg-emerald-300" />
                <div className="w-3/5 h-4 rounded-full  bg-emerald-400" />
                <div className="w-2/5 h-4 rounded-full  bg-emerald-500" />
                <div className="w-1/5 h-4 rounded-full  bg-emerald-600" />
              </div>
            </CardItem>
            <div className="flex justify-between items-center mt-20">
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
              >
                <Link href="/sign-in">Try now →</Link>
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>
      <Features />
    </main>
  )
}

export default Page
