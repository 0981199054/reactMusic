import React, { Component } from 'react';
import { NavBar, Icon, Slider, Modal, List } from 'antd-mobile';
import './Song.css'
import { connect } from "react-redux";
import { imgIp, songIp } from './ip.js'
import { recently } from '../store/actions.js';


class SongList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startTime: "00:00",
      endTime: "00:00",
      timer: '',
      percentage: 0,
      modal: false,
      index: this.props.location.index,
      max: this.props.songlist.song.length - 1,
      random: true
    }
    if (this.props.songlist.song[0]._id) {
      this.props.songlist.song.map(item => delete item._id)
      console.log(this.props.recently);
    }

  }
  render() {
    return (
      <div key='a' ref='songBox' className='allheigth' >
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.prev.bind(this)}
        ><div className='SongTitle'><p>{this.props.songlist.song[this.state.index].name}</p><p>{this.props.songlist.song[this.state.index].singer}</p></div></NavBar>
        <div>
          <img className='am' ref='ace' src={imgIp + '/am3.png'} alt='' />
          <div >
            <img className='playImg' ref='img' src={imgIp + '/' + this.props.songlist.song[this.state.index].img} alt="" />
            <img className='playImgAce' src={imgIp + '/ace.png'} alt="" />
          </div>
        </div>
        <div className='progress'><span>{this.state.startTime}</span>
          <Slider
            style={{ marginLeft: '1rem', marginRight: '1rem' }}
            className='Slider'
            defaultValue={0}
            value={this.state.percentage}
            min={0}
            max={100}
            onChange={this.change.bind(this)}
          /><span>{this.state.endTime}</span></div>
        <div className='player'>
          <img className='smallplay' onClick={this.random.bind(this)} src={imgIp + '/xh.png'} alt="" />
          <div>
            <img className='play' src={imgIp + '/prev.png'} onClick={this.prevPlay.bind(this)} alt="" />
            <img className='play' ref='play' onClick={this.onPlay.bind(this)} src={imgIp + '/play.png'} alt="" />
            <img className='play' src={imgIp + '/next.png'} onClick={this.nextPlay.bind(this)} alt="" />
          </div>
          <img className='smallplay' src={imgIp + '/cd.png'} onClick={this.onMenu.bind(this)} alt="" />
        </div>
        <audio ref='audio' onEnded={this.onEnded.bind(this)} src={songIp + '/' + this.props.songlist.song[this.state.index].song}></audio>
        <Modal
          popup
          visible={this.state.modal}
          onClose={this.onMenu.bind(this)}
          animationType="slide-up"
          maskClosable='true'
        >
          <List renderHeader={() => <div>歌曲列表</div>} >
            {this.props.songlist.song.map((i, index) => (
              <List.Item key={index} onClick={this.onList.bind(this, index)}>{i.name}</List.Item>
            ))}
          </List>
        </Modal>
      </div >
    );
  }
  componentDidMount() {
    this.refs.songBox.style.backgroundImage = `url('${imgIp}/bg.jpg')`
  }
  prev() {
    this.props.history.goBack()

  }
  //播放/暂停
  onPlay(e) {
    this.props.dispatch(recently(this.props.songlist.song[this.state.index]))
    if (e.target.src === imgIp + '/play.png') {
      e.target.src = imgIp + '/stop.png'
      this.refs.audio.play();
      this.refs.ace.style.transform = 'rotate(0deg)'
      this.refs.img.className = 'playImg rotate'
      this.timer = setInterval(() => {
        this.setState({
          percentage: Math.round((this.refs.audio.currentTime) / (this.refs.audio.duration) * 100),
          endTime: this.secondToMin(this.refs.audio.duration),
          startTime: this.secondToMin(this.refs.audio.currentTime)
        })
      }, 400)
    } else {
      e.target.src = imgIp + '/play.png'
      this.refs.audio.pause();
      this.refs.ace.style.transform = 'rotate(-30deg)'
      this.refs.img.className = 'playImg rotate stop'
      clearInterval(this.timer)
    }
  }
  //下一曲
  nextPlay() {
    if (!this.refs.audio.paused) {
      this.refs.audio.pause();
      if (this.state.index < this.state.max) {
        this.setState({
          index: this.state.index + 1,
          startTime: "00:00",
          endTime: "00:00"
        })
      } else {
        this.setState({
          index: 0,
          startTime: "00:00",
          endTime: "00:00"
        })
      }

      setTimeout(() => {
        this.refs.audio.play();
        this.refs.img.className = 'playImg rotate'
        this.refs.play.src = imgIp + '/stop.png'
      }, 300)
    } else {
      if (this.state.index < this.state.max) {
        this.setState({
          index: this.state.index + 1,
          startTime: "00:00",
          endTime: "00:00"
        })
      } else {
        this.setState({
          index: 0,
          startTime: "00:00",
          endTime: "00:00"
        })
      }
    }
    this.props.dispatch(recently(this.props.songlist.song[this.state.index]))
  }
  //上一曲
  prevPlay() {
    if (!this.refs.audio.paused) {
      this.refs.audio.pause();
      if (this.state.index > 0) {
        this.setState({
          index: this.state.index - 1,
          startTime: "00:00",
          endTime: "00:00"
        })
      } else {
        this.setState({
          index: this.state.max,
          startTime: "00:00",
          endTime: "00:00"
        })
      }
      setTimeout(() => {
        this.refs.audio.play();
        this.refs.img.className = 'playImg rotate'
        this.refs.play.src = imgIp + '/stop.png'
      }, 200)
    } else {
      if (this.state.index < this.state.max) {
        this.setState({
          index: this.state.index + 1,
          startTime: "00:00",
          endTime: "00:00"
        })
      } else {
        this.setState({
          index: 0,
          startTime: "00:00",
          endTime: "00:00"
        })
      }
    }
    this.props.dispatch(recently(this.props.songlist.song[this.state.index]))
  }
  //菜单
  onMenu(e) {
    e.preventDefault()
    this.setState({
      modal: !this.state.modal
    })
  }
  //歌单选歌
  onList(i) {
    this.setState({
      index: i,
      startTime: "00:00",
      endTime: "00:00",
      modal: false
    })
    setTimeout(() => {
      this.refs.audio.play();
      this.refs.img.className = 'playImg rotate'
      this.refs.play.src = imgIp + '/stop.png'
    }, 200)
  }
  componentWillUnmount() {

    clearInterval(this.timer)
  }
  //播放方式
  random(e) {
    if (e.target.src === imgIp + '/xh.png') {
      e.target.src = imgIp + '/sj.png'
      this.setState({
        random: false
      })
    } else {
      e.target.src = imgIp + '/xh.png'
      this.setState({
        random: true
      })
    }

  }
  // 计算时间
  secondToMin(s) {
    var MM = Math.floor(s / 60);
    var SS = s % 60;
    if (MM < 10)
      MM = "0" + MM;
    if (SS < 10)
      SS = "0" + SS;
    var min = MM + ":" + SS;
    return min.split('.')[0];
  }
  onEnded() {
    if (this.state.random) {
      this.nextPlay();
      setTimeout(() => {
        this.refs.audio.play();
        this.refs.img.className = 'playImg rotate'
        this.refs.play.src = imgIp + '/stop.png'
      }, 200)
    } else {
      this.setState({
        index: Math.floor(Math.random() * this.props.songlist.song.length),
        startTime: "00:00",
        endTime: "00:00"
      })
      setTimeout(() => {
        this.refs.audio.play();
        this.refs.img.className = 'playImg rotate'
        this.refs.play.src = imgIp + '/stop.png'
      }, 200)
    }

  }
  //拖动
  change(s) {
    this.refs.audio.currentTime = s / 100 * this.refs.audio.duration
    this.setState({
      startTime: this.secondToMin(s / 100 * this.refs.audio.duration)
    })
  }

}
function filter(state) {
  return {
    song: state.song,
    songlist: state.songlist[0],
    recently: state.recently
  }
}
export default connect(filter)(SongList);