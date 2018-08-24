import React, { Component } from 'react';
import { List } from 'antd-mobile';
import './mymusic.css';
import Axios from 'axios';
import { imgIp, IP } from './ip.js'
import { connect } from "react-redux";
class Mymusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: '未登录',
        img: 'a9y.png',
      }
    }
  }
  componentWillMount() {
    if (this.props.user[0]) {
      Axios.post(IP + '/logIs', { _id: this.props.user[0]._id }).then(msg => {
        this.setState({
          data: msg.data
        })
      })
    }
  }

  render() {
    return (
      <div>
        <div className='title mymusicFlex'>
          <p></p>
          <p>账号</p>
          <img src={imgIp + '/search-right.png'} alt="" />
        </div>
        <div style={{ backgroundColor: '#fff', height: '27.3rem', overflow: 'auto' }}>
          <div className='mymusicFlex myBg'>
            <div className='mymusicFlex'>
              <img src={imgIp + '/' + this.state.data.img} alt='' onClick={this.head.bind(this)} />
              <p className='user'>{this.state.data.name}</p>
            </div>
            <img className='qd' src={imgIp + '/qd.png'} alt='' />
          </div>
          <div className='mymusicFlex myBg'>
            <div className='flex'><p>动态</p><p>1</p></div>
            <div className='flex'><p>关注</p><p>1</p></div>
            <div className='flex'><p>粉丝</p><p>1</p></div>
            <div className='flex'><p>我的资料</p><i></i></div>
          </div>
          <div className='mymusicList'>
            <div className='marginTop'></div>
            <List.Item className='horizontal' extra='1' arrow="horizontal" >我的消息</List.Item>
            <div className='marginTop'></div>
            <List.Item className='horizontal' arrow="horizontal" >会员中心</List.Item>
            <List.Item arrow="horizontal" >商城</List.Item>
            <div className='marginTop'></div>
            <List.Item arrow="horizontal" >在线听歌免流量</List.Item>
            <List.Item className='horizontal' arrow="horizontal" >设置</List.Item>
            <List.Item arrow="horizontal" >扫一扫</List.Item>
            <List.Item arrow="horizontal" >个性换肤</List.Item>
            <List.Item arrow="horizontal" >夜间模式</List.Item>
            <List.Item arrow="horizontal" >自动关闭</List.Item>
          </div>
        </div>
        <div className='Mainfooter'>
          <div className='footerNav'>
            <div className='navOne'><img src={imgIp + '/main.png'} className='navImg' onClick={this.onMain.bind(this)} alt="" /><p>发现音乐</p></div>
            <div className='navOne'><img src={imgIp + '/mymusic.png'} className='navImg' onClick={this.onMymusic.bind(this)} alt="" /><p>我的音乐</p></div>
            <div className='navOne'><img src={imgIp + '/people.png'} className='navImg' alt="" /><p>朋友</p></div>
            <div className='navOne'><img src={imgIp + '/my.png'} className='navImg' alt="" /><p>账号</p></div>
          </div>
        </div>
      </div>
    );
  }
  //跳转主页
  onMain() {
    this.props.history.push('/')
  }
  onMymusic() {
    this.props.history.push('/mymusic')
  }
  Click() {
    this.props.history.push('/recently')
  }
  head() {
    if (this.state.data.name === "未登录") {
      this.props.history.push('/log')
    } else {
      this.props.history.push('/head')
    }

  }

}
function filter(state) {
  return {
    recently: state.recently,
    user: state.user
  }
}
export default connect(filter)(Mymusic);