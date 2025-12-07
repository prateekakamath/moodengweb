import { FloatingFruits } from "@/components/floating-fruits"

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-2 md:p-4 gap-2"
      style={{
        background: "linear-gradient(135deg, #ff9d5c 0%, #f9741e 50%, #ff6b35 100%)",
      }}
    >
      <FloatingFruits />

      <div
        className="w-full max-w-[360px] aspect-[9/16] rounded-lg overflow-hidden relative z-10"
        style={{
          boxShadow: `
            0 0 40px rgba(249, 116, 30, 0.3),
            0 0 80px rgba(249, 116, 30, 0.2),
            0 10px 40px rgba(0, 0, 0, 0.15)
          `,
        }}
      >
        <iframe
          src="https://hungry-hungry-moo-deng.vercel.app/"
          className="w-full h-full border-0"
          title="Hungry Hungry Moo Deng Game"
          allowFullScreen
        />
      </div>

      <p className="text-xs mt-3 font-bold tracking-wider text-white drop-shadow-lg">✨ UNMUTE FOR MAX CUTENESS ✨</p>
    </main>
  )
}
