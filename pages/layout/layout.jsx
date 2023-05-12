import Header from './header'
import Footer from './footer'


export default function Layout({ pageProps, children }) {
  let datas = pageProps && pageProps.header ? pageProps.header : false;
  return (
    <>
      <Header data={datas} />
    
      <main>{children}</main>
      <Footer />
    </>
  )
}

