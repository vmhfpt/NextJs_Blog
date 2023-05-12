import Nav from "../layout/nav";
import Link from "next/link";
import { FaRegEnvelope } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";

import {FaAngleRight} from "react-icons/fa";

import { FaRegClock } from "react-icons/fa";

import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import FooterService from "../../service/footer.service";
import HomeService from "../../service/home.service";
import CategoryService from "../../service/category.service";
export default function About({ data, nav, header }){
    console.log(data);
    return <section className="app-block-center app-category container-fluid">
    <div className="container">
       <div className="app-block-center_content">
           <div className="app-block-center_content-post ">
             
 
              <div className="app-block-detail">
                 <div className="app-block-detail__breadcrumb">
                    <ul>
                       <Link href=""><li className="app-block-detail__breadcrumb-active">Home</li> <FaAngleRight /></Link>
                       <Link href=""><li>{data.result.title}</li></Link>
                    </ul>
                 </div>
                 <div className="app-block-detail__title">
                     <span>Nội dung {data.result.title}</span>
                 </div>
                
 
                 <div className="app-block-detail__share-icon">
                     <div className="app-block-detail__share-icon-share">
                       <FaShareAlt />
                   </div>
 
                   <div className="app-block-detail__share-icon-facebook">
                       <div className="app-block-center__content-category-follow-grid-item bg-fb">
                           <div className="background-socialite__icon">
                               <FaFacebookF />
                           </div>
                           <div className="total-socialite__icon">
                               Facebook
                           </div>
                       </div>
                   </div>
 
                   <div className="app-block-detail__share-icon-twitter">
                       <div className="app-block-center__content-category-follow-grid-item bg-tw">
                           <div className="background-socialite__icon">
                               <FaTwitter />
                           </div>
                           <div className="total-socialite__icon">
                               twitter
                           </div>
 
 
 
 
                       </div>
                   </div>
 
                   <div className="app-block-detail__share-icon-pinterest">
                       <FaPinterestP />
                   </div>
                   <div className="app-block-detail__share-icon-message">
                       <FaRegEnvelope />
                   </div>
                   <div className="app-block-detail__share-icon-add">
                       <FaPlus />
                   </div>
                 </div>
 
                 <div className="app-block-detail__content">
                 <div
                                     className="image_custom"
                                     dangerouslySetInnerHTML={{ __html: data.result.content }}
                                 ></div>
                 </div>
               
 
                  <div className="app-block-detail__share-icon-bottom">
                   <div className="app-block-detail__share-icon-share">
                   <FaShareAlt />
                   </div>
 
                   <div className="app-block-detail__share-icon-facebook">
                       <div className="app-block-center__content-category-follow-grid-item bg-fb">
                           <div className="background-socialite__icon">
                           <FaFacebookF />
                           </div>
                           <div className="total-socialite__icon">
                               Facebook
                           </div>
                       </div>
                   </div>
 
                   <div className="app-block-detail__share-icon-twitter">
                       <div className="app-block-center__content-category-follow-grid-item bg-tw">
                           <div className="background-socialite__icon">
                           <FaTwitter />
                           </div>
                           <div className="total-socialite__icon">
                               twitter
                           </div>
 
 
 
 
                       </div>
                   </div>
 
                   <div className="app-block-detail__share-icon-pinterest">
                   <FaPinterestP />
                   </div>
                   <div className="app-block-detail__share-icon-message">
                   <FaRegEnvelope />
                   </div>
                   <div className="app-block-detail__share-icon-add">
                   <FaPlus />
                   </div>
                  </div>
              </div>
 
              <div className="app-block-center__second-content">
               <div className="app-tab__title green-tab">
                   <div className="app-tab__title-left">
                      <Link href=""><span>Bài viết gợi ý</span></Link>
                   </div>
                   <div className="app-tab__title-right">
                      <Link href=""><span>Xem thêm</span></Link>
                </div>
               </div>
               <div className="app-block-center__second-content-tab">
 
             
               <div className="row">
               {data.post_suggest && data.post_suggest.map((item, key) => (
                     <div key={key} className="col-sm-4">
                     <div className="app-block-center__second-content-item">
                         <div className="app-block-center__second-content-item-image">
                            <img src={ item.thumb} alt="" />
                         </div>
                         <div className="app-block-center__second-content-item-content">
                            <Link href={"/post/"+ item.slug}> <span>{item.title}</span></Link>
                            <Link href={"/post/"+ item.slug}><FaRegClock />  <span className="author">{item.createdAt.slice(0, 10)}</span></Link>
                         </div>
                     </div>
                 </div>
                ))}
                     
                
                 
                  
               </div>
           </div>
              </div>
 
            
 
            
               
             
           </div>
           <div className="app-block-center__content-category ">
              <Nav data={nav}/>
             
           </div>
        </div>
    </div>
 </section>
}

export async function getServerSideProps(context) {
  
   const data = await FooterService.getDetail({slug : context.query.slug});
    const nav = await HomeService.getNav();
    const header = await CategoryService.index();
    return { props: { data, nav, header } };
  }