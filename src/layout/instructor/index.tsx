import InstructorProvider from "@/provider/instructor.provider"
import { Box, Container } from "@chakra-ui/react"
import { FunctionComponent, useState } from "react"
import Footer from "../footer/footer"
import Header from "../header/header"
import { LayoutProps } from "../layout.props"
import InstructorSidebar from "../sidebar/instructor-sidebar"
import { InstructorProviderProps } from "./instructor.props"

const Layout = ({children}: LayoutProps): JSX.Element => {
  const [toggle, setToggle] = useState<boolean>(false)

  const onToggle = () => setToggle(prev => !prev)

  return (
    <Box maxW='full' overflow='hidden'>
      <Header onToggle={onToggle} />
      <InstructorSidebar toggle={toggle} />
      <Box mt='11vh' minH='90vh' pl={{base: 0, lg: '320px'}} transition='all .4s ease'>
        <Container maxW='container.lg'>{children}</Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout

export const withInstructorLayout = <T extends Record<string, unknown> & InstructorProviderProps>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <InstructorProvider courses={props.courses} course={props.course}>
          <Component {...props} />
        </InstructorProvider>
      </Layout>
    )
  }
}