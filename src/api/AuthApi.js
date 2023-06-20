import axiosClient from "./axiosClient";

const AuthApi = {
    async getProfile() {
        try {
            let token = localStorage.getItem('accessToken');
            if (!token) return [];
            // const url = `auth/profile`;
            const url = `auth/info`;
            const response = await axiosClient.post(url)
            if (response.status === 200) {
                return response.data;
            }
        } catch (e) {
            console.log('--------------- getProfile@Error ', e);
            if (e.response && e.response.status && e.response.status === 401) {
                // window.location.href = '/auth/login';
            }
            return {
                status: 501,
                data: []
            }
        }
    },

    async login(data) {
        try {
            const url = `auth/login`;
            const response = await axiosClient.post(url, data)
            if (response.status === 200 || response.status === 201) {
                return response.data;
            }
        } catch (e) {
            console.log('--------------- login@E ', e);
        }

        return {
            status: 501,
            message: 'Đăng nhập thất bại'
        };
    },
    async forgotPassword(data) {
        try {
            const url = `auth/forgot-password`;
            const response = await axiosClient.post(url, data)
            console.log('--------------- forgotPassword@E ', response);
            if (response.status === 200 || response.status === 201) {
                return response.data;
            }
            if (response.status == 'fail') {
                return {
                    status: 501,
                    message: response.message
                };
            }
        } catch (e) {

            console.log('--------------- login@E ', e);
            if (e.response.data.status === 'fail') {
                return {
                    status: 501,
                    message: e.response.data.message
                };
            }
        }

        return {
            status: 501,
            message: 'Có lỗi xẩy ra, xin vui lòng thử lại'
        };
    },

    async resetPassword(data) {
        try {
            const url = `auth/reset-password`;
            const response = await axiosClient.post(url, data)
            console.log('--------------- resetPassword@E ', response);
            if (response.status === 200 || response.status === 201) {
                return response.data;
            }
            if (response.status == 'fail') {
                return {
                    status: 501,
                    message: response.message
                };
            }
        } catch (e) {

            console.log('--------------- login@E ', e);
            if (e.response.data.status === 'fail') {
                return {
                    status: 501,
                    message: e.response.data.message
                };
            }
        }

        return {
            status: 501,
            message: 'Có lỗi xẩy ra, xin vui lòng thử lại'
        };
    },

    async loginSocial(data) {
        try {
            const url = `auth/social/google`;
            const response = await axiosClient.post(url, data)
            if (response.status === 200 || response.status === 201) {
                return response.data;
            }
        } catch (e) {
            console.log('--------------- login@E ', e);
        }

        return {
            status: 501,
            message: 'Đăng nhập thất bại'
        };
    },

    async register(data) {
        try {
            const url = `auth/register`;
            const response = await axiosClient.post(url, data)

            console.log('------------ response: ', response);
            if (response.status === 200) {
                return response.data;
            }

            if (response.status === 501) {
                return response.data;
            }
        } catch (e) {
            console.log('--------------- E ', e);
        }
    },

    async updateEmail(data) {
        try {
            const url = `user/update-email`;
            const response = await axiosClient.put(url, data)

            if (response.data.status === 200) {
                return response.data;
            }
        } catch (e) {
            console.log('--------------- E ', e);
        }
    },

    async updatePassword(data) {
        try {
            const url = `user/update-password`;
            const response = await axiosClient.put(url, data)
            console.log('-------- v: response: ', response);
            if (response.data.status === 'success') {
                return response.data;
            }

            if (response.status == 'fail') {
                return {
                    status: 501,
                    message: response.message
                };
            }

        } catch (e) {
            console.log('--------------- E ', e);
            if (e.response.data.status === 'fail') {
                return {
                    status: 501,
                    message: e.response.data?.data
                };
            }
        }
    },

    async updatePhone(data) {
        try {
            const url = `user/update-phone`;
            const response = await axiosClient.put(url, data)

            if (response.data.status === 200) {
                return response.data;
            }
        } catch (e) {
            console.log('--------------- E ', e);
        }
    },

    async updateInfo(data) {
        try {
            const url = `user/update-info`;
            const response = await axiosClient.put(url, data)

            if (response.status === 200) {
                return response.data;
            }
        } catch (e) {
            console.log('--------------- E ', e);
        }
    }
};

export default AuthApi;
