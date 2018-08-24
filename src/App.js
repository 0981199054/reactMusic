import React, { Component } from 'react';
import { HashRouter as Router, Route} from 'react-router-dom';
import Main from './wymusic/Main.js'
import Reg from './wymusic/Reg.js'
import Log from './wymusic/Log.js'
import SongList from './wymusic/SongList.js'
import Song from './wymusic/Song.js'
import MyMusic from './wymusic/MyMusic.js'
import Recently from './wymusic/Recently.js'
import Seek from './wymusic/Seek.js'
import My from './wymusic/My.js'
import Head from './wymusic/Head.js'
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div>
            <Route exact path="/" component={Main} />
            <Route path="/mymusic" component={MyMusic} />
            <Route path="/head" component={Head} />
            <Route path="/my" component={My} />
            <Route path="/seek" component={Seek} />
            <Route path="/recently" component={Recently} />
            <Route path="/reg" component={Reg} />
            <Route path="/log" component={Log} />
            <Route path="/songlist" component={SongList} />
            <Route path="/song" component={Song} />
          </div>
        </div>
      </Router>
    );
  }

}

export default App;
