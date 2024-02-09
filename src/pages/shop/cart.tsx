import { withLayout } from '@/layout/layout'
import { CartPageComponent } from '@/page-component'
import { NextPage } from 'next'

const CartPage: NextPage = () => {
  return <CartPageComponent />
}

export default withLayout(CartPage)