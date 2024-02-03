import AppProvider from "@/provider/app.provider"
import { Box, Container } from "@chakra-ui/react"
import { FunctionComponent, useState } from "react"
import Footer from "./footer/footer"
import Header from "./header/header"
import { AppProviderProps, LayoutProps } from "./layout.props"
import Sidebar from "./sidebar/sidebar"

const Layout = ({children}: LayoutProps): JSX.Element => {
  const [toggle, setToggle] = useState<boolean>(false)

  const onToggle = () => setToggle(prev => !prev)

  return (
    <Box maxW='full' overflow='hidden'>
      <Header onToggle={onToggle} />
      <Sidebar toggle={toggle} />
      <Box mt='11vh' minH='90vh' pl={{base: 0, lg: '320px'}} transition='all .4s ease'>
        <Container maxW='container.lg'>{children}</Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout

export const withLayout = <T extends Record<string, unknown> & AppProviderProps>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <AppProvider courses={props.courses} course={props.course} instructors={props.instructors}>
          <Component {...props} />
        </AppProvider>
      </Layout>
    )
  }
}