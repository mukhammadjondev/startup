import { Categories, Hero, HowItWorks, Instructors, Newsletter, PopularCourses, Sponsorship, Testimonials } from "@/components"
import { Stack } from "@chakra-ui/react"

const HomePageComponent = () => {
  return (
    <Stack spacing={10}>
      <Hero />
      <Categories />
      <PopularCourses />
      <HowItWorks />
      <Instructors />
      <Testimonials />
      <Newsletter />
      <Sponsorship />
    </Stack>
  )
}

export default HomePageComponent