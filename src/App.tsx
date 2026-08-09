import { MotionConfig } from "motion/react"
import { Agitation } from "@/components/sections/Agitation"
import { EmailCapture } from "@/components/sections/EmailCapture"
import { FAQ } from "@/components/sections/FAQ"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { Footer } from "@/components/sections/Footer"
import { Guarantee } from "@/components/sections/Guarantee"
import { Hero } from "@/components/sections/Hero"
import { Offer } from "@/components/sections/Offer"
import { PainRecognition } from "@/components/sections/PainRecognition"
import { SocialProof } from "@/components/sections/SocialProof"
import { Solution } from "@/components/sections/Solution"

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
        <PainRecognition />
        <Agitation />
        <Solution />
        <Offer />
        <EmailCapture />
        <SocialProof />
        <Guarantee />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </MotionConfig>
  )
}
