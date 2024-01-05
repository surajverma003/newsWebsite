import React, { Component } from 'react'
import spin from '../spinner.gif'

export default class Spin extends Component {
  render() {
    return (
      <div className='text-center'>
        <img style={{width:'5rem',position:'absolute',top:'50%',left:'50%',right:'50%',bottom:'50%'}} src={spin} alt="" />
      </div>
    )
  }
}
    