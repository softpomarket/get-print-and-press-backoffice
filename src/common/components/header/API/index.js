import { server } from "../../../../constants"
import { httpClient } from "../../../../utils/HttpClient"

export const getUserByUidFetch = async (uid) => {
    try {
        const result = await httpClient.post(server.GET_USER_BY_UID_URL, { uid })
        if (result.data.isSuccess) {
            return result.data.formData
        } else {
            return null
        }
    } catch (err) { // status 404
        return true
    }
}
