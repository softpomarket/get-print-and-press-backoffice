/* eslint-disable react-hooks/exhaustive-deps */

import { getDetectEmailDuplicateFetch, getDetectPhoneDuplicateFetch, getDetectUsernameDuplicateFetch } from "../../modules/register/API"

const detectConvertLocation = (value) => {
    if (value === "null" || value === "undefined" || value === "") {
        return null
    } else if (value === "true") {
        return true
    } else if (value === "false") {
        return false
    } else {
        return Number(value)
    }
}

const detectFormatPassword = (rules, value) => {
    if (value === "" || value === undefined) {
        return Promise.reject('กรุณากรอกรหัสผ่าน')
    } else {
        if (value.length >= 8) {
            // console.log("ตัวเลข : ", value.match(/[0-9]/))
            // console.log("ตัวพิมพ์ใหญ่ : ", value.match(/[A-Z]/))
            // console.log("ตัวพิมพ์เล็ก : ", value.match(/[a-z]/))

            if (value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/)) {
                return Promise.resolve();
            } else if (!value.match(/[0-9]/)) {
                return Promise.reject('รหัสผ่านต้องมีตัวเลข')
            } else if (!value.match(/[A-Z]/)) {
                return Promise.reject('รหัสผ่านต้องมีภาษาอังกฤษ ตัวพิมพ์ใหญ่')
            } else if (!value.match(/[a-z]/)) {
                return Promise.reject('รหัสผ่านต้องมีภาษาอังกฤษ ตัวพิมพ์เล็ก')
            }
        } else {
            return Promise.reject('ความยาวรหัสผ่านขั้นต่ำ 8 ตัวอักษร')
        }
    }
}

const detectIsNumber = (value) => {
    if (value.search(/[0-9]/) === -1) {
        return false
    } else {
        return true
    }
}

const detectIsSpecialCharacter = (value) => {
    if (value.search(/[!@#$%^&*()_+\-={};':"|,.<>/?]/) === -1) {
        return false
    } else {
        return true
    }
}

const detectFirstName = async (rule, value) => {
    if (value === "" || value === undefined || value === null) { // ถ้าไม่มีการกรอกข้อมูล
        // return Promise.reject(new Error('กรุณากรอกชื่อจริง'))
        return Promise.resolve()
    } else {
        if (value.search(" ") !== -1) {
            return Promise.reject(new Error('ชื่อจริงต้องไม่มีเว้นวรรค'))
        } else {
            if (detectIsNumber(value)) {
                return Promise.reject(new Error('ชื่อจริงห้ามมีตัวเลข'))
            } else {
                if (detectIsSpecialCharacter(value)) {
                    return Promise.reject(new Error('ชื่อจริงห้ามมีอักษรพิเศษ'))
                } else {
                    return Promise.resolve()
                }
            }
        }
    }
}

const detectLastName = async (rule, value) => {
    if (value === "" || value === undefined || value === null) { // ถ้าไม่มีการกรอกข้อมูล
        // return Promise.reject(new Error('กรุณากรอกนามสกุล'))
        return Promise.resolve()
    } else {
        if (value.search(" ") !== -1) {
            return Promise.reject(new Error('นามสกุลต้องไม่มีเว้นวรรค'))
        } else {
            if (detectIsNumber(value)) {
                return Promise.reject(new Error('นามสกุลห้ามมีตัวเลข'))
            } else {
                if (detectIsSpecialCharacter(value)) {
                    return Promise.reject(new Error('นามสกุลห้ามมีอักขระพิเศษ'))
                } else {
                    return Promise.resolve()
                }
            }
        }
    }
}

const detectBankAccountName = async (rule, value) => {
    if (value === "") {
        return Promise.reject(new Error('กรุณากรอกชื่อบัญชีธนาคาร'))
    } else {
        if (detectIsNumber(value)) {
            return Promise.reject(new Error('ชื่อบัญชีธนาคารห้ามมีตัวเลข'))
        } else {
            if (detectIsSpecialCharacter(value)) {
                return Promise.reject(new Error('ชื่อบัญชีธนาคารห้ามมีอักขระพิเศษ'))
            } else {
                return Promise.resolve()
            }
        }
    }
}

const detectEmail = async (rule, value) => {
    let formatEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (value === "" || value === undefined) { // ถ้าไม่มีการกรอกข้อมูล
        return Promise.reject(new Error('กรุณากรอกอีเมล์'))
    } else {
        if (value.search(" ") !== -1) {
            return Promise.reject(new Error('อีเมลต้องไม่มีเว้นวรรค'))
        } else {
            let result = await getDetectEmailDuplicateFetch(value)
            // console.log("getDetectEmailDuplicateFetch : ", result)
            if (result.length === 0) { // ถ้าไม่มีข้อมูล
                if (formatEmail.test(value)) {
                    return Promise.resolve()
                } else {
                    return Promise.reject(new Error('รูปแบบอีเมล์ไม่ถูกต้อง'))
                }
            } else {
                return Promise.reject(new Error('อีเมลนี้ถูกใช้งานเเล้ว'))
            }
        }
    }
}

const detectPhone = async (rule, value) => {
    const reg = /^-?\d*(\.\d*)?$/
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === undefined || value === null) {
        if (value === "" || value === undefined || value === null) {
            // return Promise.reject(new Error('กรุณากรอกเบอร์โทร'))
            return Promise.resolve()
        } else {
            let result = await getDetectPhoneDuplicateFetch(value)
            let uid = null // firebase?.auth()?.currentUser?.uid
            // console.log("getDetectPhoneDuplicateFetch : ", result)
            if (result.length === 0 || uid === result[0]?.uid) { // ถ้าไม่มีข้อมูล
                if (String(value)[0] === '0') {
                    if (String(value).length === 10) {
                        return Promise.resolve()
                    } else {
                        return Promise.reject(new Error('เบอร์โทรต้องมีความยาว 10 ตัวอักษร'))
                    }
                } else {
                    return Promise.reject(new Error('ตัวเลขต้องขึ้นต้นด้วย 0'))
                }
            } else {
                return Promise.reject(new Error('เบอรโทรนี้ถูกใช้สมัครสมาชิกเเล้ว'))
            }
        }

    } else {
        return Promise.reject(new Error('กรุณากรอกเบอร์โทรให้ถูกต้อง'))
    }
}

const detectUsername = async (rule, value) => {
    if (value === "" || value === undefined) { // ถ้าไม่มีการกรอกข้อมูล
        return Promise.reject(new Error('กรุณากรอกชื่อผู้ใช้งาน'))
    } else {
        if (value.search(" ") !== -1) {
            return Promise.reject(new Error('ข้อความต้องไม่มีเว้นวรรค'))
        } else {
            let result = await getDetectUsernameDuplicateFetch(value)
            if (result?.length === 0) { // ถ้าไม่มีข้อมูล
                if (value?.length >= 6) { // ต้องมีอย่างน้อย 6 ตัว
                    return Promise.resolve()
                } else {
                    return Promise.reject(new Error('ชื่อผู้ใช้งานต้องมีความยาว 6 ตัวอักษรขึ้นไป'))
                }
            } else {
                return Promise.reject(new Error('ชื่อนี้ถูกใช้งานเเล้ว'))
            }
        }
    }
}

const detectSignIn = async () => {
    let authorized = false
    // await firebase.auth().onAuthStateChanged((user) => {
    //     if (user != null) {
    //         authorized = true
    //     }
    // })

    return authorized
}

const detectVowelByText = (text) => {
    try {
        // let concatTxt = "";
        // // console.log("พบ อักษรพิเศษ : ", text?.search("ั"), text);
        // // if (text?.search("ั") !== -1) {
        // // console.log("พบ ไม้หันอากาศ หรือ ไม้ผัด : ", text.search("็"));
        // for (let i = 0; i < text.length; i++) {
        //     if (
        //         ((text[i] === "ั" && detectAllVowel(text[i + 1]) && detectAllVowel(text[i + 2]))
        //             || (text[i] === "ั" && detectAllVowel(text[i + 1]) && i === (text.length - 1))
        //         )  // ไม้หันอากาศ หรือ ไม้ผัด
        //     ) {
        //         i++;
        //     } else if (text[i] === "ั" && detectAllVowel(text[i + 1])) {
        //         i++;
        //         concatTxt += text[i];
        //     } else {
        //         concatTxt += text[i];
        //     }
        // }
        // // } else {
        // //     concatTxt = text;
        // // }

        // let concatTxt2 = "";
        // if (concatTxt.search("็") !== -1) {
        //     // console.log("พบ ไม้ไต่คู้ : ", concatTxt.search("็"));
        //     for (let i = 0; i < concatTxt.length; i++) {
        //         if ((concatTxt[i] === "็" && detectAllVowel(concatTxt[i + 1]) && detectAllVowel(concatTxt[i + 2]))
        //             || (concatTxt[i] === "็" && detectAllVowel(concatTxt[i + 1]) && i === (concatTxt.length - 1))
        //         ) {  // ไม้ไต่คู้
        //             i++;
        //         } else if (concatTxt[i] === "็" && detectAllVowel(concatTxt[i + 1])) {
        //             i++;
        //             concatTxt2 += concatTxt[i];
        //         } else {
        //             concatTxt2 += concatTxt[i];
        //         }
        //     }
        // } else {
        //     concatTxt2 = concatTxt;
        // }

        // let concatTxt3 = "";
        // if (concatTxt2.search("่") !== -1) {
        //     // console.log("พบ ไม้เอก : ", concatTxt2.search("่"));
        //     for (let i = 0; i < concatTxt2.length; i++) {
        //         if (
        //             ((concatTxt2[i] === "่" && detectAllVowel(concatTxt2[i + 1]) && detectAllVowel(concatTxt2[i + 2]))
        //                 || (concatTxt2[i] === "่" && detectAllVowel(concatTxt2[i + 1]) && i === (concatTxt2.length - 1))
        //             )  // ไม้เอก
        //         ) {
        //             i++;
        //         } else if (concatTxt2[i] === "่" && detectAllVowel(concatTxt2[i + 1])) {
        //             i++;
        //             concatTxt3 += concatTxt2[i];
        //         } else {
        //             concatTxt3 += concatTxt2[i];
        //         }
        //     }
        // } else {
        //     concatTxt3 = concatTxt2;
        // }

        // let concatTxt4 = "";
        // if (concatTxt3.search("ุ") !== -1) {
        //     // console.log("พบ ตีนเหยียด : ", concatTxt3.search("ุ"));
        //     for (let i = 0; i < concatTxt3.length; i++) {
        //         if (
        //             ((concatTxt3[i] === "ุ" && detectAllVowel(concatTxt3[i + 1]) && detectAllVowel(concatTxt3[i + 2]))
        //                 || (concatTxt3[i] === "ุ" && detectAllVowel(concatTxt3[i + 1]) && i === (concatTxt3.length - 1))
        //             ) // ตีนเหยียด
        //         ) {
        //             i++;
        //         } else if (concatTxt3[i] === "ุ" && detectAllVowel(concatTxt3[i + 1])) {
        //             i++;
        //             concatTxt4 += concatTxt3[i];
        //         } else {
        //             concatTxt4 += concatTxt3[i];
        //         }
        //     }
        // } else {
        //     concatTxt4 = concatTxt3;
        // }

        // let concatTxt5 = "";
        // if (concatTxt4.search("ู") !== -1) {
        //     // console.log("พบ ตีนคู้ : ", concatTxt4.search("ู"));
        //     for (let i = 0; i < concatTxt4.length; i++) {
        //         if (
        //             ((concatTxt4[i] === "ู" && detectAllVowel(concatTxt4[i + 1]) && detectAllVowel(concatTxt4[i + 2]))
        //                 || (concatTxt4[i] === "ู" && detectAllVowel(concatTxt4[i + 1]) && i === (concatTxt4.length - 1))
        //             ) // ตีนคู้
        //         ) {
        //             i++;
        //         } else if (concatTxt4[i] === "ู" && detectAllVowel(concatTxt4[i + 1])) {
        //             i++;
        //             concatTxt5 += concatTxt4[i];
        //         } else {
        //             concatTxt5 += concatTxt4[i];
        //         }
        //     }
        // } else {
        //     concatTxt5 = concatTxt4;
        // }

        // let concatTxt6 = "";
        // if (concatTxt5.search("ิ") !== -1) {
        //     // console.log("พบ สระอิ : ", concatTxt5.search("ิ"));
        //     for (let i = 0; i < concatTxt5.length; i++) {
        //         if (
        //             ((concatTxt5[i] === "ิ" && detectAllVowelIgnore(concatTxt5[i + 1]) && detectAllVowelIgnore(concatTxt5[i + 2]))
        //                 || (concatTxt5[i] === "ิ" && detectAllVowelIgnore(concatTxt5[i + 1]) && i === (concatTxt5.length - 1))
        //             ) // สระอิ
        //         ) {
        //             i++;
        //         } else if (concatTxt5[i] === "ิ" && detectAllVowelIgnore(concatTxt5[i + 1])) {
        //             i++;
        //             concatTxt6 += concatTxt5[i];
        //         } else {
        //             concatTxt6 += concatTxt5[i];
        //         }
        //     }
        // } else {
        //     concatTxt6 = concatTxt5;
        // }

        // let concatTxt7 = "";
        // if (concatTxt6.search("ี") !== -1) {
        //     // console.log("พบ สระอี : ", concatTxt6.search("ี"));
        //     for (let i = 0; i < concatTxt6.length; i++) {
        //         if (
        //             ((concatTxt6[i] === "ี" && detectAllVowelIgnore(concatTxt6[i + 1]) && detectAllVowelIgnore(concatTxt6[i + 2]))
        //                 || (concatTxt6[i] === "ี" && detectAllVowelIgnore(concatTxt6[i + 1]) && i === (concatTxt6.length - 1))
        //             ) // สระ E
        //         ) {
        //             i++;
        //         } else if (concatTxt6[i] === "ี" && detectAllVowelIgnore(concatTxt6[i + 1])) {
        //             i++;
        //             concatTxt7 += concatTxt6[i];
        //         } else {
        //             concatTxt7 += concatTxt6[i];
        //         }
        //     }
        // } else {
        //     concatTxt7 = concatTxt6;
        // }

        // let concatTxt8 = "";
        // if (concatTxt7.search("ึ") !== -1) {
        //     // console.log("พบ สระอึ : ", concatTxt7.search("ึ"));
        //     for (let i = 0; i < concatTxt7.length; i++) {
        //         if ((concatTxt7[i] === "ึ" && detectAllVowelIgnore(concatTxt7[i + 1]) && detectAllVowelIgnore(concatTxt7[i + 2]))
        //             || (concatTxt7[i] === "ึ" && detectAllVowelIgnore(concatTxt7[i + 1]) && i === (concatTxt7.length - 1))
        //         ) { // สระอึ
        //             i++;
        //         } else if (concatTxt7[i] === "ึ" && detectAllVowelIgnore(concatTxt7[i + 1])) {
        //             i++;
        //             concatTxt8 += concatTxt7[i];
        //         } else {
        //             concatTxt8 += concatTxt7[i];
        //         }
        //     }
        // } else {
        //     concatTxt8 = concatTxt7;
        // }

        // let concatTxt9 = "";
        // if (concatTxt8.search("้") !== -1) {
        //     // console.log("พบ ไม้โท : ", concatTxt8.search("้"));
        //     for (let i = 0; i < concatTxt8.length; i++) {
        //         if ((concatTxt8[i] === "้" && detectAllVowel(concatTxt8[i + 1]) && detectAllVowel(concatTxt8[i + 2]))
        //             || (concatTxt8[i] === "้" && detectAllVowel(concatTxt8[i + 1]) && i === (concatTxt8.length - 1))
        //         ) { // ไม้โท
        //             i++;
        //         } else if (concatTxt8[i] === "้" && detectAllVowel(concatTxt8[i + 1])) {
        //             i++;
        //             concatTxt9 += concatTxt8[i];
        //         } else {
        //             concatTxt9 += concatTxt8[i];
        //         }
        //     }
        // } else {
        //     concatTxt9 = concatTxt8;
        // }

        // let concatTxt10 = "";
        // if (concatTxt9.search("ื") !== -1) {
        //     // console.log("พบ สระอื : ", concatTxt9.search("ื"));
        //     for (let i = 0; i < concatTxt9.length; i++) {
        //         if ((concatTxt9[i] === "ื" && detectAllVowelIgnore(concatTxt9[i + 1]) && detectAllVowelIgnore(concatTxt9[i + 2]))
        //             || (concatTxt9[i] === "ื" && detectAllVowelIgnore(concatTxt9[i + 1]) && i === (concatTxt9.length - 1))
        //         ) { // สระอื
        //             i++;
        //         } else if (concatTxt9[i] === "ื" && detectAllVowelIgnore(concatTxt9[i + 1])) {
        //             i++;
        //             concatTxt10 += concatTxt9[i];
        //         } else {
        //             concatTxt10 += concatTxt9[i];
        //         }
        //     }
        // } else {
        //     concatTxt10 = concatTxt9;
        // }

        // let concatTxt11 = "";
        // if (concatTxt10.search("๊") !== -1) {
        //     // console.log("พบ ไม้ตรี : ", concatTxt10.search("๊"));
        //     for (let i = 0; i < concatTxt10.length; i++) {
        //         if ((concatTxt10[i] === "๊" && detectAllVowel(concatTxt10[i + 1]) && detectAllVowel(concatTxt10[i + 2]))
        //             || (concatTxt10[i] === "๊" && detectAllVowel(concatTxt10[i + 1]) && i === (concatTxt10.length - 1))
        //         ) { // ไม้ตรี
        //             i++;
        //         } else if (concatTxt10[i] === "๊" && detectAllVowel(concatTxt10[i + 1])) {
        //             i++;
        //             concatTxt11 += concatTxt10[i];
        //         } else {
        //             concatTxt11 += concatTxt10[i];
        //         }
        //     }
        // } else {
        //     concatTxt11 = concatTxt10;
        // }

        // let concatTxt12 = "";
        // if (concatTxt11.search("๋") !== -1) {
        //     // console.log("พบ ไม้จัตวา : ", concatTxt11.search("๋"));
        //     for (let i = 0; i < concatTxt11.length; i++) {
        //         if ((concatTxt11[i] === "๋" && detectAllVowel(concatTxt11[i + 1]) && detectAllVowel(concatTxt11[i + 2]))
        //             || (concatTxt11[i] === "๋" && detectAllVowel(concatTxt11[i + 1]) && i === (concatTxt11.length - 1))
        //         ) { // ไม้จัตวา
        //             i++;
        //         } else if (concatTxt11[i] === "๋" && detectAllVowel(concatTxt11[i + 1])) {
        //             i++;
        //             concatTxt12 += concatTxt11[i];
        //         } else {
        //             concatTxt12 += concatTxt11[i];
        //         }
        //     }
        // } else {
        //     concatTxt12 = concatTxt11;
        // }

        // let concatTxt13 = "";
        // if (concatTxt12.search("ํ") !== -1) {
        //     // console.log("พบ สระอำ : ", concatTxt12.search("ํ"));
        //     for (let i = 0; i < concatTxt12.length; i++) {
        //         if ((concatTxt12[i] === "ํ" && detectAllVowel(concatTxt12[i + 1]) && detectAllVowel(concatTxt12[i + 2]))
        //             || (concatTxt12[i] === "ํ" && detectAllVowel(concatTxt12[i + 1]) && i === (concatTxt12.length - 1))
        //         ) { // สระอำ
        //             i++;
        //         } else if (concatTxt12[i] === "ํ" && detectAllVowel(concatTxt12[i + 1])) {
        //             i++;
        //             concatTxt13 += concatTxt12[i];
        //         } else {
        //             concatTxt13 += concatTxt12[i];
        //         }
        //     }
        // } else {
        //     concatTxt13 = concatTxt12;
        // }

        // let concatTxt14 = "";
        // if (concatTxt13.search("์") !== -1) {
        //     // console.log("พบ การันต์ : ", concatTxt13.search("์"));
        //     for (let i = 0; i < concatTxt13.length; i++) {
        //         if ((concatTxt13[i] === "์" && detectAllVowel(concatTxt13[i + 1]) && detectAllVowel(concatTxt13[i + 2]))
        //             || (concatTxt13[i] === "์" && detectAllVowel(concatTxt13[i + 1]) && i === (concatTxt13.length - 1))
        //         ) { // การันต์
        //             i++;
        //         } else if (concatTxt13[i] === "์" && detectAllVowel(concatTxt13[i + 1])) {
        //             i++;
        //             concatTxt14 += concatTxt13[i];
        //         } else {
        //             concatTxt14 += concatTxt13[i];
        //         }
        //     }
        // } else {
        //     concatTxt14 = concatTxt13;
        // }

        // let concatTxt15 = "";
        // if (concatTxt14.search("ฺ") !== -1) {
        //     // console.log("พบ จุดสุดท้าย : ", concatTxt14.search("ฺ"));
        //     for (let i = 0; i < concatTxt14.length; i++) {
        //         if ((concatTxt14[i] === "ฺ" && detectAllVowel(concatTxt14[i + 1]) && detectAllVowel(concatTxt14[i + 2]))
        //             || (concatTxt14[i] === "ฺ" && detectAllVowel(concatTxt14[i + 1]) && i === (concatTxt14.length - 1))
        //         ) { // การันต์
        //             i++;
        //         } else if (concatTxt14[i] === "ฺ" && detectAllVowel(concatTxt14[i + 1])) {
        //             i++;
        //             concatTxt15 += concatTxt14[i];
        //         } else {
        //             concatTxt15 += concatTxt14[i];
        //         }
        //     }
        // } else {
        //     concatTxt15 = concatTxt14;
        // }

        // console.log("------------");
        return text; // concatTxt15;
    } catch (error) {
        // console.log("detect vowel error : ", error);
        return text;
    }
}

const detectAllVowel = (text) => {
    if (
        text === "ั" || text === "็" || text === "่" || text === "ุ" || text === "ู" || text === "ิ" || text === "ี" ||
        text === "ึ" || text === "้" || text === "ื" || text === "๊" || text === "๋" || text === "ํ" || text === "์" || 
        text === "ฺ"
    ) {
        return true
    } else {
        return false
    }
}

const detectAllVowelIgnore = (text) => {
    if (
        text === "ั" || text === "็" || text === "ุ" || text === "ู" || text === "ิ" || text === "ี" ||
        text === "ึ" || text === "ื"
    ) {
        return true
    } else {
        return false
    }
}

// const detectRepeatToken = async () => {
//     let loopActive = true;
//     while (loopActive) {
//         let token = genToken()
//         const result = await detectRepeatTokenFetch(token)
//         if (result === "unrepeat") {
//             loopActive = false
//             return token
//         }
//     }
// }

// const detectRepeatOpenCourseToken = async (uid) => {
//     let loopActive = true
//     while (loopActive) {
//         let token = genToken()
//         const result = await detectRepeatOpenCourseTokenFetch(token, uid)
//         if (result === "unrepeat") {
//             loopActive = false
//             return token
//         }
//     }
// }

// const detectAccountVerifyRepeatToken = async () => {
//     let loopActive = true
//     while (loopActive) {
//         let token = genNumber0To9(6)
//         const resultDetect = await detectAccountVerifyRepeatTokenByIdFetch(token)
//         if (resultDetect === "unrepeat") {
//             loopActive = false
//             return token
//         }
//     }
// }

export {
    detectConvertLocation,
    detectFormatPassword,
    detectIsNumber,
    detectIsSpecialCharacter,
    detectFirstName,
    detectLastName,
    detectBankAccountName,
    detectEmail,
    detectPhone,
    detectUsername,
    detectSignIn,
    detectVowelByText,
    detectAllVowel,
    detectAllVowelIgnore,
    // detectRepeatToken,
    // detectRepeatOpenCourseToken,
    // detectAccountVerifyRepeatToken
}
