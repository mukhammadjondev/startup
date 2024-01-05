import { navigation } from "@/config/constants"
import { Box, Button, Container, HStack, Icon, Text, useColorModeValue } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { SidebarProps } from "./sidebar.props"
import { useTranslation } from "react-i18next"

const Sidebar = ({toggle}: SidebarProps) => {
  const router = useRouter()
  const {t} = useTranslation()

  return (
    <Box
      zIndex={1001}
      w={{base: 'full', lg: '300px'}}
      h='90vh'
      bg={useColorModeValue('gray.50', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      color={useColorModeValue('gray.700', 'gray.200')}
      pos='fixed'
      left={{base: toggle ? 0 : '-100%', lg: 0}}
      top='10vh'
      overflowY='scroll'
      transition={'all .4s ease'}
      css={{
      '&::-webkit-scrollbar': {width: '1px'},
      '&::-webkit-scrollbar-track': {width: '1px'},
      '&::-webkit-scrollbar-thumb': {background: 'transparent'},
    }}>
      <Container maxW='container.xl'>
        {navigation.map(item => (
          <Box key={item.title} mt={5}>
            <Text>{t(item.title, {ns: 'layout'})}</Text>
            {item.links.map(nav => {
              const active = router.asPath === nav.route

              return (
                <Link href={`${nav.route}`} key={nav.label}>
                  <Button colorScheme='facebook' variant={active ? 'solid' : 'ghost'} w='full' justifyContent='flex-start' h={14} mt={2}>
                    <HStack gap={4}>
                      <Icon as={nav.icon} />
                      <Text>{t(nav.label, {ns: 'layout'})}</Text>
                    </HStack>
                  </Button>
                </Link>
              )
            })}
          </Box>
        ))}
      </Container>
    </Box>
  )
}

export default Sidebar