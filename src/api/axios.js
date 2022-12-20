import axios from 'axios';

const axi = axios.create({
    baseURL: `http://127.0.0.1:3003`
});

const categoryAPI = {
    getAll: () => axi.get(`/category`),
    create: (formData) => axi.post(`/category`,
        formData,
        {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        }),
    update: (id, formData) => axi.put(`/category/${id}`,
        formData,
        {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        }),
    delete: (id) => axi.delete(`/category/${id}`),

}

const productAPI = {
    getAll: () => axi.get(`/product`),
    create: (formData) => axi.post(`/product`,
        formData,
        {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        }),
    update: (id, formData) => axi.put(`/product/${id}`,
        formData,
        {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        }),
}

const trademarkAPI = {
    getAll: () => axi.get(`/trademark`),
}

const userAPI = {
    login: (formData) => axi.post(`/user/login`,
        formData,
        {
            headers: {
                'Content-Type': `application/json`
            }
        })
}

const importOrderAPI = {
    getAll: () => axi.get(`/importOrder`),
    create: (formData,token) => axi.post(`/importOrder`,
        formData,
        {
            headers: {
                'Content-Type': `application/json`,
                'x-access-token': token
            }
        }),
    update: (id, formData) => axi.put(`/importOrder/${id}`,
        formData,
        {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        }),
    delete: (id) => axi.delete(`/importOrder/${id}`),
}


export { categoryAPI, productAPI, trademarkAPI, userAPI, importOrderAPI };