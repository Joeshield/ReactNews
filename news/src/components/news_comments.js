/**
 * 新闻评论组件
 */
import React, {Component, PropTypes} from 'react'
import {Form,Card,Button,Iuput,notification} from 'antd'
import axios from 'axios'
// import FormItem from "antd/lib/form/FormItem.d";
const FormItem = Form.Item
class NewsComments extends Component {

  static propTypes = {
    uniquekey:PropTypes.string.isRequired
  }

  state = {
    comments:[]
  }

  //初始化执行
  componentDidMount(){
    //发送ajax请求获取数据，先获得uniquekey
    const {uniquekey} = this.props
    this.showNewsComments(uniquekey)
  }
  /*提交评论的函数*/
  handleSubmit= () =>{

    const userId = localStorage.getItem('userId')
    if(!userId){
      alert('请登陆后评论')
      return
      /*直接return 不再执行*/
    }
    const {uniquekey} =this.props
    //获取用户输入的数据
    const {content} = this.props.form.getFieldsValue()
    /*content另外两种方法
    * const {content} = this.props.form.getFieldValue('content')
    * const content = this.props.form.getFieldsvalue().content
    * */
    const url =`http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${uniquekey}&commnet=${content}`
    axios.get(url)
      .then(response => {
        //更新列表，提示，加清楚输入数据
        //更新列表
        this.componentDidMount()
        //提示
        notification.success({
          message:'提交评论成功'
        })
          //清楚数据
        this.props.form.resetFields()
        /*const content = response.data*/
      })
  }
/*提交评论的函数*/
  handleClick =()=>{
    //const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${uniquekey}`
    const userId = localStorage.getItem('userId')
    if(!userId){
      alert('请登陆后收藏')
      return
      /*直接return 不再执行*/
    }
    const {uniquekey} =this.props
    //获取用户输入的数据
    //const {content} = this.props.form.getFieldsValue()
    /*content另外两种方法
     * const {content} = this.props.form.getFieldValue('content')
     * const content = this.props.form.getFieldsvalue().content
     * */
    const url =`http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response => {
        //更新列表，提示，加清楚输入数据
        //更新列表
        this.componentDidMount()
        //提示
        notification.success({
          message:'收藏评论成功'
        })
        //清楚数据
        //this.props.form.resetFields()
        /*const content = response.data*/
      })
  }

  //切换新闻时执行
  componentWillReceiveProps(newProps){
    this.showNewsComments(newProps.uniquekey)
  }
  showNewsComments(uniquekey){
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response => {
        const comments = response.data
        this.setState({comments})
        //获得数据之后开始遍历数组，并添加到相关的内容中
      })
  }

  render(){
    const commentsList = this.state.comments.map((comment,index) =>(
      <Card key={index} title={comment.UserName} extra={`发布于${comment.datetime}`}>
        <p>{comment.Comments}</p>
      </Card>
    ))
    const {getFieldDecorator} = this.props.form
    return(
      <div style={{padding:'10px'}}>
        {
          commentsList
          /*然后const commentList = ？ ：*/
        }
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="您的评论">
            {getFieldDecorator('content')(
              <input type="textarea" placeholder="请输入评论内容"/>
            )}
          </FormItem>
          <Button type="primary" htmlType='submit'>提交评论</Button>
          {/*htmlType='submit'  表示按钮作为提交用*/}
          <Button type="primary" onClick={this.handleClick}>收藏该文章</Button>
          {/*两个方法，handleSubmie跟handClick，定义这2个函数*/}
        </Form>

      </div>
    )
  }
}

export default Form.create()(NewsComments)