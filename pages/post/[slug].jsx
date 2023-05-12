import Link from "next/link";
import Nav from "../layout/nav";
import Comment from "./comment";
import HomeService from "../../service/home.service";
import CategoryService from "../../service/category.service";
import PostService from "../../service/post.service";
import { useDispatch } from "react-redux";
import { setComments } from "../../redux/reducers/authReducer";
import {
    
    FacebookShareButton,
   
    PinterestShareButton,
  
    TelegramShareButton,
   
    TwitterShareButton,
    
  } from "react-share";
  import { FaShareAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import {FaAngleRight} from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import {FaUser} from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export default function Post({ data, nav, header }){
    const dispatch = useDispatch();
    
    dispatch(setComments(data.result.Post_comments));
 //   console.log(data);
    return (<section className="app-block-center app-category container-fluid">
    <div className="container">
        <div className="app-block-center_content">
         
            <div className="app-block-center_content-post ">


                <div className="app-block-detail">
                    <div className="app-block-detail__breadcrumb">
                        <ul>
                            <Link href=""><li className="app-block-detail__breadcrumb-active">Home</li> <FaAngleRight /> </Link>
                            <Link href=""><li >Chi tiết bài viết</li> <FaAngleRight /> </Link>
                            <Link href=""><li>{data.result.title}</li></Link>
                        </ul>
                    </div>
                    <div className="app-block-detail__title">
                        <span>{data.result.title}</span>
                    </div>
                    <div className="app-block-detail__author">
                        <ul>
                            <li><FaUser /> {data.result.User.name}</li>
                            <li><FaRegClock /> {data.result.createdAt.slice(0, 10)}</li>
                            <Link href=""><li><FaRegComment /> 2 Bình luận</li></Link>
                        </ul>
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
                                
                                <FacebookShareButton  className="share">
                                <div className="total-socialite__icon">
                                    Facebook
                                </div>
                               </FacebookShareButton>
                            </div>
                        </div>

                        <div className="app-block-detail__share-icon-twitter">
                            <div className="app-block-center__content-category-follow-grid-item bg-tw">
                                <div className="background-socialite__icon">
                                    <FaTwitter />
                                </div>

                                <TwitterShareButton 
                                
                                 
                                >
                                <div className="total-socialite__icon">
                                    twitter
                                </div>
                                </TwitterShareButton>
                              




                            </div>
                        </div>

                        <PinterestShareButton  description="">
                        <div className="app-block-detail__share-icon-pinterest">
                            <FaPinterestP  />
                        </div>
                     </PinterestShareButton>
                       

                     <TelegramShareButton   >
                     <div className="app-block-detail__share-icon-message">
                     <FaTelegramPlane  />

                        </div>
                    </TelegramShareButton>
                     
                      
                      
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
                    <div className="app-block-center__content-category-tag-list">
                        
                    {data.tag.map((item, key) => (
                                    <Link key={key} href={"/tag/" + item.slug}>   <div className="app-block-center__content-category-tag-list-item ">
                                        {item.title}
                                    </div> </Link>
                                ))}
                      


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
                                
                                <FacebookShareButton  className="share">
                                <div className="total-socialite__icon">
                                    Facebook
                                </div>
                               </FacebookShareButton>
                            </div>
                        </div>

                        <div className="app-block-detail__share-icon-twitter">
                            <div className="app-block-center__content-category-follow-grid-item bg-tw">
                                <div className="background-socialite__icon">
                                <FaTwitter />
                                </div>

                                <TwitterShareButton 
                                
                                 
                                >
                                <div className="total-socialite__icon">
                                    twitter
                                </div>
                                </TwitterShareButton>
                              




                            </div>
                        </div>

                        <PinterestShareButton description="">
                        <div className="app-block-detail__share-icon-pinterest">
                        <FaPinterestP  />
                        </div>
                     </PinterestShareButton>
                       

                     <TelegramShareButton   >
                     <div className="app-block-detail__share-icon-message">
                     <FaTelegramPlane  />

                        </div>
                    </TelegramShareButton>
                     
                      
                      
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
                            <Link href=""><span>Show more</span></Link>
                        </div>
                    </div>
                    <div className="app-block-center__second-content-tab">


                        <div className="row">
                         
                        {data && data.postSuggest.map((item, key) => (
                                        <div key={key} className="col-sm-4">
                                            <div className="app-block-center__second-content-item">
                                                <div className="app-block-center__second-content-item-image">
                                                    <img src={ item.Post.thumb} alt="" />
                                                </div>
                                                <div className="app-block-center__second-content-item-content">
                                                    <Link href={"/post/" + item.Post.slug}> <span>{item.Post.title}</span></Link>
                                                    <Link href=""><FaRegClock  /> <span className="author">{item.Post.createdAt.slice(0, 10)}</span></Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                          


                        </div>
                    </div>
                </div>

             
            <Comment  data={data.result.Post_comments} id={data.result.id}/>



            </div> 
                        
            <Nav data={nav}/>
        </div>
    </div>
</section> );
}
export async function getServerSideProps({params}) {
    //console.log(params.slug)
    const data = await PostService.show({slug : params.slug});
    const nav = await HomeService.getNav();
    const header = await CategoryService.index();
    return { props: { data, nav, header } };
  }