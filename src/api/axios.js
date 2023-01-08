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
    getAll: () => axi.get(`/product/admin`),
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
    delete: (id) => axi.delete(`/product/${id}`),
}


const trademarkAPI = {
    getAll: () => axi.get(`/trademark`),
    create: (formData) => axi.post(`/trademark`,
        formData,
        {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        }),
    update: (id, formData) => axi.put(`/trademark/${id}`,
        formData,
        {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        }),
    delete: (id) => axi.delete(`/trademark/${id}`),
}

const userAPI = {
    login: (formData) => axi.post(`/user/login`,
        formData,
        {
            headers: {
                'Content-Type': `application/json`
            }
        }),
    getAll: () => axi.get("/user/all")
} 

const importOrderAPI = {
    getAll: () => axi.get(`/importOrder`),
    create: (formData, token) => axi.post(`/importOrder`,
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

const exportOrderAPI = {
    getAll: () => axi.get(`/exportOrder`),
    update: (id, data) => axi.put(`/exportOrder/${id}`,
        data,
        {
            headers: {
                'Content-Type': `application/json`
            }
        }),
}

const statisticAPI = {
    getRevenue: () => axi.get(`/statistic/revenue`),
    getTopSoldProducts: () => axi.get(`/statistic/topSoldProduct`)
}

const notificationAPI = {
    getAll: () => axi.get(`/notification/admin`),
    updateIsRead: (id) => axi.put(`/notification/${id}`)
}

const consignmentAPI = {
    getAll: () => axi.get(`/consignment`),
    updateStatus: ({ id, status }) => axi.put(`/consignment/${id}`, { status }, {
        headers: {
            'Content-Type': `application/json`,
        },
    })
}

const roleAPI = {
    getAll: () => axi.get(`/role`),
}

const permissionAPI = {
    getAll: () => axi.get(`/permission`),
}

const protectedAPI = {
    checkRoute: (token) => axi.get(`/protected/route/admin`, {
        headers: {
            "x-access-token": token
        }
    }),
    checkAction: (token, qPermissions) => axi.get(`/protected/action?${qPermissions}`, {
        headers: {
            "x-access-token": token
        }
    })
}
export { roleAPI, permissionAPI, consignmentAPI, categoryAPI, productAPI, trademarkAPI, userAPI, importOrderAPI, exportOrderAPI, statisticAPI, notificationAPI, protectedAPI };