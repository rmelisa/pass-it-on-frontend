import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import './Modal.css'

class Modal extends Component {
    constructor(props){
        super(props)
        this.close = this.close.bind(this)
    }

    close () {
        this.props.history.push('/')
    }

    render(){
        return(
            <div className="modal">
              <div className="modal-content">
                <div className="modal-header">
                  <span className="close" onClick={this.close}>&times;</span>
                </div>
                <div className="modal-body">
                  <p>{this.props.errorMSG}</p>
                </div>
              </div>
            
            </div>
      )
    }
}

let connectedModal = connect()(withRouter(Modal))
export default connectedModal