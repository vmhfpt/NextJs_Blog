import { useForm } from "react-hook-form";
import isEmpty from "is-empty";
import { useState, useEffect, useRef } from "react";
import PostService from "../../service/post.service";
import { setValueUser } from "../../redux/reducers/authReducer";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import jwt_decode from "jwt-decode";
import { setIsOnline } from "../../redux/reducers/chatReducer";
import socketIOClient from "socket.io-client";
import CategoryService from "../../service/category.service";
const host = "https://blog.diaocconsole.tk";
export default function Login( {   header }){
  
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const socketRef = useRef();
  useEffect(() => {
      socketRef.current = socketIOClient.connect(host, {path: '/chat/'});
  }, []);
  const onSubmit = async (data) => {
    const result = await PostService.login(data);
  //  console.log(data)
     
     if (result.status === "success") {
      socketRef.current.emit('login',{userId: Number(result.data.id)});
      dispatch(setValueUser({ name: result.data.name, id: Number(result.data.id), email: result.data.email }));
      push('/');
    } else {
      setStatus(result.message);
    }

  }
    return <section className="container-fluid app-contact">
    <div className="container">

      <div className="form-container__app">
        <div className="form-container__app-content">
          <div className="app-contact__right">
            <div className="app-contact__form-title">
              <span>Đăng nhập</span>
            </div>
            <div className="app-contact__form-content">
              <form  onSubmit={handleSubmit(onSubmit)}>

                <input {...register("email", { required: true , pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })} type="email" placeholder="Email của bạn" />
                {errors.email?.type === 'required' &&  <span className="error-form"> * Email không được để trống!</span>}
      {errors.email?.type === 'pattern' && <span className="error-form" >* Email không hợp lệ! </span>}
               
                <input {...register("password", { required: true , pattern: /^[0-9]{8,}$/ })} type="password" placeholder="Mật khẩu" />
                {errors.password?.type === 'required' &&  <span className="error-form"> * Mật khẩu không được để trống!</span>}
      {errors.password?.type === 'pattern' && <span className="error-form" >* Mật khẩu phải bao gồm chữ cái in hoa, thường và số! </span>}

                <button  type="submit">Đăng nhập</button>
                {status && <div className="popup-login">
                    <span>{status}</span>
                  </div>}

                <div className="app-login__socialite">
                  <div className="app-login__socialite-title"><span>Hoặc</span></div>
                  <div id="btn"></div>
                 
                    <div className="app-login__socialite-facebook">
                      Coming soon
                      <i className="fa fa-facebook-official" aria-hidden="true"></i>
                    </div>
                 

                </div>
             
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
}

export async function getServerSideProps(context) {

  const header = await CategoryService.index();
  return { props: {   header } };
}