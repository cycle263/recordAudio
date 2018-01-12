import React from 'react';
import { connect } from 'dva';
import { Button, Input, message } from 'antd';
import styles from './Index.css';

class Index extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      tel: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeTel = this.handleChangeTel.bind(this);
  }

  handleChangeTel(e) {
    const tel = e.target.value.trim();
    this.setState({ tel });
  }

  handleSubmit() {
    const { history } = this.props;
    const { tel } = this.state;
    if (!(/^1[3|4|5|7|8]\d{9}$/.test(tel))) {
      message.error('请输入正确格式的手机号码');
    } else {
      history.push(`/record/${tel}`);
    }
  }

  render() {
    return (
      <div className={styles.telContainer}>
        <h1 className={styles.title}>欢迎使用语音</h1>
        <label className={styles.telLine}>
          <span>电话 (<i style={{ color: 'red', verticalAlign: 'sub'}}>*</i>)：</span>
          <Input onChange={this.handleChangeTel}/>
        </label>
        <div className={styles.submitLine}>
          <Button type="button" onClick={this.handleSubmit}>提交</Button>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
};

export default connect()(Index);
