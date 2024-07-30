import { emailSubject, emailSupport } from "../../constants"
// import { getAccountVerifyTokenAllFetch, insertAccountVerifyTokenFetch, updateAccountVerifyTokenByIdFetch } from "../../modules/account/API"
// import { getCourseOwnerFetch } from "../../modules/course/API"
// import { insertOpenCourseTokenByIdFetch, insertTokenByIdFetch, updateOpenCourseTokenByIdFetch, updateTokenByUsernameFetch } from "../../modules/erp/API"
// import { detectAccountVerifyRepeatToken, detectRepeatOpenCourseToken, detectRepeatToken } from "./DetectManager"
// import { verifyIdentityOTP } from "./EmailMamager"

const formatCodeUnit = (code) => {
    let id = String(code)
    let idLength = id.length
    let tmpId = ""
    for (let i = 0; i < (6 - idLength); i++) {
        if (i === (6 - idLength) - 1) {
            tmpId += id
        } else {
            tmpId += "0"
        }
    }
    
    return tmpId
}

const adminLoginToken = async (username) => {
    // await updateTokenByUsernameFetch(username)

    // const token = await detectRepeatToken()

    // await insertTokenByIdFetch({
    //     username,
    //     token
    // })

    // return token
}

const genToken = () => {
    let tempToken = ""
    for (let i = 0; i < 5; i++) {
        let length = 4;
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let charactersLength = characters.length
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        tempToken = tempToken + (i !== 0 ? "-" : "") + result
    }
    return tempToken
}

const openCourseVerify = async (uid, formROCId, inspectId) => { 
    // await updateOpenCourseTokenByIdFetch(formROCId)

    // const token = await detectRepeatOpenCourseToken(uid)

    // await insertOpenCourseTokenByIdFetch({
    //     token,          
    //     uid,            // uid is teacherId
    //     formROCId,      // formRegOpenCourseId
    //     inspectId       // inspectionFormRegOpenCourseId
    // })
    // return token
}

const verifyIdentityToken = async (uid, emailTarget) => {
    
}

const genNumber0To9 = (unit) => {
    let tempToken = "";
    for (let i = 0; i < unit; i++) {
        let characters = '0123456789'
        let charactersLength = characters.length
        tempToken += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return tempToken
}

const expiredToken = async (uid, token) => {
    // [API] update token isActive = false/0
    // let request = {
    //     uid, 
    //     token
    // }
    // await updateAccountVerifyTokenByIdFetch(request)
}

export {
    formatCodeUnit,
    genToken,
    genNumber0To9,
    adminLoginToken,
    openCourseVerify,
    verifyIdentityToken,
    expiredToken
}
