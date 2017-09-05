/**
 * 默认路由组件(各种新闻列表)
 */
import React, {Component} from 'react'
import {Row,Col,Carousel,Tabs} from 'antd'
import NewsBlock from './news_block'
import NewsImageBlock from './news_image_block'
import NewsProducts from './news_products'
// import Carousel from "antd/lib/carousel/index.d";

import carousel_1 from '../images/carousel_1.jpg'
import carousel_2 from '../images/carousel_2.jpg'
import carousel_3 from '../images/carousel_3.jpg'
import carousel_4 from '../images/carousel_4.jpg'


// import TabPane from Tabs.TabPane
const TabPane = Tabs.TabPane

export default class NewsContainer extends Component {
    render(){
      return (
        <div>
          <Row className='container'>
            <Col span={1}></Col>
            <Col span={22}>
              <div className="leftContainer" style={{width:'35%'}}>
                <Carousel autoplay>
                  <div >
                    <img src={carousel_1}/>
                  </div>
                  <div>
                    <img src={carousel_2}/>
                  </div>
                  <div>
                    <img src={carousel_3}/>
                  </div>
                  <div>
                    <img src={carousel_4}/>
                  </div>
                </Carousel>
                <NewsImageBlock type="guoji" count={8} cardWidth='100%' imageWidth='112px' cardTitle='国际新闻'></NewsImageBlock>
              </div>
              <Tabs className='tabs_news' style={{width:'35%'}}>
                <TabPane key={1} tab="头条新闻">
                  <NewsBlock type="top" count={21}></NewsBlock>
                </TabPane>
                <TabPane key={2} tab="国际新闻">
                  <NewsBlock type="guoji" count={21}></NewsBlock>
                </TabPane>
              </Tabs>

              <Tabs style={{width:'30%'}}>
                <TabPane key={1} tab="其他友情链接">
                  <NewsProducts ></NewsProducts>
                </TabPane>
              </Tabs>
              <div>
                <NewsImageBlock type="guonei" count={8} cardWidth='100%' imageWidth='132px' cardTitle='国内新闻'></NewsImageBlock>
                <NewsImageBlock type="yule" count={16} cardWidth='100%' imageWidth='132px' cardTitle='娱乐新闻'></NewsImageBlock>

              </div>
            </Col>
            <Col span={1}></Col>

          </Row>
        </div>
      )
    }
}