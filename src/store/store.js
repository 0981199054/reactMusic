import { createStore } from 'redux'

//reducer
import reducers from './reducers.js'

//创建仓库     
//里面的函数就是reducer(计算者)  每次收到action改变状态的时候，都会调用reducer
//2个参数  state: store内所有的数据    action:
export default createStore(reducers)