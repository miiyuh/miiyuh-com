'use client'

import Image from 'next/image'

export default function AboutMePage() {
  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans">
      
      {/* 🧩 Page Content */}
      <section className="flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="/assets/img/kazuha.png"
              alt="kazuha"
              width={300}
              height={300}
              className="max-w-xs w-full rounded-lg"
            />
          </div>

          {/* Right Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl font-bold tracking-tighter mb-4">about me 🍁</h1>
            <p className="font-serif text-xl leading-relaxed tracking-tight text-[#FAF3E0]/90">
              i am rather a not-so-interesting person. very basic to be honest. when i have free time, i usually play games and maybe sometimes draw, depends on my mood. also, i sleep a LOT. any time i see fit, i would sleep. sleeping is the best, could not argue about it :&gt;
            </p>
          </div>
        </div>
      </section>

    </main>
  )
}
