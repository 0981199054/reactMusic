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
      num: 0,
      Recently: []
    };
  }
  componentWillMount() {
    Axios.get(IP + '/songnum', { params: { page: 1, rows: 8 } }).then(msg => {
      this.setState({
        num: msg.data.total,
      });
    })
    Axios.post(IP + '/recently', {}).then(msg => {
      msg.data.map(item => delete item._id)
      if (msg.data.length > 0) {
        let allArr = [];
        let oldArr = [...msg.data, ...this.props.recently];
        for (var i = 0; i < oldArr.length; i++) {
          var flag = true;
          for (var j = 0; j < allArr.length; j++) {
            if (oldArr[i].name === allArr[j].name) {
              flag = false;
            };
          };
          if (flag) {
            allArr.push(oldArr[i]);
          };
        };
        this.setState({
          Recently: allArr
        })
      } else {
        this.setState({
          Recently: this.props.recently
        })
      }
    })
  }
  render() {
    return (
      <div className='allheigth'>
        <div className='title mymusicFlex '>
          <p>更多</p>
          <p>我的音乐</p>
          <img src={imgIp + '/search-right.png'} alt="" />
        </div>
        <div className='mymusicList'>
          <List.Item extra={this.state.num} thumb={imgIp + '/bd.png'} arrow="horizontal" >本地音乐</List.Item>
          <List.Item extra={this.state.Recently.length} thumb={imgIp + '/zj.png'} arrow="horizontal" onClick={this.Click.bind(this)}>最近播放</List.Item>
          <List.Item extra='1' thumb={imgIp + '/dt.png'} arrow="horizontal" >我的电台</List.Item>
          <List.Item extra='1' thumb={imgIp + '/sz.png'} arrow="horizontal" >我的收藏</List.Item>
        </div>
        <div className='Mainfooter'>
          <div className='footerNav'>
            <div className='navOne'><img src={imgIp + '/main.png'} className='navImg' onClick={this.onMain.bind(this)} alt="" /><p>发现音乐</p></div>
            <div className='navOne'><img src={imgIp + '/mymusic.png'} className='navImg' onClick={this.onMymusic.bind(this)} alt="" /><p>我的音乐</p></div>
            <div className='navOne'><img src={imgIp + '/people.png'} className='navImg' alt="" /><p>朋友</p></div>
            <div className='navOne'><img src={imgIp + '/my.png'} className='navImg' onClick={this.onMy.bind(this)} alt="" /><p>账号</p></div>
          </div>
        </div>
      </div>
    );
  }
  //跳转主页
  onMain() {
    this.props.history.push('/')
  }
  //跳账号
  onMy() {
    this.props.history.push('/my')
  }
  onMymusic() {
    this.props.history.push('/mymusic')
  }
  Click() {
    this.props.history.push('/recently')
  }
}
function filter(state) {
  return {
    recently: state.recently
  }
}
export default connect(filter)(Mymusic);