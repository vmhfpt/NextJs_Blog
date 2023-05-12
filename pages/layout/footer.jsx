import Link from "next/link";
import React from "react";
import Image from "next/image";
import { FaArrowUp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import {FaGithub} from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import {FaInstagram} from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import Logo from "../../public/logo.png";
import url from "../../public/200w.gif";
import { animateScroll as scroll } from 'react-scroll';
import Chat from "./chat";
import { useGetFromStore } from "../../hook/customHook";
import { useState, useEffect } from "react";
import { getDataAlert } from "./selectChat";
import { getDataShowTab } from "./selectChat";
import { useDispatch, useSelector } from "react-redux";
import { setShowTab } from "./chatReducer";
import Draggable from 'react-draggable';
import { setAlert } from "./chatReducer";
import { getDataUser } from "../user/selectUser";
import isEmpty from "is-empty";
export default function Footer(){
    const dataUser = useGetFromStore(getDataUser);
    const nodeRef = React.useRef(null)
    const dispatch = useDispatch();
    const tabCheck = useGetFromStore(getDataShowTab);
    const totalAlert = useGetFromStore(getDataAlert);
    const showChat = useGetFromStore(getDataShowTab);
    
    const eventHandler = (e, data) => {
        if(e.type === "touchmove")   dispatch(setShowTab(false));
        if(e.type === "touchend") {
          dispatch(setShowTab(true));
          setTimeout(() => {
              
              const element = document.getElementById("chat");
              if(element){
                
                element.scrollTop = element.scrollHeight;
              }
             
              
          }, 200);
        } 
          
        }
        const handleShowChat = () => {
            dispatch(setShowTab(!showChat));
            setTimeout(() => {
                const element = document.getElementById("chat");
                if(element){
                    element.scrollTop = element.scrollHeight;
                  }
    
            }, 200);
        }
        useEffect(() => {
            const element = document.getElementById("chat");
                if(element){
                    element.scrollTop = element.scrollHeight;
                  }
            dispatch(setAlert(0));
        }, [tabCheck]);

    const [visible, setVisible] = useState(false);
    const toTop = () => {
        scroll.scrollToTop();
    };

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    }
    useEffect(() => {
        if (Number(totalAlert) !== 0 && showChat === false) {
            Notification.requestPermission().then(function (permission) {

                let title = "Blog Vũ Minh Hùng";
                let icon = 'https://st.quantrimang.com/photos/image/2020/11/06/cuon-sach-300-bai-code-thieu-nhi-va-nhung-mau-chuyen-vui-cua-anh-em-coder.jpg';
                let body = "Bạn có một tin nhắn mới";

                var notification = new Notification(title, { body, icon });
            });
        }
    }, [totalAlert])
   useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
   }, [])
    return (<footer className="app-header">
      
        {visible && <div onClick={() => toTop()} className="back-to-top">
        <FaArrowUp />

        </div>}
       
        
        <Draggable
       
       onMouseDown={eventHandler}
       onStart={eventHandler}
       onDrag={eventHandler}
       onStop={eventHandler}
       nodeRef={nodeRef}
        > 
        <div  ref={nodeRef}   onClick={handleShowChat}  className="chat-now">
        <Image style={{ height : "auto"}} src={url} alt="" />
         
            {!showChat && totalAlert && !isEmpty(dataUser) !== 0 ?  <div className="chat-total__notify">
                {totalAlert}
</div> : ''}
        </div>
      </Draggable>
    
        
        <div className="app-header__about container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 col-sm-12 col-md-3 ">
                        <div className="app-header__about-logo">

                            <div>
                                <Image style={{ height : "auto"}} src={Logo} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 col-sm-12 col-md-5 ">
                        <div className="app-header__about-content">
                            <span className="footer-title">Giới thiệu</span>
                            <p>Trang blog tâm sự, chia sẻ mẹo hay, thủ thuật lập trình, chịu trách nhiệm nội dung bài viết, bản quyền thuộc về tác giả console.log("copy and paste"). </p>
                            <p>BLOG AT  <a href="https://wordpress.com/">WORDPRESS.COM</a></p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-12 col-md-4 ">
                        <div className="app-header__about-socialite-flex">


                            <div className="app-header__about-socialite">
                                <span className="footer-title">Theo dõi tôi</span>
                                <ul className="app-header__about-socialite-icon">
                                    <Link href=""><li className="fa-hover"><FaFacebookF /></li></Link>
                                    <Link href=""><li className="tw-hover"><FaTwitter /></li></Link>
                                    <Link href=""><li className="yo-hover"><FaYoutube /></li></Link>
                                    <Link href=""><li className="git-hover"><FaGithub /></li></Link>

                                    <Link href=""><li className="in-hover"><FaInstagram /></li></Link>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="app-header__nav container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12">

                        <div className="app-header__nav-left">
                            <Link href=""><span>Design by - Blogger Templates</span></Link>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="app-header__nav-right">
                            <ul>
                                <Link href="/"><li>Trang chủ</li></Link>
                                <Link href="/about/ve-toi"><li>Nội quy</li></Link>
                                <Link href="/about/chinh-sach"><li>Chính sách</li></Link>
                                <Link href="/contact"><li>Liên hệ</li></Link>
                                <Link href="/profile"><li>Về tôi</li></Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div  className={showChat ? "show-app__chat" : "hidden-app__chat"}>
            <Chat />
        </div>


    </footer>);
}