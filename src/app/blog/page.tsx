'use client'

export default function BlogPage() {
  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans">

      {/* 🧩 Page Content */}
      <section className="flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-[70vh] flex flex-col justify-center">
        <h1 className="text-5xl font-bold tracking-tighter mb-2">blog 📰</h1>
        <p className="text-lg text-[#FAF3E0]/90 mb-6">
          this is where i will post my blog, if i have any.
        </p>

        <div className="w-full">
          <iframe
            src="https://miiyuh.blogspot.com/"
            className="w-full h-[1000px] rounded-lg border border-[#FAF3E0]/20"
            loading="lazy"
          ></iframe>
        </div>
      </section>

    </main>
  )
}
