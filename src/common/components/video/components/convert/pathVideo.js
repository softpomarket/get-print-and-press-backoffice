export const PathVideo = (path) => {
    let pathCoV = ""
    if (path) {
        let pathArr = path.split("/")
        for (let i = 0; i < pathArr.length; i++) {
            if (i === 0) {
                pathCoV = pathArr[i]
            } else {
                pathCoV = pathCoV + "@-tfy-@" + pathArr[i]
            }
        }
    }
    return pathCoV
}