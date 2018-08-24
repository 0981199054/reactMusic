//main存储歌单
export function list(list) {
    return {
        type: 'LIST',
        list
    }
}
//SONGLIST页面歌曲播放列表
export function songlist(list) {
    return {
        type: 'SONGLIST',
        list
    }
}
//song播放列表
export function song(list) {
    return {
        type: 'SONG',
        list
    }
}
//最近播放
export function recently(data) {
    return {
        type: 'RECENTLY',
        data
    }
}
//搜索
export function seek(data) {
    return {
        type: 'SEEK',
        data
    }
}
//用户名
export function user(data) {
    return {
        type: 'USER',
        data
    }
}


