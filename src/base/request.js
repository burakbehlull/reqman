import axios from 'axios'

class REQUEST {
	constructor(baseURL){
		this.API = axios.create({
			baseURL: baseURL
		})
	}
	send(method, url, { params = null, data = null, config = {} } = {}){
		const API = this.API
		
		const apiRequest = {
			GET: async () => {
				try {
					const response = await API.get(url, { ...config, params });
					return response.data;
				} catch (error) {
					console.error('GET Error:', error);
					return null
				}
			},
			POST: async () => {
				try {
					const response = await API.post(url, data, config);
					return response.data;
				} catch (error) {
					console.error('POST Error:', error);
					return null;
				}
			},
			PUT: async () => {
				try {
					const response = await API.put(url, data, config);
					return response.data;
				} catch (error) {
					console.error('PUT Error:', error);
					return null;
				}
			},
			PATCH: async () => {
				try {
					const response = await API.patch(url, data, config);
					return response.data;
				} catch (error) {
					console.error('PATCH Error:', error);
					return null
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
					return null
				}
			}
		};
		return apiRequest[method]()
	}
}

export default REQUEST