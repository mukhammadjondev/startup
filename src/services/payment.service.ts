import $axios from '@/api/axios';
import { API_URL, getPaymentUrl } from '@/config/api.config';
import axios from 'axios';

export const PaymentService = {
  async paymentBooks(price: number) {
    try {
      const { data } = await $axios.post(`${getPaymentUrl('books')}`, {
        price,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  async productList() {
    try {
      const { data } = await axios.get(
        `${API_URL}${getPaymentUrl('list-products')}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  async getInstructorBalance(token?: string) {
    const response = await axios.get(
      `${API_URL}${getPaymentUrl('instructor-balance')}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },

  async instructorAccountLink() {
    const response = await $axios.post(
      `${getPaymentUrl('instructor-connect-login')}`
    );

    return response.data;
  },
};
