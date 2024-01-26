import { howItWorks } from "@/config/constants"
import { Container, Flex, Icon, SimpleGrid, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import SectionTitle from "../section-title/section-title"
import { useTranslation } from "react-i18next"

const HowItWorks = () => {
  const backgroundColor = useColorModeValue('gray.200', 'gray.700')
  const {t} = useTranslation()

  return (
    <>
      <SectionTitle textAlign={'center'} title={t('how_it_works_title', {ns: 'home'})} subtitle={t('how_it_works_description', {ns: 'home'})} />

      <SimpleGrid mt={10} spacing={10} columns={5} alignItems='center'>
        {howItWorks.map((item, idx) => {
          const odd = idx % 2

          return (
            <Container key={idx}>
              {!odd ? (
                <Stack justify='center' align='center'>
                  <Flex w={100} h={100} justify='center' align='center' backgroundColor={backgroundColor} borderRadius='full'>
                    <Icon as={item.icon} w={50} h={50} />
                  </Flex>
                  <Text textAlign='center'>{t(item.title, {ns: 'home'})}</Text>
                </Stack>
              ) : (
                <Stack justify='center'>
                  <Icon as={item.icon} w='142px' h='21px' />
                </Stack>
              )}
            </Container>
          )
        })}
      </SimpleGrid>
    </>
  )
}

export default HowItWorks