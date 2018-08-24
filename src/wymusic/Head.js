import React, { Component } from 'react';
import { List } from 'antd-mobile';
import './mymusic.css';
import Axios from 'axios';
import { imgIp, IP } from './ip.js'
import { connect } from "react-redux";
class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      flag: true,
      data: { img: 'a9y.png' }
    }
  }
  componentWillMount() {
    if (this.props.user[0]) {
      Axios.post(IP + '/logIs', { _id: this.props.user[0]._id }).then(msg => {
        this.setState({
          data:msg.data
        })
      })
    }
  }
  render() {
    return (
      <div >
        <div className='title mymusicFlex'>
          <img src={imgIp + '/fh.png'} alt='' onClick={this.goBack.bind(this)} />
          <p>头像变更 </p>
          <img src={imgIp + '/search-right.png'} alt="" />
        </div>
        <img className='headImg' src={imgIp + '/' + this.state.data.img} alt='' />
        {
          this.state.flag && <a className='file'>更换头像<input className='headInput' type="file" id="updata" name="inputFile" onChange={this.change.bind(this)} /></a>
        }
        {
          !this.state.flag && <a ref='val' className='file'>上传头像<input className='headInput' type="submit" onClick={this.uploadFile.bind(this)} value="开始上传" /></a>
        }
      </div>
    );
  }
  goBack() {
    this.props.history.goBack()
  }
  change(e) {
    this.file = e.target.files[0];
    this.setState({
      flag: false
    })
  }
  uploadFile(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', this.file);
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    Axios.post(IP + '/upFile', formData, config).then(msg => {
      this.setState({
        data: {_id:this.props.user[0]._id, img: msg.data }
      })
      this.refs.val.text = '上传成功'
      Axios.post(IP + '/userImg', this.state.data).then(msg => {
        console.log('Ok');
      })
    })
  }


}
function filter(state) {
  return {
    user: state.user
  }
}
export default connect(filter)(Head);