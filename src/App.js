import React, { Component } from 'react';
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import PrintLine from "./components/PrintLine";
import Control from "./components/Control";
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import './App.css';

class App extends Component {
    // render() 보다 먼저 실행되어 초기화 하기 위한 코드
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'create',
      selected_content_id:2,
      subject:{title:'WEB', sub:'World Wid Web!'},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents:[
        {id: 1, title:'HTML', desc: 'HTML is for information'},
        {id: 2, title:'CSS', desc: 'CSS is for design'},
        {id: 3, title:'JavaScript', desc: 'JavaScript is for interactive'}
      ]
    }
  }
  getReadContent(){
    var i = 0;
    while( i < this.state.contents.length) {
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id) {
        return data;
      }
      i = i + 1;
    }
  }
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}/>;
    } else if(this.state.mode === 'read') { 
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}/>;
    } else if(this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id+1;
        // this.state.contents.push({id:this.max_content_id, title:_title, desc:_desc});
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        )
        this.setState({
          contents:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        });
      }.bind(this)}/>;
    } else if(this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} 
      onSubmit={function(_id, _title, _desc){
        var _contents = Array.from(this.state.contents);
        var i = 0;
        while(i < _contents.length) {
          if(_contents[i].id === _id) {
            _contents[i] = {id:_id, title:_title, desc:_desc}
            break;
          }
          i = i + 1;
        }
        this.setState({
          contents:_contents,
          mode:'read'
        });
      }.bind(this)}/>;
    }
    return _article;
  }

  // 상태가 바뀌면 Render() 함수가 다시 호출 된다. -> 다시 그려진다.
  render() {
    return (
      <div className='App'>
        {/* ----------Subject Module---------- */}
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function() {
            this.setState({mode:'welcome'});
          }.bind(this)} />
        <PrintLine />

        {/* ----------TOC Module---------- */}
        <TOC 
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
            });
          }.bind(this)}
          data={this.state.contents}
        />
        <PrintLine />

        {/* ----------Control Module---------- */}
        <Control onChangeMode={function(_mode) {
          if(_mode === 'delete') {
            if(window.confirm("Delete Check Y/N")) {
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i<_contents.length) {
                 if(_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i,1);
                  break;
                 }
                i = i + 1;
              }
              this.setState({
                contents: _contents,
                mode:'welcome'
              });
              alert("Delete Success");
            }
          } else {
            this.setState({
              mode:_mode
            });
          }
        }.bind(this)} />
        <PrintLine />

        {/* ----------ReadContent Module---------- */}
        {this.getContent()}
        {/* <ReadContent title={_title} desc={_desc}/> */}
        <PrintLine />
      </div>
    );
  }
}

export default App;
