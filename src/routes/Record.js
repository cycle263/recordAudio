import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import styles from './Record.css';

let audioRecorder = null;
let audioDownload = null

// 下载语音
const downloadAudio = function (blobUrl, filename) {
    const download = filename || 'audio.wav';
    return <a className="audioDownload" href={blobUrl} download={download}><img src="./download.png" alt="download" /></a>;
};

class Record extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            gifShow: 'hidden',
        };
        this.handleRecord = this.handleRecord.bind(this);
        this.handleRecordEnd = this.handleRecordEnd.bind(this);
        this.getAudio = this.getAudio.bind(this);
    }

    handleRecord(){
        this.setState({ gifShow: 'visible' });
        navigator.mediaDevices.getUserMedia({ 
            audio: true
        }).then(function (mediaStream) {
            const audioContext = new AudioContext();    // 语音上下文
            const mediaStreamSource = audioContext.createMediaStreamSource(mediaStream);   // 媒体流音频源
            audioRecorder = new window.Recorder(mediaStreamSource, { numChannels: 1, sampleRate: 16 * 1000 });    // numChannels=1为单声道，sampleRate：采样率
            audioRecorder.record();
        }).catch(function (error) {
            switch (error.code || error.name) {
                case 'PERMISSION_DENIED':
                case 'PermissionDeniedError':
                    if (window.location.protocol === 'http') {
                        message.warn('网络环境不安全，推荐使用https');
                    } else {
                        message.warn('用户拒绝提供录音权限');
                    }
                    break;
                case 'NOT_SUPPORTED_ERROR':
                case 'NotSupportedError':
                    message.warn('浏览器不支持硬件设备。');
                    break;
                case 'MANDATORY_UNSATISFIED_ERROR':
                case 'MandatoryUnsatisfiedError':
                    message.warn('无法发现指定的硬件设备。');
                    break;
                default:
                    message.warn('无法打开麦克风，异常信息:' + (error.code || error.name));
                    break;
            }
        });
    }

    // 录制完语音后的事件处理
    handleRecordEnd () {
        this.setState({ gifShow: false });
        const { match: { params: { tel }}} = this.props;
        if (audioRecorder && audioRecorder.recording) {
            audioRecorder.stop();
            audioRecorder.exportWAV((audioBlob) => {
                const blobUrl = window.URL.createObjectURL(audioBlob);
                audioDownload = <li className={styles.question}><div><span className={styles.audioIcon}>{downloadAudio(blobUrl)}</span></div></li>;
                // audio.src = blobUrl;   // 录音回放
                let fd = new FormData();
                fd.append("file", audioBlob, 'audioBlob');
                fd.append("phone", tel);
                fd.append("acid", 13432433242);
                this.props.dispatch({ type: 'record/uploadAudio', formdata: fd, params: { phone: tel } });
            });
        }
    }

    getAudio(audio_key){
        this.props.dispatch({ type: 'record/getAudio', payload: { audio_key } })
    }

    render() {
        const { gifShow } = this.state;
        const { record: { recordList = [] } } = this.props;
        const textList = recordList.map((record, i) => {
            const audioIconStr = <span className={styles.audioIcon}><img onClick={() => this.getAudio(record.audio_key)} src="./speech.png" alt="speech" /></span>;
            return (
                <li key={i} className={styles[record.type]}><div>{audioIconStr}<span>{record.text}</span></div></li>
            );
        });
        
        return (
            <div className={styles.recordBlock}>
                <ul id={styles.contents}>{textList}</ul>
                <div className={styles.operateBlock}>
                    <img style={{ visibility: gifShow }} id={styles.recordGif} alt="siriGif" src="./siri.gif" />
                    <button id={styles.recordBtn} onMouseDown={this.handleRecord} onMouseUp={this.handleRecordEnd} className="button"></button>
                    <audio id={styles.recordAudio} autoPlay="true"></audio>
                </div>
            </div>
        );
    }
}

Record.propTypes = {
};

export default connect(({ record }) => ({ record }))(Record);
