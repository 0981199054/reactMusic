import React, { Component } from 'react';
import { SearchBar, Badge, Tabs, Carousel } from 'antd-mobile';
import { connect } from "react-redux";
import './Main.css';
import Axios from 'axios';
import { imgIp, IP } from './ip.js'
import { list, songlist, seek } from '../store/actions.js';
Axios.defaults.withCredentials = true

//头部标签页
const tab = [
  { title: <Badge>音乐</Badge> },
  { title: <Badge>视频</Badge> },
  { title: <Badge>电台</Badge> }
];
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: false,
      data: ['/banner1.png', '/banner2.png', '/banner3.png'],
    };
  }
  componentWillMount() {
    Axios.get(IP + '/songlist', { params: { submitType: "findJoin", ref: ["song"] } }).then(msg => {
      this.props.dispatch(list(msg.data))
    })
    Axios.post(IP + '/session', {}).then(msg => {
      if(msg.data==='err'){
        this.props.history.push('/log')
      }
    })
  }
  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              hidden: !this.state.hidden,
            });
          }}
        >
          Click to show/hide tab-bar
        </a>
        <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              fullScreen: !this.state.fullScreen,
            });
          }}
        >
          Click to switch fullscreen
        </a>
      </div>
    );
  }
  render() {
    return (
      <div>
        <div className='title'>
          <img src={imgIp + '/search-left.png'} alt="" />
          <SearchBar className='search' onSubmit={this.seek.bind(this)} placeholder="搜索音乐、视频、歌词、电台" />
          <img src={imgIp + '/search-right.png'} alt="" />
        </div>
        <Tabs
          tabs={tab}
          initialPage={0}
          swipeable={true}
        >
          <div style={{ backgroundColor: '#fff', height: '24.5rem', overflow: 'auto' }}>
            <Carousel
              autoplay={true}
              infinite={true}
            >
              {this.state.data.map(val => (
                <img
                  key='1'
                  src={imgIp + val}
                  alt=""
                  style={{ width: '100%', height: '10%', verticalAlign: 'top' }}
                />
              ))}
            </Carousel>
            <div className='recommend'>
              <div><img src={imgIp + '/daily.png'} alt="" /><p>每日推荐</p></div>
              <div><img src={imgIp + '/fm.png'} alt="" /><p>私人FM</p></div>
              <div><img src={imgIp + '/playlist.png'} alt="" /><p>歌单</p></div>
              <div><img src={imgIp + '/rank.png'} alt="" /><p>排行榜</p></div>
            </div>
            {/* 推荐歌单 */}
            <div className='songList'>
              <h3 className='recommendSong'>推荐歌单</h3>
              <ul className='songListUl'>
                {
                  this.props.list.map(item => <li onClick={this.songList.bind(this, item)} ref={item.name} className='songListLi' key={item._id}><img className='MainSongImg' src={imgIp + '/' + item.img} alt="" /><div><h5>{item.name}</h5><p className='p'>{item.create}</p></div></li>)
                }
              </ul>

            </div>
          </div>
          <div style={{ backgroundColor: '#fff', height: '24.5rem', overflow: 'auto' }}>
            <div><video src={imgIp + '/gm.mp4'} width='100%' controls="controls">
              您的浏览器不支持 video 标签。</video>
              <div className='video'>
                <p className='videoP'>故梦</p><img className='videoImg' src={imgIp + '/aan.png'} alt="" /><img className='videoImg' src={imgIp + '/aai.png'} alt="" />
              </div>
            </div>
            <div><video src={imgIp + '/qqqs.mp4'} width='100%' controls="controls">
              您的浏览器不支持 video 标签。</video>
              <div className='video'>
                <p className='videoP'>前前前世</p><img className='videoImg' src={imgIp + '/aan.png'} alt="" /><img className='videoImg' src={imgIp + '/aai.png'} alt="" />
              </div>
            </div>
            <div><video src={imgIp + '/qfl.mp4'} width='100%' controls="controls">
              您的浏览器不支持 video 标签。</video>
              <div className='video'>
                <p className='videoP'>起风了</p><img className='videoImg' src={imgIp + '/aan.png'} alt="" /><img className='videoImg' src={imgIp + '/aai.png'} alt="" />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center',height: '24.5rem', justifyContent: 'center', backgroundColor: '#fff' }}>
            电台
      </div>
        </Tabs>
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
    this.props.dispatch(seek(value))
    this.props.history.push('/seek')
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
}
function filter(state) {
  return {
    list: state.list
  }
}

export default connect(filter)(Main);

