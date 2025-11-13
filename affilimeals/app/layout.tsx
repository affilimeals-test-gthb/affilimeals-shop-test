import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnnouncementBar from '@/components/AnnouncementBar'
export const metadata = { title:'Affilimeals', description:'Influencer x Local Restaurants' }
export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="de">
      <body className="min-h-screen bg-white text-gray-900">
        <AnnouncementBar/>
        <Navbar/>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</main>
        <Footer/>
      </body>
    </html>
  )
}
