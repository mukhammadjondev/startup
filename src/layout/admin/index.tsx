import AdminProvider from "@/provider/admin.provider"
import { Box, Container } from "@chakra-ui/react"
import { FC, FunctionComponent } from "react"
import { LayoutProps } from "../layout.props"
import AdminSidebar from "../sidebar/admin-sidebar"
import { AdminProps } from "./admin.props"

const Layout: FC<LayoutProps> = ({children}): JSX.Element => {
  return <>
    <AdminSidebar />
    <Box pl={{base: 0, lg: '370px'}} minH='100vh' transition='all .4s ease'>
      <Container maxW='container.lg'>{children}</Container>
    </Box>
  </>
}

export default Layout

export const withAdminLayout = <T extends Record<string, unknown> & AdminProps>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <AdminProvider courses={props.courses} instructors={props.instructors} users={props.users}>
          <Component {...props} />
        </AdminProvider>
      </Layout>
    )
  }
}