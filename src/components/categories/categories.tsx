import { categoryCarousel } from "@/config/carousel"
import { categories } from "@/config/constants"
import { Box, Icon, Text, useColorModeValue } from "@chakra-ui/react"
import Carousel from "react-multi-carousel"
import SectionTitle from "../section-title/section-title"

const Categories = () => {
  const backgrounColor = useColorModeValue('gray.1000', 'gray.900')
  const fill = useColorModeValue('#020288', 'gray.600')

  return (
    <>
      <SectionTitle title='Top categories' subtitle='Lear our courses with high rating' />
      <Carousel responsive={categoryCarousel} showDots={false} arrows={false} autoPlay={true} autoPlaySpeed={2000} infinite>
        {categories.map(category => (
          <Box key={category.id} minH='200px' mx={2} backgroundColor={backgrounColor} textAlign='center' p={5} borderRadius='lg' cursor='pointer'>
            <Icon as={category.icon} w={20} h={20} fill={fill} />
            <Text mt={2} fontSize='lg'>{category.name}</Text>
          </Box>
        ))}
      </Carousel>
    </>
  )
}

export default Categories