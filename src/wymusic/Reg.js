import React, { Component } from 'react';
import { NavBar, Icon, InputItem, Button } from 'antd-mobile';
import './Log&reg.css'
import Axios from 'axios';
import { IP, imgIp } from './ip.js'

class Reg extends Component {
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.prev.bind(this)}
        >手机号注册</NavBar>
        <InputItem
          placeholder="手机号"
          ref='user'
        >
          <div style={{ display: 'flex' }}>
            <div ref='userImg' style={{ backgroundSize: 'cover', height: '22px', width: '22px' }} />
            <div style={{ marginLeft: '10px' }}>+86</div>
          </div>
        </InputItem>
        <InputItem
          placeholder="设置登录密码，不少于6位"
          ref='pwd'
          type='password'
        >
          <div ref='pwdImg' style={{ backgroundSize: 'cover', height: '22px', width: '22px' }} />
        </InputItem>

        <Button className='logBtn' onClick={this.nextBtn.bind(this)} >下一步</Button>

        <div className='footer'>
          <div className='otherReg'>
            <span className='line' />
            <span> 其他注册方式</span>
            <span className='line' />
          </div>
          <div className='logLogo'>
            <div>
              <img src={imgIp + '/wx-h.png'} name='wx' alt='wx' onClick={this.onMouse} />
              <p>微信</p>
            </div>
            <div>
              <img src={imgIp + '/qq-h.png'} name='qq' alt='qq' onClick={this.onMouse} />
              <p>QQ</p>
            </div>
            <div>
              <img src={imgIp + '/wb-h.png'} name='wb' alt='wb' onClick={this.onMouse} />
              <p>微博</p>
            </div>
            <div>
              <img src={imgIp + '/wy-h.png'} name='wy' alt='wy' onClick={this.onMouse} />
              <p>网易</p>
            </div>
          </div>
        </div>


      </div>
    );
  }
  componentDidMount() {
    this.refs.userImg.style.backgroundImage = `url('${imgIp}/user.png')`
    this.refs.pwdImg.style.backgroundImage = `url('${imgIp}/pwd.png')`
  }
  nextBtn() {
    let param = {
      user: this.refs.user.state.value,
      pwd: this.refs.pwd.state.value
    }
    Axios.post(IP + '/reg', param).then(msg => {
  
      this.props.history.push('/')
    })
  }
  prev() {
    this.props.history.goBack()
  }
  // 切换图片
  onMouse(e) {
    if (e.target.src === imgIp + '/' + e.target.name + '.png')
      e.target.src = imgIp + '/' + e.target.name + '-h.png'
    else
      e.target.src = imgIp + '/' + e.target.name + '.png'
  }

}
export default Reg;