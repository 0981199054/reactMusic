import React, { Component } from 'react';
import { SearchBar, List } from 'antd-mobile';
import { connect } from "react-redux";
import './mymusic.css';
import Axios from 'axios';
import { imgIp, IP } from './ip.js'
import { songlist, song } from '../store/actions.js';

class Seek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seek: this.props.seek,
      list: []
    };
  }
  componentWillMount() {
    Axios.get(IP + '/songnum', { params: { name: this.state.seek } }).then(msg => {
      this.setState({
        list: msg.data
      })
    })
  }
  componentWillUpdate() {
    Axios.get(IP + '/songnum', { params: { name: this.state.seek } }).then(msg => {
      this.setState({
        list: msg.data
      })
    })
  }

  render() {
    return (
      <div>
        <div className='title'>
          <img src={imgIp + '/search-left.png'} alt="" />
          <SearchBar className='search' onSubmit={this.seek.bind(this)} placeholder="搜索音乐、视频、歌词、电台" />
          <img src={imgIp + '/search-right.png'} alt="" />
        </div>
        <div className='mymusicList'>
          {
            this.state.list.map((item, index) => <List.Item onClick={this.clickSong.bind(this, item, index)} key={item._id}>
              <div className='Recently'>
                <div>
                  <div>
                    <span>{item.name}</span>
                  </div>
                  <div>
                    <p>{item.singer}</p>
                  </div>
                </div>
                <div>
                  <img src={imgIp + '/px.png'} alt='' />
                  <img src={imgIp + '/pz.png'} alt='' />
                </div>
              </div>
            </List.Item>)
          }
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
  //搜索
  seek(value) {
    this.setState({
      seek: value
    })
  }
  //跳转主页
  onMain() {
    this.props.history.push('/')
  }
  //跳账号
  onMy() {
    this.props.history.push('/my')
  }
  //跳我的音乐
  onMymusic() {
    this.props.history.push('/mymusic')
  }
  songList(data) {
    this.props.dispatch(songlist([data]))
    this.props.history.push('/songlist')
  }
  clickSong(data, index) {
    this.props.dispatch(song(data))
    this.props.dispatch(songlist([{ name: '搜索播放', song: this.state.list }]))
    this.props.history.push({
      pathname: '/song',
      index
    })
  }


}
function filter(state) {
  return {
    list: state.list,
    seek: state.seek
  }
}

export default connect(filter)(Seek);

