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
            <div className="modal2">
              <div className="modal2-content">
                <div className="modal2-header">
                  <span className="close2" onClick={this.close}>&times;</span>
                </div>
                <div className="modal2-body">
                  <p>{this.props.errorMSG}</p>
                </div>
              </div>
            
            </div>
      )
    }
}

let connectedModal = connect()(withRouter(Modal))
export default connectedModal