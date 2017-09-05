/**
 * 根路由组件
 */
import React,{Component} from 'react'
import NewsHeader from './news_header'
import NewsFooter from './news_footer'

//引入CSS
import '../componentsCss/pc.css'


export default class App extends Component{
  render(){
    return(
      <div>
        <NewsHeader></NewsHeader>
        {this.props.children}
        {/*这个是固定写法*/}
        <NewsFooter></NewsFooter>
      </div>
    )
  }
}