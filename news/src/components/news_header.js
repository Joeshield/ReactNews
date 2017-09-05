/**
 * 头部组件
 */
import React, {Component} from 'react'
import {Row,
  Col,//列
  Menu,//菜单项
  Modal,//确认框
  Icon,
  Button,
  Tabs,
  Form,
  Input,
  Checkbox,
  message,//消息提示
} from 'antd'
import axios from 'axios'
import logo from '../images/logo.png'
import {Link} from 'react-router'
//表单项
const FormItem = Form.Item;

const MenuItem = Menu.Item  //菜单项组件
const TabPane = Tabs.TabPane
class NewsHeader extends Component {

  state={
    seletedKey:'top',
  //  默认下为top，开始不为数组，为seletedKey，没有S
    username:null,
    modalShow :false
  }

  showModal = (isShow) => {
    this.setState ({modalShow:isShow})
  }

  componentDidMount(){
    //读取保存到本地的username数据
    const username = localStorage.getItem('username')
    if(username){
      this.setState({username})
    }
  }

  clickMenu = ({key}) => {
    if(key === 'logout'){
      this.setState({modalShow:true})
    }

    this.setState({seletedKey:key})
  }

  //登陆提交的请求
  handleSubmit =(isLogin) => {
    //发送登陆或注册的请求，需要收集 表单 输入的数据
    const {username,password,r_username,r_password,r_confirmpassword} = this.props.form.getFieldsValue()
    // console.log('handleSubmit',values)
    //首先获取一个url,username，pwd，r_username,r_pwd,r_pwd2
    let url = 'http://newsapi.gugujiankong.com/Handler.ashx?'
    if(isLogin){
      url +=`action=login&username=${username}&password=${password}`
    }else{
      url +=`action=register&r_username=${r_username}&r_password=${r_password}&r_confirmpassword=${r_confirmpassword}`

    }
    //参数都准备好了可以发送请求了
    axios.get(url)
      .then(response => {
        this.props.form.resetFields()
        const result = response.data
        if(isLogin){
          if(!result){
            message.error('登陆失败，重新登陆')
          }else{
            message.success('登陆成功')
            //读取返回的userID，userName
            const username = result.NickUserName
            const userId = result.UserId
            //更新状态
            this.setState({username})
            //保存userName，userID
            localStorage.setItem('username',username)
            localStorage.setItem('userId',userId)
          }
        }else{
          message.success('注册成功')
        }
      })
    this.setState({modalShow:false})
  }


  logout =()=>{
    //更新状态
    this.setState({username:null})
    //清楚保存的用户数据
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
  }
  // handleChange = () => {
  //   this.props.form.resetFields()
  // }
  //可以直接用this.onChange = { () => { this.props.form.resetFields()}}

  render(){
    const {seletedKey,username,modalShow} = this.state

    const userShow = username ? (
      <MenuItem key="login" className="register">
        <Button type="primary">{username}</Button>&nbsp;&nbsp;
        <Link to="/user_center"><Button type="dashed">个人中心</Button></Link>&nbsp;&nbsp;
        <Button onClick={this.logout}>退出</Button>
      </MenuItem>
    ):(
      <MenuItem key="logout" className="register">
        <Icon type="appstore"/>登陆/注册
      </MenuItem>
    )

    const { getFieldDecorator } = this.props.form;
    return (
      <Row>
        <Col span={1}></Col>
        <Col span={3}>
          <a href="#/" className='logo'>
            <img src={logo}/>
            <span>新闻首页</span>
          </a>
        </Col>
        <Col span={19}>
          <Menu mode="horizontal" selectedKeys={[seletedKey]} onClick={this.clickMenu}>
            <MenuItem key="top">
              <Icon type="appstore"/>头条
            </MenuItem>
            <MenuItem key="shehui">
              <Icon type="appstore"/>社会
            </MenuItem>
            <MenuItem key="guonei">
              <Icon type="appstore"/>国内
            </MenuItem>
            <MenuItem key="guoji">
              <Icon type="appstore"/>国际
            </MenuItem>
            <MenuItem key="yule">
              <Icon type="appstore"/>娱乐
            </MenuItem>
            <MenuItem key="tiyu">
              <Icon type="appstore"/>体育
            </MenuItem>
            <MenuItem key="keji">
              <Icon type="appstore"/>科技
            </MenuItem>
            <MenuItem key="shishang">
              <Icon type="appstore"/>时尚
            </MenuItem>

            {userShow}
          </Menu>
          <Modal title="用户中心"
                 visible={modalShow}
                 onOk={this.showModal.bind(this,false)}
                 onCancel={() =>this.showModal(false)}
                 okText="退出">
            <Tabs type="card" onChange={()=> this.props.form.resetFields()}>
              <TabPane tab="登陆" key="1">
                <Form onSubmit={this.handleSubmit.bind(this,true)}>
                  <FormItem label='用户名'>
                    {//获得表单项的包装器,会将input 放到username 里面去
                      getFieldDecorator ('username')(
                        <Input type="text" placeholder="请输入用户名"/>
                      )
                    }
                  </FormItem>
                  <FormItem label='密码'>
                    {
                      getFieldDecorator('password')(
                        <Input type="password" placeholder="请输入密码"/>
                      )
                    }

                  </FormItem>
                  <Button type="primary" htmlType='submit'>登陆</Button>
                </Form>
              </TabPane>
              <TabPane tab="注册" key="2">
                <Form onSubmit={this.handleSubmit.bind(this,false)}>
                  <FormItem label='用户名'>
                    {//获得表单项的包装器,会将input 放到username 里面去
                      getFieldDecorator ('r_userName')(
                        <Input type="text" placeholder="请输入用户名"/>
                      )
                    }
                  </FormItem>
                  <FormItem label='密码'>
                    {
                      getFieldDecorator('r_password')(
                        <Input type="password" placeholder="请输入密码"/>
                      )
                    }
                  </FormItem>
                  <FormItem label='再次确认密码'>
                    {
                      getFieldDecorator('r_confirmpassword')(
                        <Input type="password" placeholder="请再次输入密码"/>
                      )
                    }

                  </FormItem>
                  <Button type="primary" htmlType='submit'>注册</Button>
                </Form>
              </TabPane>

            </Tabs>
          </Modal>
        </Col>
        <Col span={1}></Col>
      </Row>
    )
  }

}

export default Form.create()(NewsHeader)
//注意，Form.create（）（），对newheader进行包装，产生一个新的组件
//向NewHeader 传入了一个属性：form，可以从form得到一些方法
