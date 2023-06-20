import axiosClient from './axiosClient';

const productService = {
	async getListsProducts(params) {
		try {
			const newParams = { ...params }
			const url = `product`;
			console.log('------ newParams: ', newParams);
			const response = await axiosClient.get(url, {
				params: {...newParams},
			})

			if (response.status === 200) {
				return response.data;
			}
		} catch (e) {
			console.log('--------------- getListsProducts@Error ', e);
		}

		return  {
			status: 501
		}
	},

	async findById(id) {
		try {
			const url = `product/show/${id}`;
			const response = await axiosClient.get(url)

			if (response.status === 200) {
				return response.data;
			}
		} catch (e) {
			console.log('--------------- findById@Error ', e);
		}

		return  {
			status: 501
		}
	},

    async findBySlug(slug) {
		try {
			const url = `product/show-slug/${slug}`;
			const response = await axiosClient.get(url)

			if (response.status === 200) {
				return response.data;
			}
		} catch (e) {
			console.log('--------------- findById@findBySlug ', e);
		}

		return  {
			status: 501
		}
	},
}


export default productService;
