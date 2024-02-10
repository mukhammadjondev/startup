import $axios from "@/api/axios"
import { getPaymentUrl } from "@/config/api.config"

export const PaymentService = {
  async paymentBooks(price: number) {
    try {
      const {data} = await $axios.post(`${getPaymentUrl('books')}`, {price})
      return data
    } catch (error) {
      console.log(error)
    }
  },
}