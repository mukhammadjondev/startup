import { sponsorshipCarousel } from "@/config/carousel"
import { trustedCompeny } from "@/config/constants"
import { Icon } from "@chakra-ui/react"
import Carousel from "react-multi-carousel"
import SectionTitle from "../section-title/section-title"

const Sponsorship = () => {
  return (
    <>
      <SectionTitle title='' subtitle="Trusted by the world's best" textAlign='center' />

      <Carousel responsive={sponsorshipCarousel} arrows={false} showDots={false} autoPlay={true} autoPlaySpeed={1000} infinite>
        {trustedCompeny.map((item, idx) => (
          <Icon key={idx} as={item} fontSize={60} />
        ))}
      </Carousel>
    </>
  )
}

export default Sponsorship