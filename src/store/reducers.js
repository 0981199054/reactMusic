import { combineReducers } from 'redux'

//歌曲表单
function list(state = [], action) {
  switch (action.type) {
    case 'LIST': return action.list
    default: return state;
  }
}
//歌曲播放表单
function songlist(state = [], action) {
  switch (action.type) {
    case 'SONGLIST': return action.list
    default: return state;
  }
}
//歌曲播放页面
function song(state = [], action) {
  switch (action.type) {
    case 'SONG': return action.list
    default: return state;
  }
}
//最近播放
function recently(state = [], action) {
  switch (action.type) {
    case 'RECENTLY': return [...new Set([...state, action.data])]
    default: return state;
  }
}
//搜索
function seek(state = '', action) {
  switch (action.type) {
    case 'SEEK': return  action.data
    default: return state;
  }
}
//用户
function user(state = '', action) {
  switch (action.type) {
    case 'USER': return  action.data
    default: return state;
  }
}

//合并reducer为一个大的reducer
export default combineReducers({
  list,
  songlist,
  song,
  recently,
  seek,
  user
})
