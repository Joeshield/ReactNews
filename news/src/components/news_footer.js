/**
 * 底部组件
 */
import React, {Component} from 'react'
import {Col} from 'antd'

export default class NewsFooter extends Component {
    render(){
      return(
        <footer>
          <Col span={1}></Col>
          <Col span={22} style={{textAlign:'center',padding:'20px'}}>
            2017 React News. All Rights Reserved.
          </Col>
          <Col span={1}></Col>
        </footer>
      )
    }
}
