import Link from "next/link";
export default function Register(){
    return (<section id="aa-signin">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="aa-signin-area">
            <div className="aa-signin-form">
              <div className="aa-signin-form-title">
                <Link className="aa-property-home" href="/">Quay lại trang chủ</Link>
                <h4>Tạo tài khoản và quản lý bài đăng của bạn</h4>
              </div>
              <form className="contactform">                                                 
                <div className="aa-single-field">
                  <label>Tên <span className="required">*</span></label>
                  <input type="text" 
                    
                  />
                    <span className="custom-error"> 123</span>
                </div>
                <div className="aa-single-field">
                  <label>Email <span className="required">*</span></label>
                  <input type="email"
                 
                  />
                   <span className="custom-error"> 343</span>
                </div>
               
                <div className="aa-single-field">
                  <label >Địa chỉ<span className="required">*</span></label>
                  <input type="text"
                 
                  />
                    <span className="custom-error"> 3434</span>
                </div>
                <div className="aa-single-field">
                  <label >Số điện thoại <span className="required">*</span></label>
                  <input type="text" 
                  
                  />
                  <span className="custom-error">543</span>
                </div>
                <div className="aa-single-field">
                  <label >Mật khẩu <span className="required">*</span></label>
                  <input type="password" 
                 
                  /> 
                   <span className="custom-error"> 3423</span>
                </div>
                <div className="aa-single-field">
                  <label>Nhập lại mật khẩu <span className="required">*</span></label>
                  <input type="password" 
                 
                  /> 
                     <span className="custom-error"> fdfs</span>
                </div>
               {true ?  <span className="custom-error"> *3434</span> : ''}
                <div  className="aa-single-submit">
                  
                  <input type="button" value="Đăng ký"  />                    
                </div>
              
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> );
}