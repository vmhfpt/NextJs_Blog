import Link from "next/link";
import Nav from "../layout/nav";
import {FaAngleRight} from "react-icons/fa";
export default function Search(){
    return <section className="app-block-center app-category container-fluid">
    <div className="container">
       <div className="app-block-center_content">
           <div className="app-block-center_content-post ">
             
  
              <div className="app-block-center__third-content">
               <div className="app-block-detail__breadcrumb breadcrumb-category">
                   <ul>
                      <Link href=""><li className="app-block-detail__breadcrumb-active">Home</li> <FaAngleRight /></Link>
  
                      <Link href=""><li >Tìm kiếm</li> <FaAngleRight /></Link>
                      <Link href=""><li>name key search</li></Link>
                   </ul>
                </div>
               <div className="app-tab__title tab-orange">
                   <div className="app-tab__title-left">
                      <Link href=""><span>Kết quả tìm kiếm tổng (3) bài</span></Link>
                   </div>
                   <div className="app-tab__title-right">
                      <Link href=""><span>Xêm thêm</span></Link>
                </div>
               </div>
                <div className="app-post-tag__grid">
  
                
                    <div  className="app-post-tag__grid_item">
                    <div className="app-post-tag__grid_item-image">
                        <img src="https://baoninhbinh.org.vn//DATA/ARTICLES/2021/5/17/cuoc-dua-lot-vao-top-100-anh-dep-di-san-van-hoa-va-thien-7edf3.jpg" alt="" />
                    </div>
                    <div className="app-post-tag__grid_item-content">
                         <div className="app-post-tag__grid_item-content-title">
                            <Link href=""> <span>this is title of post</span></Link>
                         </div>
                         <div className="app-post-tag__grid_item-content-author">
                            <div className="app-block-center__third-content-item-detail-author">
                                <span><i className="fa fa-user-o" aria-hidden="true"></i> Vu Minh Hung</span>
                                <span><i className="fa fa-clock-o" aria-hidden="true"></i>  20/11/2020</span>
                            </div>
                         </div>
                         <div className="app-post-tag__grid_item-content-description">
                             <Link href=""><p>this is description for post</p></Link>
                         </div>
                    </div>
                </div>
                
                   
  
  
                </div>
  
  
                 <div className="app-block-center__third-content-show-more">
                 <button >Xem thêm 4 bài viết</button>
                 </div>
              </div>
  
             
  
            
               
             
           </div>
           <Nav />
        </div>
    </div>
  </section>
}