import Link from "next/link";
import Image from 'next/image';
import Logo from '../../public/logo.png';
import {FaBars} from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { getDataUser } from "../user/selectUser";
import { useGetFromStore } from "../../hook/customHook";
import isEmpty from "is-empty";
import { setValueUser } from "../user/authReducer";
import { useDispatch } from "react-redux";
export default function Header({data}){
  const dispatch = useDispatch();
  const dataUser = useGetFromStore(getDataUser);
  if(dataUser != undefined){
     if(isEmpty(dataUser)){
      //console.log('chua dang nhap');
     }else {
     // console.log(dataUser)
     }
  }
  const logOut = () => {
    dispatch(setValueUser({}));
  }
    return(
        <>
      <div  id="over-flow"></div>
      <header id="navbar" className="app-footer container-fluid">
        <div className="container">
          <div className="app-footer__content ">
            <div  className="app-footer__content-nav-icon">
              <FaBars />
            </div>
            <div className="app-footer__content-logo ">
              <div>
                <Image style={{ height : "auto"}} src={Logo} alt="" />
              </div>
            </div>
            <div id="animate-scroll__nav" className="app-footer__content-nav  ">
              <div className="app-footer__content-nav-tab">
                <div className="app-footer__content-nav-tab-item">
                  <Link href="/"> <Image style={{ height : "auto"}} src={Logo} alt="" /></Link>
                </div>
                <div className="app-footer__content-nav-tab-item">
                  <i  className="fa fa-times" aria-hidden="true"></i>
                </div>
              </div>
              <ul>
                <Link  href="/"><li>Trang chủ</li></Link>
                {data && data.map((item, key) => (
                  <Link  key={key} href={"/category/" + item.slug}><li>{item.title}</li></Link>
                ))}
                <Link  href="/profile"><li>Về tôi</li></Link>
                
                {isEmpty(dataUser) ? <Link  href="/user/login"><li>Đăng nhập</li></Link> : <li className="app-sign-out__icon" onClick={() => logOut()}>{dataUser.name} <FaSignInAlt /></li>}
              </ul>
            </div>
            <div className="app-footer__content-search ">
              <FaSearch />

           


            </div>
          </div>
        </div>
      </header>
    </>
    );

    
}
