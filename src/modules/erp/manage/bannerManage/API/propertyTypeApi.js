import { server } from "../../../../../constants"
import { httpClient } from "../../../../../utils/HttpClient"

// Property Type
const insertPropertyTypesFetch = async (param, body, accessToken) => { // Done
    try {
        const result = await httpClient.post(server.INSERT_PROPERTY_TYPES_URL, body, {
            headers: {
                'x-access-token': accessToken
            }
        })
        if (result.data.isSuccess) {
            return result.data.formData
        } else {
            return null
        }
    } catch (err) { // status 404
        return null
    }
}

const getPropertyTypesFetch = async (param, body, accessToken) => { // Done
    try {
        const result = await httpClient.get(server.GET_PROPERTY_TYPES_URL + `?name=${param.name}&isActive=${param.isActive}&page=${param.page}&size=${param.size}`, {
            headers: {
                'x-access-token': accessToken
            }
        })
        if (result.data.isSuccess) {
            return result.data.formData
        } else {
            return null
        }
    } catch (err) { // status 404
        return null
    }
}

const getPropertyTypesByIdFetch = async (param, body, accessToken) => {
    try {
        const result = await httpClient.get(server.GET_PROPERTY_TYPES_BY_ID_URL + `/${param.id}`, {
            headers: {
                'x-access-token': accessToken
            }
        })
        if (result.data.isSuccess) {
            return result.data.formData
        } else {
            return null
        }
    } catch (err) { // status 404
        return null
    }
}

const updatePropertyTypesFetch = async (param, body, accessToken) => {
    try {
        const result = await httpClient.put(server.UPDATE_PROPERTY_TYPES_URL + `/${param.id}`, body, {
            headers: {
                'x-access-token': accessToken
            }
        })
        if (result.data.isSuccess) {
            return result.data.formData
        } else {
            return null
        }
    } catch (err) { // status 404
        return null
    }
}

const deletePropertyTypesByIdFetch = async (param, body, accessToken) => {
    try {
        const result = await httpClient.delete(server.DELETE_PROPERTY_TYPES_BY_ID_URL + `/${param.id}`, {
            headers: {
                'x-access-token': accessToken
            }
        })
        return result.data
    } catch (err) { // status 404
        return null
    }
}

export {
    // get
    getPropertyTypesFetch,
    getPropertyTypesByIdFetch,

    // insert
    insertPropertyTypesFetch,

    // update
    updatePropertyTypesFetch,

    // delete
    deletePropertyTypesByIdFetch
}
