import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import './SongList.css'
import { connect } from "react-redux";
import { song } from '../store/actions.js';
import { imgIp } from './ip.js'

class SongList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='songBox' ref='songBox'>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.prev.bind(this)}
        >歌单</NavBar>
        {
          this.props.songlist.map(item => {
            return (
              <div key={item._id} ref='songBox'>
                < div className='songListTitle bg' >
                  <img className='songimg ' src={imgIp + '/' + item.img} alt="" />
                  <div className='songListAbstract'>
                    <h3>{item.name}</h3>
                    <p>{item.create}</p>
                  </div>
                </div>
                <div className='imgList bg'>
                  <div>
                    <img src={imgIp + '/imgList1.png'} alt="" />
                    <p>233</p>
                  </div>
                  <div>
                    <img src={imgIp + '/imgList2.png'} alt="" />
                    <p>666</p>
                  </div>
                  <div>
                    <img src={imgIp + '/imgList3.png'} alt="" />
                    <p>233</p>
                  </div>
                  <div>
                    <img src={imgIp + '/imgList4.png'} alt="" />
                    <p>下载</p>
                  </div>
                </div>
                <NavBar
                  mode="light"
                  className='NavSong'
                >歌曲</NavBar>
                <ul className='songUl'>
                  {
                    item.song.map((item, index) => <li className='songLi' onClick={this.clickSong.bind(this, item, index)} data={item} key={item._id}>
                      <div>
                        <div>
                          <span>{index + 1}:{item.name}</span>
                        </div>
                        <div>
                          <p>{item.singer}</p>
                        </div>
                      </div>
                      <div>
                        <img src={imgIp + '/px.png'} alt=''/>
                        <img src={imgIp + '/pz.png'} alt=''/>
                      </div>
                    </li>)
                  }
                </ul>
              </div>

            )
          })
        }
      </div >
    );
  }
  componentDidMount(){
    this.refs.songBox.style.backgroundImage=`url('${imgIp}/bg.jpg')`
  }
  prev() {
    this.props.history.goBack()
  }
  clickSong(data, index) {
    this.props.dispatch(song(data))
    this.props.history.push({
      pathname: '/song',
      index
    })
  }

}
function filter(state) {
  return {
    songlist: state.songlist
  }
}

export default connect(filter)(SongList);