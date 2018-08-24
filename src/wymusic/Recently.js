import React, { Component } from 'react';
import { List } from 'antd-mobile';
import './mymusic.css';
import Axios from 'axios';
import { imgIp, IP } from './ip.js'
import { song, songlist } from '../store/actions.js';
import { connect } from "react-redux";
class Recently extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      arr: []
    };
  }
  componentWillMount() {
    Axios.get(IP + '/songnum', { params: { page: 1, rows: 8 } }).then(msg => {
      this.setState({
        num: msg.data.total
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
          arr: allArr
        })
      }else{
        this.setState({
          arr: this.props.recently
        })
      }
    })
  }
  render() {
    return (
      <div >
        <div className='title mymusicFlex'>
          <img src={imgIp + '/oq.png'} alt="" onClick={this.Gobank.bind(this)} />
          <p>我的音乐</p>
          <img src={imgIp + '/search-right.png'} alt="" />
        </div>
        <div className='mymusicList'>
          {
            this.state.arr.map((item, index) => <List.Item onClick={this.clickSong.bind(this, item, index)} key={item._id}>
              <div className='Recently'>
                <div>
                  <div>
                    <span>{index + 1}:{item.name}</span>
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
    this.props.history.push('/mymusic/recently')
  }
  Gobank() {
    this.props.history.goBack()
  }
  clickSong(data, index) {
    this.props.dispatch(song(data))
    this.props.dispatch(songlist([{ name: '最近播放', song: this.state.arr }]))
    this.props.history.push({
      pathname: '/song',
      index
    })
  }
  componentWillUnmount() {
    this.props.dispatch(songlist([{ name: '最近播放', song: this.state.arr }]))
    Axios.post(IP + '/recentlyAdd', {
      submitType: "addMore",
      data: this.state.arr
    })
  }
}
function filter(state) {
  return {
    recently: state.recently
  }
}
export default connect(filter)(Recently);