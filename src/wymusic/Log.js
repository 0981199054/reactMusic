import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, Icon, InputItem, Button, Toast } from 'antd-mobile';
import './Log&reg.css'
import Axios from 'axios';
import { IP, imgIp } from './ip.js'
import { connect } from "react-redux";
import { user } from '../store/actions.js';
class Log extends Component {
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.prev.bind(this)}
        >手机号登录</NavBar>
        <InputItem
          ref='user'
          placeholder="手机号"
        >
          <div ref='userImg' style={{ backgroundSize: 'cover', height: '22px', width: '22px' }} />
        </InputItem>
        <InputItem
          ref='pwd'
          type='password'
          placeholder="密码"
        >
          <div ref='pwdImg' style={{ backgroundSize: 'cover', height: '22px', width: '22px' }} />
        </InputItem>
        <Button className='logBtn' onClick={this.logBtn.bind(this)} >登录</Button>
        <Link to='/reg' className='repwd'>重设密码</Link>
      </div>
    );
  }
  componentDidMount() {
    this.refs.userImg.style.backgroundImage = `url('${imgIp}/user.png')`
    this.refs.pwdImg.style.backgroundImage = `url('${imgIp}/pwd.png')`
  }
  logBtn() {
    let param = {
      user: this.refs.user.state.value,
      pwd: this.refs.pwd.state.value,
     
    };
    Axios.post(IP + '/log', param).then(msg => {
      console.log(msg.data);
      if (msg.data === 'err')
        Toast.info('账号密码输入错误', 1);
      else {
        this.props.dispatch(user(msg.data))
        this.props.history.push('/')
      }

    })
  }
  prev() {
    this.props.history.goBack()
  }

}
export default connect()(Log);