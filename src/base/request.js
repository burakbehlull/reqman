import axios from 'axios';

class REQUEST {
	constructor(baseURL = '') {
		this.API = axios.create({
			baseURL: baseURL
		});
	}

	send(method, url, { params = null, data = null, config = {} } = {}) {
		const API = this.API;

		if (!(data instanceof FormData)) {
			config.headers = {
				'Content-Type': 'application/json',
				...(config.headers || {})
			};
		}

		const apiRequest = {
			GET: async () => {
				try {
					const response = await API.get(url, { ...config, params });
					return response.data;
				} catch (error) {
					console.error('GET Error:', error);
					return error.response?.data || error.message;
				}
			},
			POST: async () => {
				try {
					const response = await API.post(url, data, config);
					return response.data;
				} catch (error) {
					console.error('POST Error:', error);
					return error.response?.data || error.message;
				}
			},
			PUT: async () => {
				try {
					const response = await API.put(url, data, config);
					return response.data;
				} catch (error) {
					console.error('PUT Error:', error);
					return error.response?.data || error.message;
				}
			},
			PATCH: async () => {
				try {
					const response = await API.patch(url, data, config);
					return response.data;
				} catch (error) {
					console.error('PATCH Error:', error);
					return error.response?.data || error.message;
				}
			},
			DELETE: async () => {
				try {
					const response = await API.delete(url, {
						data,
						...config
					});
					return response.data;
				} catch (error) {
					console.error('DELETE Error:', error);
					return error.response?.data || error.message;
				}
			}
		};

		return apiRequest[method.toUpperCase()]?.();
	}
}

export default REQUEST;
