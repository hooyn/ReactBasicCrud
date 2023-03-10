import React, { Component } from "react";

class UpdateContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.data.id,
            title: this.props.data.title,
            desc: this.props.data.desc
        }
    }
    inputFormHandler(e) {
        this.setState({[e.target.name]:e.target.value});
    }
    render() {
        return (
            <article>
                <h2 >Update</h2>
                <form action="/create_process" metho="post"
                onSubmit={function(e){
                    e.preventDefault();
                    this.props.onSubmit(
                        this.state.id,
                        this.state.title,
                        this.state.desc
                    );
                }.bind(this)}>
                    <input type={"hidden"} name="id" value={this.state.id}></input>
                    <p>
                        <input type={"text"} name="title" 
                        placeholder="title" value={this.state.title}
                        onChange={this.inputFormHandler.bind(this)}></input>
                    </p>
                    <p>
                        <textarea name="desc" 
                        placeholder="description" value={this.state.desc}
                        onChange={this.inputFormHandler.bind(this)}></textarea>
                    </p>
                    <p>
                        <input type={"submit"} value="Submit"></input>
                    </p>
                </form>
            </article>
        );
    }
  }

export default UpdateContent;