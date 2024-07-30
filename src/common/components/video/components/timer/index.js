// /* eslint-disable array-callback-return */

// // import { getTimerWatchCourseByIdFetch, updateTimerWatchCourseByIdFetch } from "../../../../../modules/classroom/API"
// // import { getVideoCourseListFetch } from "../../../../../modules/course/API"
// import { Notification } from "../../../notification"

// export const Timer = async (
//     s,                                  // เวลาของการเข้าชมวิดีโอ ที่จะเพิ่ม
//     isFirstLoadApi,                     // 
//     courseId,                           // id ของคอร์สที่เข้าเรียน
//     uid,                                // uid ของผู้เข้าชมวิดีโอ
//     videoId,                            // id ของวิดีโอที่เข้าชม
//     isHandlePercentWatchVideoCourse,    // เรียกใช้ฟังก์ชัน isHandlePercentWatchVideoCourse หรือไม่ (true: ใช่, false: ไม่ใช่)
//     props                               // props
// ) => {
//     // [API] get timer ---------------------------------------------------------------------------
//     try {
//         let sumTimeVideoCourse = 0
//         let sumTimerWatchVideoCourse = 0
//         let percentWatch = 0

//         let requestGetTimer = { courseId, uid }
//         let videoCourseTimer = null
//         const resultGetTimer = await getTimerWatchCourseByIdFetch(requestGetTimer)
//         // console.log("getTimerWatchCourseByIdFetch : ", requestGetTimer, resultGetTimer)

//         if (resultGetTimer) {
//             videoCourseTimer = resultGetTimer.filter(val =>
//                 val.courseId === courseId &&
//                 val.uid === uid &&
//                 val.videoCourseId === videoId
//             )[0]
//             // console.log("info : ", courseId, uid, videoId)

//             let addTimer = (videoCourseTimer ? videoCourseTimer.timer : 0) + s
//             resultGetTimer.map(val => val.videoCourseId === videoId ? {
//                 learnerVideoCourseTimerId: val.learnerVideoCourseTimerId,
//                 uid: val.uid,
//                 courseId: val.courseId,
//                 videoCourseId: val.videoCourseId,
//                 timer: addTimer,
//             } : val)
//             // console.log("addTimer : ", addTimer, videoCourseTimer, s)

//             // [API] update count + timer ----------------------------------------------------------------
//             let requestUpdateTimer = {
//                 learnerVideoCourseTimerId: videoCourseTimer ? videoCourseTimer.learnerVideoCourseTimerId : null,
//                 timer: addTimer,
//             }

//             await updateTimerWatchCourseByIdFetch(requestUpdateTimer)
//             // console.log("updateTimerWatchCourseByIdFetch : ", requestUpdateTimer)

//             // [API] get all time video course -----------------------------------------------------------
//             const resultVideoCourseList = [] // await getVideoCourseListFetch(courseId)
//             // console.log("getVideoCourseListFetch : ", resultVideoCourseList)

//             if (resultVideoCourseList) {
//                 // sum time video course
//                 resultVideoCourseList.map(val => sumTimeVideoCourse += val.courseVideoDuration)

//                 // sum timer watch video course
//                 resultGetTimer.map(val => {
//                     let videoCourseDuration = resultVideoCourseList.filter(val2 => val2.courseVideoId === val.videoCourseId)[0]?.courseVideoDuration
//                     if (videoCourseDuration >= val.timer) {
//                         sumTimerWatchVideoCourse += val.timer
//                         // console.log('A : ', val.timer, val.videoCourseId, sumTimerWatchVideoCourse)
//                     } else {
//                         sumTimerWatchVideoCourse += videoCourseDuration
//                         // console.log('B : ', videoCourseDuration, val.videoCourseId, sumTimerWatchVideoCourse)
//                     }
//                 })

//                 percentWatch = (sumTimerWatchVideoCourse * 100) / sumTimeVideoCourse
//                 // console.log("percentWatch : ", sumTimeVideoCourse, sumTimerWatchVideoCourse, " | ", percentWatch)

//                 if (isHandlePercentWatchVideoCourse) {
//                     // handle state
//                     props.handlePercentWatchVideoCourse(
//                         sumTimeVideoCourse,
//                         sumTimerWatchVideoCourse,
//                         percentWatch,
//                         isFirstLoadApi,
                        
//                         resultVideoCourseList,
//                         resultGetTimer
//                     )
//                 } else {
//                     return {
//                         sumTimeVideoCourse,
//                         sumTimerWatchVideoCourse,
//                         percentWatch,
//                         isFirstLoadApi,

//                         resultVideoCourseList,
//                         resultGetTimer
//                     }
//                 }
//             } else {
//                 // console.log("video course list (ERR)")
//             }
//         }
//     } catch (err) {
//         Notification("error", "เเจ้งเตือน", "เกิดข้อผิดพลาดในการบันทึกเวลาเข้าชม !")
//     }
// }