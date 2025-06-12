'use client'

export default function FontTestPage() {
  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Font Test Page</h1>
        
        <div className="space-y-6">
          {/* Inter (Default Sans) */}
          <div className="border border-[#FAF3E0]/20 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Inter Font (Default Sans)</h2>
            <p className="text-lg">
              This text uses Inter font as the default sans-serif font. 
              Inter is designed for user interfaces with excellent readability.
              123456789 !@#$%^&*()
            </p>
            <p className="font-sans text-lg mt-2">
              This text explicitly uses font-sans class with Inter.
            </p>
          </div>

          {/* Noto Serif */}
          <div className="border border-[#FAF3E0]/20 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Noto Serif Font</h2>
            <p className="font-serif text-lg">
              This text uses Noto Serif font for elegant and readable body text.
              Perfect for longer paragraphs and traditional typography.
              123456789 !@#$%^&*()
            </p>
          </div>

          {/* Noto Mono */}
          <div className="border border-[#FAF3E0]/20 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Noto Mono Font</h2>
            <p className="font-mono text-lg">
              This text uses Noto Mono font for code and monospaced content.
              const example = &quot;Hello World&quot;;
              function test() {'{'} return true; {'}'}
              123456789 !@#$%^&*()
            </p>
          </div>

          {/* Noto Color Emoji */}
          <div className="border border-[#FAF3E0]/20 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Noto Color Emoji Font</h2>
            <p className="font-emoji text-lg">
              This text uses Noto Color Emoji font.
              🎨 📸 🍁 🇯🇵 💻 🎮 🎵 ⭐ 🌟 ✨ 🔥 💜 ❤️ 🧡 💛 💚 💙
            </p>
          </div>          {/* Mixed fonts in one paragraph */}
          <div className="border border-[#FAF3E0]/20 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Mixed Fonts Example</h2>
            <p className="text-lg">
              This paragraph uses <span className="font-sans">Inter (sans)</span>, 
              <span className="font-serif"> Noto Serif</span>, 
              <span className="font-mono"> Noto Mono code</span>, and 
              <span className="font-emoji">🎉 emojis 🚀</span> together.
            </p>
          </div>

          {/* Comprehensive Emoji Test */}
          <div className="border border-[#FAF3E0]/20 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Comprehensive Emoji Test (should all use Noto Color Emoji)</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-2">Default text with emojis (no explicit font class):</h3>
                <p className="text-lg">
                  😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">font-sans with emojis:</h3>
                <p className="font-sans text-lg">
                  🎨 🎭 🎪 🎬 🎤 🎧 🎼 🎵 🎶 🎸 🥁 🎹 🎺 🎻 🎲 🎯 🎳 🎮 🎰 🧩
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">font-serif with emojis:</h3>
                <p className="font-serif text-lg">
                  🌍 🌎 🌏 🌐 🗺️ 🗾 🧭 🏔️ ⛰️ 🌋 🗻 🏕️ 🏖️ 🏜️ 🏝️ 🏞️ 🏟️ 🏛️ 🏗️ 🧱
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">font-mono with emojis:</h3>
                <p className="font-mono text-lg">
                  💻 🖥️ 🖨️ ⌨️ 🖱️ 🖲️ 💽 💾 💿 📀 📱 📲 ☎️ 📞 📟 📠 📺 📻 🎙️ 🎚️
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Explicit font-emoji class:</h3>
                <p className="font-emoji text-lg">
                  🇯🇵 🇺🇸 🇬🇧 🇫🇷 🇩🇪 🇮🇹 🇪🇸 🇨🇦 🇦🇺 🇰🇷 🇨🇳 🇮🇳 🇧🇷 🇲🇽 🇷🇺
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Complex emoji sequences:</h3>
                <p className="text-lg">
                  👨‍💻 👩‍💻 👨‍🎨 👩‍🎨 👨‍🏫 👩‍🏫 👨‍🔬 👩‍🔬 👨‍⚕️ 👩‍⚕️ 👨‍🚀 👩‍🚀
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Skin tone variations:</h3>
                <p className="text-lg">
                  👋 👋🏻 👋🏼 👋🏽 👋🏾 👋🏿 👍 👍🏻 👍🏼 👍🏽 👍🏾 👍🏿
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
