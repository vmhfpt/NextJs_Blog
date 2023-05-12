import Image from "next/image";
import iconTyping from "../../public/typing.gif";
import Link from "next/link";
import { FaBolt } from "react-icons/fa";

import {IoSendSharp}  from "react-icons/io5";



import isEmpty from "is-empty";
import { getDataUser } from "../../redux/select/selectUser";
import { useGetFromStore } from "../../hook/customHook";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { setValueUser } from "../../redux/reducers/authReducer";
import { getList } from "../../redux/reducers/chatReducer";
import socketIOClient from "socket.io-client";
import { getDataChat, getIsOnline } from "../../redux/select/selectChat";
import { setChat } from "../../redux/reducers/chatReducer";
import { setAlert } from "../../redux/reducers/chatReducer";

import { setShowTab } from "../../redux/reducers/chatReducer";
import { getDataShowTab } from "../../redux/select/selectChat";
const host = "https://blog.diaocconsole.tk";
export default function Chat() {
    var temp = useRef(1);
    const tabCheck = useGetFromStore(getDataShowTab);

    const [isOnline, setIsOnline ] = useState({});
    const [typing, setTyping] = useState(false);
  //  const isOnline = useSelector(getIsOnline);
    const [message, setMessage] = useState("");

    const socketRef = useRef();
    const dataUserRef = useRef();
    
    const dataChat = useGetFromStore(getDataChat);
    const dataUser = useGetFromStore(getDataUser);
    dataUserRef.current = dataUser;
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (tabCheck === true) {
            temp.current = 1;
            dispatch(setAlert(0));
        } else {
            temp.current = 1;
        }
    }, [tabCheck]);
    useEffect(() => {
        if(!isEmpty(dataUserRef.current)){
            // console.log(">> login", dataUserRef.current);
               socketRef.current.emit('login', { userId: dataUserRef.current.id });
            }
    }, [dataUserRef.current]);
    useEffect(() => {

        socketRef.current = socketIOClient.connect(host, { path: '/chat/' });
        dispatch(getList());

        if (dataChat && dataChat.length !== 0) {
            scrollToBottom("chat");
        }
      
       
        socketRef.current.on("sendDataServer", (item) => {
          
            const data = {
                thumb : item.thumb,
                name: item.name,
                content: item.content,
                user_id: item.id,
                createdAt: item.createdAt
            }

            dispatch(setChat(data));
            dispatch(setAlert(temp.current++));

            scrollToBottom("chat");

        });
        socketRef.current.on("sendDataServerOnline", (item) => {
            //dispatch(setIsOnline(item.users));
            setIsOnline(item.users);

        });
        socketRef.current.on("sendDataServerTyping", (item) => {
         
            if (item.length === 1 && item.includes(String(dataUserRef.current.id))) {
                setTyping(false);
            } else {
                if (item.length >= 1) {
                    setTyping(true);
                    scrollToBottom("chat");
                } else {
                    setTyping(false);
                }
            }


        });
        
        return () => {
            socketRef.current.disconnect();
        };
    }, []);



    const checkOnline = (id) => {

        let exists = Object.values(isOnline).includes(Number(id));
        return (exists);
    }

   
    const postMessage = () => {
        const ccs = dataUser.name;
        const lls = dataUser.id;
        
      
        if (message !== "" && message[0] !== " ") {
            const msg = {
                name: ccs,
                content: message,
                id: Number(lls),
                thumb :  dataUser.thumb ?  dataUser.thumb : null
            };
            setMessage("");
            socketRef.current.emit("sendDataClient", msg);
            socketRef.current.emit("sendDataClientTyping", null);

        }

    }
    const onEnterPress = (e) => {

        if (e.keyCode === 13 && e.shiftKey === false) {
            postMessage();
        }
    };
    const onTyping = () => {

        if (message !== '') {
            socketRef.current.emit("sendDataClientTyping", dataUser.id);
        } else {
            socketRef.current.emit("sendDataClientTyping", null);
        }

    };

    const scrollToBottom = (id) => {
        setTimeout(() => {
            const element = document.getElementById(id);
           if(element){
            element.scrollTop = element.scrollHeight;
           }
        }, 100);
    };
    function getTimeCurrent(date) {
      
        let diffTime = Math.abs(new Date().valueOf() - new Date(date).valueOf());
        let days = diffTime / (24 * 60 * 60 * 1000);
        let hours = (days % 1) * 24;
        let minutes = (hours % 1) * 60;
        let secs = (minutes % 1) * 60;
        [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]


        if (days !== 0) {
            return `${days} ngày trước`;
        } else if (hours !== 0) {
            return `${hours} giờ trước`;
        } else if (minutes !== 0) {
            return `${minutes} phút trước`;
        } else {
            return `${secs} giây trước`;
        }

    }
    
    useEffect(() => {
      
        
        if (!isEmpty(dataUser)) {
            var myInterval =  setInterval(() => {
                const select = document.getElementsByClassName("time-current");
                for (var i = 0; i < select.length; i++) {
                   var dataDate = (select[i].getAttribute('data-chat')).replaceAll(".000Z", "");
                    select[i].innerText = getTimeCurrent(dataDate);
                }
            }, 1000);
        }
      return () => {
        clearInterval(myInterval);
      }
 
    }, [dataUser]);




    ////////////////////////////////////////////////

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [errorName, setErrorName] = useState(() => {
        if (!isEmpty(dataUser)) {
            return "";
        } else {
            return "* Bắt buộc";
        }
    });
    const [errorEmail, setErrorEmail] = useState(() => {
        if (!isEmpty(dataUser)) {
            return "";
        } else {
            return "* Bắt buộc";
        }
    });
    const [errorNumber, setErrorNumber] = useState(() => {
        if (!isEmpty(dataUser)) {
            return "";
        } else {
            return "* Bắt buộc";
        }
    });
    const emailValidation = (value) => {
        
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (regex.test(value) === false) {
            setErrorEmail("* Email không hợp lệ");
        } else {
            setErrorEmail("");
        }
    };

    const handleName = (e) => {
        
        setName(e.target.value);
    
        if (e.target.value === "" || e.target.value[0] === " ") {
          setErrorName("* Tên không được để trống");
        } else if((e.target.value).length <= 8 || (e.target.value).length >= 20){
            setErrorName("* Tên phải từ 8 đến 20 ký tự");
        }else {
          setErrorName("");
        }
      };
    const handleEmail = (e) => {
      
        setEmail(e.target.value);
        if (e.target.value === "") {
            setErrorEmail("* Email không được để trống");
        } else {
            emailValidation(e.target.value);
        }
    };
    const handleNumber = (e) => {
        const regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        setNumber(e.target.value);
        if (e.target.value === "" || e.target.value[0] === " ") {
          setErrorNumber("* Số điện thoại không được để trống");
        }else if(regex.test(e.target.value) === false) {
            setErrorNumber("* Số điện thoại không hợp lệ");
        }else {
          setErrorNumber("");
        }
      };


    const handleSubmit = () => {
    //(errorEmail === '' && errorName === '' && errorNumber === '' )
        if ( errorEmail === '' && errorName === '' && errorNumber === '') {


            if (isEmpty(dataUser)) {
                const randomId = Math.floor(100000 + Math.random() * 900000);
              //  console.log({ userId: randomId });
                socketRef.current.emit('login', { userId: randomId });
                setErrorEmail("* Bắt buộc");
                setErrorName("* Bắt buộc");
                setErrorNumber("* Bắt buộc");
                setName('');
                setEmail('');
                setNumber('');
                dispatch(setValueUser({
                    name: name,
                    email: email,
                    number: number,
                    id: randomId
                }));
               
                scrollToBottom("chat");

            }



        }

    }
    
    return (<div className="app-chat__content">

        <div className="app-chat__container">
            <div className="app-chat__tab">
                {!isEmpty(dataUser) && <>
                    <div className="app-chat__tab-image ">
                        <div className="app-chat__tab-image-name">
                         
                            {dataUser.thumb ? <img src={dataUser.thumb} alt="" /> : <div>
                                {dataUser.name[(dataUser.name).lastIndexOf(" ") + 1]}
                            </div>}
                            <div className="app-chat__tab-image-point">

                            </div>
                        </div>
                    </div>
                    <div className="app-chat__tab-name ">
                        <div className="app-chat__tab-name-title">
                            <span>{dataUser.name} (Bạn)</span>
                        </div>
                        <div className="app-chat__tab-name-status">
                            <span>Đang hoạt động</span>
                        </div>
                    </div>
                </>}
                {isEmpty(dataUser) && <>
                    <div className="app-chat__tab-image ">
                        <div className="app-chat__tab-image-name">
                            <div>
                                <FaBolt />
                            </div>

                        </div>
                    </div>
                    <div className="app-chat__tab-quick-start">
                        <span>Trò chuyện nhanh</span>
                    </div>
                </>}

                <div onClick={() => dispatch(setShowTab(false))} className="app-chat__tab-close ">
                    <div>
                        &times;
                    </div>
                </div>
            </div>

            {!isEmpty(dataUser) && <>
                <div className="app-chat__detail" id="chat">


                    {dataChat && dataChat.map((item, key) => {
                        if (Number(item.user_id) === Number(dataUser.id)) {
                            return (<div key={key} className="app-chat__detail-item">
                                <div className="app-chat__detail-item-flex">
                                    <div className="app-chat__detail-my-chat-image"></div>
                                    <div className="app-chat__detail-my-chat-content">
                                        <span> {item.content}</span>
                                    </div>
                                </div>
                                <div className="app-chat__detail-someone-date-my-chat">
                                    <div><span className="time-current" data-chat={item.createdAt}>--:--</span></div>
                                </div>
                            </div>);
                        } else {
                            return (<div key={key} className="app-chat__detail-item">
                                <div className="app-chat__detail-someone">
                                    <div className="app-chat__detail-someone-name">
                                        <div className={item.user_id === 2 ? "app-chat__detail-someone-name-char border-admin" : "app-chat__detail-someone-name-char"}>
                                            <div>
                                                {/*item.name[(item.name).lastIndexOf(" ") + 1]*/}
                                                {item.thumb ? <img src={item.thumb} alt="" /> : item.name[(item.name).lastIndexOf(" ") + 1]}
                                                
                                            </div>
                                            {item.user_id === 2 ? <div className="app-chat__supper-admin">
                                                AD
                                            </div> : ''}
                                            <div className={checkOnline(item.user_id) ? "app-chat__is-online" : "app-chat__is-offline"}>

                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="app-chat__detail-someone-name">
                                            <span>{item.name}</span>
                                        </div>
                                        <div className={item.user_id === 2 ? "app-chat__detail-someone-content bg-admin" : "app-chat__detail-someone-content"} >
                                            <span> {item.content}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="app-chat__detail-someone-date-someone">
                                    <div><span className="time-current" data-chat={item.createdAt} >--:--</span></div>
                                </div>
                            </div>);
                        }
                    })}
                    {typing && <div className="app-chat__detail-item">
                        <div className="app-chat__detail-someone">
                            <div className="app-chat__detail-text-typing">
                                <span>Ai đó đang nhập </span>
                            </div>
                            <div>

                                <div className="app-chat__detail-typing">
                                    <Image style={{ height : "auto"}}  src={iconTyping} alt="" />
                                </div>
                            </div>
                        </div>

                    </div>}



                </div>
                <div className="app-chat__post-comment">
                    <div className="app-chat__post-comment-input ">
                        <input
                            onKeyUp={onTyping}
                            onKeyDown={onEnterPress}
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            type="text" placeholder="Aa" />
                    </div>
                    <div className="app-chat__post-comment-button " onClick={() => postMessage()}>
                        <div>
                           <IoSendSharp />
                        </div>
                    </div>
                </div>
            </>}

            {isEmpty(dataUser) && <div className="app-chat__tab-register">
                <form >
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group ">
                                <label>Tên *</label>
                                <input
                                    value={name}
                                    onChange={(e) => handleName(e)}
                                    type="text" placeholder="Nhập tên" />
                                <span>{errorName}</span>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group ">
                                <label>Email *</label>
                                <input
                                    value={email}
                                    onChange={(e) => handleEmail(e)}
                                    type="email" placeholder="Nhập email" />
                                <span>{errorEmail}</span>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group ">
                                <label>Số điện thoại *</label>
                                <input
                                    value={number}
                                    onChange={(e) => handleNumber(e)}
                                    type="number" placeholder="Nhập số điện thoại" />
                                <span>{errorNumber}</span>
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className="row">
                            <div className="col-sm-6 col-6">
                            <button onClick={() => handleSubmit()} type="button" className="app-chat__tab-button-register">Đăng ký</button>
                            </div>
                            <div className="col-sm-6 col-6">
                             <Link href="/user/login"><button onClick={() => dispatch(setShowTab(false))} type="button" className="app-chat__tab-button-register">Đăng nhập nhanh</button></Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>}





        </div>
    </div>);
}