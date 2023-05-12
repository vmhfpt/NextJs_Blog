import Link from "next/link";
import Nav from "../layout/nav";
import { FaRegClock } from "react-icons/fa";
import {FaUser} from "react-icons/fa";
import HomeService from "../../service/home.service";
import CategoryService from "../../service/category.service";
export default function Tag({ data, nav, header }){
    const paginate = data.paginate;
    return  <section className="app-block-center app-category container-fluid">
    <div className="container">
       <div className="app-block-center_content">
         <div className="app-block-center_content-post ">
             

             <div className="app-block-center__third-content">
              <div className="app-block-detail__breadcrumb breadcrumb-category">
                  <ul>
                     <Link href=""><li className="app-block-detail__breadcrumb-active">Home</li> <i className="fa fa-angle-right" aria-hidden="true"></i></Link>

                     <Link href=""><li >Tag</li> <i className="fa fa-angle-right" aria-hidden="true"></i></Link>
                     <Link href=""><li>{ data.tag.title}</li></Link>
                  </ul>
               </div>
              <div className="app-tab__title tab-orange">
                  <div className="app-tab__title-left">
                     <Link href=""><span>{ data.tag.title}</span></Link>
                  </div>
                  <div className="app-tab__title-right">
                     <Link href=""><span>Xêm thêm</span></Link>
               </div>
              </div>
               <div className="app-post-tag__grid">

               
               {data.result && data.result.map((item, key) => (
                   <div key={key} className="app-post-tag__grid_item">
                   <div className="app-post-tag__grid_item-image">
                       <img src={ item.Post.thumb} alt="" />
                   </div>
                   <div className="app-post-tag__grid_item-content">
                        <div className="app-post-tag__grid_item-content-title">
                           <Link href={"/post/" + item.Post.slug}> <span>{item.Post.title}</span></Link>
                        </div>
                        <div className="app-post-tag__grid_item-content-author">
                           <div className="app-block-center__third-content-item-detail-author">
                               <span><FaUser /> {item.Post.User.name}</span>
                               <span><FaRegClock />  {item.Post.createdAt.slice(0, 10)}</span>
                           </div>
                        </div>
                        <div className="app-post-tag__grid_item-content-description">
                            <Link href={"/post/" + item.Post.slug}><p>{item.Post.description}</p></Link>
                        </div>
                   </div>
               </div>
               ))}
               
                  


               </div>


                <div className="app-block-center__third-content-show-more">
                {paginate.next_page &&  <Link  href={{
                        pathname: '/tag/' + data.category.slug,
                        query: { page: paginate.next_page },
                    }}>  <button >Xem thêm ({paginate.total_item - data.result.length}) bài viết</button></Link>}
                </div>
             </div>

            

           
              
            
          </div> {false ? 
                                   <div className="delay-icon">
                                         <div className="center-delay-icon">
                                             <i className=" fa fa-spinner fa-spin"></i>
                                         </div>
                                   </div>
                                 : ""}
           
           <Nav data={nav}/>
        </div>
    </div>
 </section> 
}

export async function getServerSideProps(context) {
    var page = context.query["page"];
    page = page ? page : 1;
    const data = await CategoryService.getPostByTag({page : page, slug : context.query.slug});
    const nav = await HomeService.getNav();
    const header = await CategoryService.index();
    return { props: { data, nav, header } };
  }