import styled from 'styled-components';
import Call from './components/Call';
import Ringing from './components/Ringing';
import JsSIP from 'jssip'
import { useReactMediaRecorder } from "react-media-recorder";
import { Routes, Route } from "react-router-dom";


const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 400px;
  width: 1000px;
  display: flex;
  justify-content: space-between;
`
function App() {

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });
  
  const socket = new JsSIP.WebSocketInterface("wss://sbc03.tel4vn.com:7444")
  var configuration = {
    'uri': '105@2-test1.gcalls.vn:50061',
    'password': 'test1105',
    'session_timers': false,
    sockets: [socket],
  };
  // var incomingCallAudio = new window.Audio('https://code.bandwidth.com/media/incoming_alert.mp3');
  const incomingCallAudio = new window.Audio();
  incomingCallAudio.loop = true;

  const remoteAudio = new window.Audio();
  remoteAudio.autoplay = true;
  
  const callOptions = {
    mediaConstraints: {audio: true, video: false}
  };

  let phone;
  if(configuration.uri && configuration.password){  
      JsSIP.debug.enable('JsSIP:*'); // more detailed debug output
      phone = new JsSIP.UA(configuration);
      phone.on('registrationFailed', function(ev){
          alert('Registering on SIP server failed with error: ' + ev.cause);
        configuration.uri = null;
        configuration.password = null;
      });
      phone.on('newRTCSession',function(ev){
          const newSession = ev.session;
          if(session){ // hangup any existing call
            session.terminate();
          }
          session = newSession;
          const completeSession = function(){
            session = null;
          };
          session.connection.addEventListener("addstream", (e) => {
            console.log("Add stream")
            remoteAudio.srcObject = e.stream
            remoteAudio.play()
            
          })
          session.on('ended', completeSession);
          session.on('failed', completeSession);
          session.on('addstream', function(e){
            incomingCallAudio.pause();
            remoteAudio.src = window.URL.createObjectURL(e.stream);
            remoteAudio.play()
            
          });
          if(session.direction === 'incoming'){
              incomingCallAudio.play();
          }
          
      });
      phone.start();
  }
  
  var session;
  
  const call = (number)=>{
    phone.call(number, callOptions);
  }
  
  const hangup = () => {
    session.terminate();
  };

  const mute = ()=>{
    console.log('MUTE CLICKED');
    if(session.isMuted().audio){
        session.unmute({audio: true});
        remoteAudio.play() 
        console.log('play')
      }else{
        session.mute({audio: true});
        remoteAudio.pause()
        console.log('pause')
    }
  }

  const handleCallPhone =(value)=>{
    call(value)
  }
  const handleCallShop =()=>{
    hangup()
  }
  const handleChangeMute =()=>{
    mute()
  }


  return (
    <Container>
      {/* <div>
        <h2 style={{textAlign: 'center'}}>Infomation</h2>
        <p>Số điện thoại: {number}</p>
        <div>
          <p>Ghi âm cuộc gọi</p>
          <audio id='audio' controls='controls' src={mediaBlobUrl}/>
        </div>
      </div> */}
      
        <Routes>
          <Route path="/" element={<Call call={handleCallPhone}/>}/>
          <Route path="/call" element={<Call call={handleCallPhone}/>}/>
          <Route path="/ringing" element={<Ringing call={call} callStop = {handleCallShop} changeMute = {handleChangeMute} />} />
        </Routes>
    </Container>
  );
}

export default App;
