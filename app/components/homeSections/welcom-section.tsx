"use client"
import { getHome } from '@/actions/home'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

const WelcomSection = () => {
  return (
    <div className="grid grid-cols-2 gap-5 my-16 px-10">
      <div className="flex flex-col justify-between ">
        {' '}
        <h1 className="text-slate-800 text-5xl font-bold">
          {' '}
          Capturez vos Idées Instantanément{' '}
        </h1>
        <p className="text-slate-600 text-lg ">
          Organisez vos penssées avec style grâce à cette plateforme simple,
          sécurisée et accessible partout.
        </p>
        <Button className="text-xl font-medium p-8 rounded-full bg-orange-500 w-max mx-auto">
          <Link href={'/notes/create'}>Créez votre Note</Link>
        </Button>
      </div>
      <div className="h-[300px] w-full ">
        <Image src={'/statics/hero.jpg'} priority alt="hero" width={1500} height={600} />
      </div>
    </div>
  )
}

export default WelcomSection
