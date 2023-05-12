import Link from "next/link";
import { FaRegClock } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import {FaGithub} from "react-icons/fa";
import {FaInstagram} from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
export default function Nav({data}){
    if(!data){
        return (<h1>null data</h1>);
    }
    const postSuggest = data.postSuggest ;
    const commentSuggest = data.commentSuggest;
    const categoryAll = data.categoryAll;
    const tag = data.tag;
    return(<>
         <div className="app-block-center__content-category ">
      <div className="app-block-center__content-category-follow">
           <div className="app-tab__title tab-orange">
            <div className="app-tab__title-left">
               <Link href=""><span>Theo dõi tôi</span></Link>
            </div>
            
           </div>
           <div className="app-block-center__content-category-follow-grid">
               
                <div className="app-block-center__content-category-follow-grid-item bg-fb">
                    <div className="background-socialite__icon">
                        <FaFacebookF />
                    </div>
                    <div className="total-socialite__icon">
                        1.5k
                    </div>
                </div>
               
                <div className="app-block-center__content-category-follow-grid-item bg-tw">
                    <div className="background-socialite__icon">
                        <FaTwitter />
                    </div>
                    <div className="total-socialite__icon">
                        1.5k
                    </div>
  
  
  
  
                </div>
                <div className="app-block-center__content-category-follow-grid-item bg-yt">
                    <div className="background-socialite__icon">
                        <FaYoutube />
                    </div>
                    <div className="total-socialite__icon">
                        1.5k
                    </div>
                </div>
                <div className="app-block-center__content-category-follow-grid-item bg-gi">
                    <div className="background-socialite__icon">
                       <FaGithub />
  
                    
                    </div>
                    <div className="total-socialite__icon">
                        1.5k
                    </div>
                </div>
                <div className="app-block-center__content-category-follow-grid-item bg-in">
                    <div className="background-socialite__icon">
                        <FaLinkedinIn />
  
                      
                    </div>
                    <div className="total-socialite__icon">
                        1.5k
                    </div>
                </div>
                <div className="app-block-center__content-category-follow-grid-item bg-is ">
                    <div className="background-socialite__icon">
                    <FaInstagram />
  
                        
                    </div>
                    <div className="total-socialite__icon">
                        1.5k
                    </div>
                </div>
        </div>
      </div>
      
      <div className="app-block-center__content-category-popular">
        <div className="app-tab__title tab-orange">
            <div className="app-tab__title-left">
               <Link href=""><span>Đề xuất</span></Link>
            </div>
            
        </div>
        <div className="app-block-center__content-category-popular-list">
            <div className="app-block-center_content-post-flex-item ">
                <div className="app-block-center_content-post-flex-item-news">
                  
                {postSuggest && postSuggest.map((item, key) => (
                     <div key={key} className="app-block-center_content-post-flex-news-item">
                     <div className="app-block-center_content-post-flex-news-item-image">
                         <img src={item.thumb} alt="" />
                         
                     </div>
                     <div className="app-block-center_content-post-flex-news-item-content">
                          <div className="app-block-center_content-post-flex-news-item-title">
                             <Link href={"/post/" + item.slug}><span>{item.title}</span></Link>
                          </div>
                          <div className="app-block-center_content-post-flex-news-item-detail">
                             <Link href=""><FaRegClock /> <span>{item.createdAt.slice(0, 10)}</span></Link>
                          </div>
                     </div>
                 </div>
                  ))}
                  
                   
                </div>
            </div>
        </div>
       
      </div>
  
      <div className="app-block-center__content-category-comment">
        <div className="app-tab__title tab-orange">
            <div className="app-tab__title-left">
               <Link href=""><span>Bình luận mới</span></Link>
            </div>
            
        </div>
        <div className="app-block-center__content-category-comment-list">
            
        {commentSuggest && commentSuggest.map((item, key) => (
             <div key={key} className="app-block-center__content-category-comment-list-item">
             <div className="app-block-center__content-category-comment-list-item-image">
                 <img src="https://4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/w55-h55-p-k-no-nu/avatar.jpg" alt="" />
             </div>
             <div className="app-block-center__content-category-comment-list-item-content">
                 <div className="app-block-center__content-category-comment-list-item-content-title">
                     <Link href={"/post/" + item.Post.slug + "#cmt"} > <span>{item.name}</span></Link>
                 </div>
                 <div className="app-block-center__content-category-comment-list-item-content-detail">
                    <Link href={"/post/" + item.Post.slug + "#cmt"}> <span>{item.content}</span></Link>
                 </div>
             </div>
         </div>
          ))}
           
        </div>
      </div>
  
  
      <div className="app-block-center__content-category-right">
        <div className="app-tab__title tab-orange">
            <div className="app-tab__title-left">
               <Link href=""><span>Danh mục</span></Link>
            </div>
            
        </div>
        <div className="app-block-center__content-category-right-list">
          
        {categoryAll.map((item, key) => (
                <div key={key} className="app-block-center__content-category-right-list-item">
                <div className="app-block-center__content-category-right-list-item-title">
                    <Link href={"/category/" + item.slug}><span>{item.title}</span></Link>
                </div>
                <div className="app-block-center__content-category-right-list-item-quantity">
                    <span>{item.Posts.length}</span>
                </div>
            </div>
        ))}
         
        
           
        </div>
      </div>
  
      <div className="app-block-center__content-category-tag">
        <div className="app-tab__title tab-orange">
            <div className="app-tab__title-left">
               <Link href=""><span>Tags</span></Link>
            </div>
        </div>
        <div className="app-block-center__content-category-tag-list">
  
      
        {tag.map((item, key) => (
             <Link key={key} href={"/tag/" +  item.slug}>   <div className="app-block-center__content-category-tag-list-item">
             {item.title}
         </div> </Link>
        ))}
       
        </div>
      </div>
      
    </div>
      </>);
}

