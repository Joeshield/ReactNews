/**
 * 图片新闻列表组件
 */
import React, {Component, PropTypes} from 'react'
import {Card} from 'antd'
import {Link} from 'react-router'
import axios from 'axios'

export default class NewsImageBlock extends Component {




  static propsTypes = {
    cardTitle:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired,
    count:PropTypes.number.isRequired,
    cardWidth:PropTypes.string.isRequired,
    imageWidth:PropTypes.string.isRequired
  }

  state = {
    newsArr : null
  }

  componentDidMount() {
    //发送ajax请求或者新闻列表数据
    const {type, count} = this.props
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    axios.get(url)
      .then(response => {
        const newsArr = response.data.map(({uniquekey,title,author_name,thumbnail_pic_s}) =>
          ({ uniquekey, title,author_name,thumbnail_pic_s}))
        this.setState({newsArr})
      })
  }

  render(){

    const {cardTitle, cardWidth, imageWidth, type} = this.props
    const {newsArr} = this.state

    const imageStyle = {
      width: imageWidth,
      height: '90px',
      display: 'block'
    }

    // 标题样式对象
    const titleStyle = {
      "width": imageWidth,
      "whiteSpace": "nowrap",
      "overflow": "hidden",
      "textOverflow": "ellipsis"
    }
    const newsList = !newsArr
      ?(<h2>没有任何新闻</h2>)
      :(
        <ul>
          {
            newsArr.map((news,index) => (
              <li key={index} className="imageblock">
                <Link to={`/news_detail/${news.uniquekey}/${type}`}>
                  <div>
                    <img src={news.thumbnail_pic_s} style={imageStyle}/>
                  </div>
                  <div className="custom-card">
                    <h3 style={titleStyle}>{news.title}</h3>
                    <p>{news.author_name}</p>
                  </div>
                </Link>
              </li>
            ))
          }

        </ul>
      )

    return(
      <Card className="topNewsList" title={cardTitle} style={{width:cardWidth}}>
        {
          newsList
        }
      </Card>
    )
  }
}
