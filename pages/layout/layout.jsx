import Header from './header'
import Footer from './footer'


export default function Layout({ pageProps, children }) {

  return (
    <>
      <Header data={pageProps.header} />
    
      <main>{children}</main>
      <Footer />
    </>
  )
}

