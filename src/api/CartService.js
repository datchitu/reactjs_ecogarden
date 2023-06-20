import axiosClient from './axiosClient';

const CartApi = {
    async getOrders(page, page_size, user_id) {
        try {
            const url = `order?${page && `page=${page}`}${page_size && `&page_size=${page_size}&user_id=${user_id}`}`;
            const response = await axiosClient.get(url)

            if (response.status === 200) {
                return response.data;
            }
        } catch (e) {
            console.log('--------------- getOrderList@Error ', e);
        }

        return  {
            status: 501
        }
    },
    async createOrder(data) {
        try {
            const url = `order/add`;
            const response = await axiosClient.post(url, data);
            console.log('------------- createOrder@response: ', response);
            if (response.status === 200 || response.status === 201) {
                return response.data;
            }
        } catch (e) {
            console.log('--------------- createOrder@Error ', e);
            return {
                status: 'fail',
                message: e.response?.data?.data?.message
            }
        }

        return {
            status: 501
        }
    },
    async deleteTransaction(id) {
        try {
            const url = `transaction/delete/${id}`;
            const response = await axiosClient.delete(url);
            console.log('------------- deleteTransaction@response: ', response);
            if (response.status === 200 || response.status === 201) {
                return response.data;
            }
        } catch (e) {
            console.log('--------------- deleteTransaction@Error ', e);
        }

        return {
            status: 501
        }
    },
    async showTransaction(id) {
        try {
            const url = `transaction/show/${id}`;
            const response = await axiosClient.get(url);
            console.log('------------- showTransaction@response: ', response);
            if (response.status === 200 || response.status === 201) {
                return response.data;
            }
        } catch (e) {
            console.log('---------------showTransaction@Error ', e);
        }
    },
    async showConfig() {
        try {
            return [];
            const url = `order/config`;
            const response = await axiosClient.get(url);
            console.log('------------- showConfig@response: ', response);
            if (response.status === 200 || response.status === 201) {
                return response.data;
            }
        } catch (e) {
            console.log('---------------showTransaction@Error ', e);
        }
    },
    async updateOrderPaid(id) {
        try {
            const url = `order/update-paid/${id}`;
            const response = await axiosClient.put(url);
            console.log('------------- updateOrderPaid@response: ', response);
            if (response.status === 200 || response.status === 201) {
                return response.data;
            }
        } catch (e) {
            console.log('---------------updateOrderPaid@Error ', e);
        }
    }
}

export default CartApi;
