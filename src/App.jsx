import { Route, Routes } from 'react-router-dom'
import PublicLayout from './components/PublicLayout.jsx'
import AdminLayout from './components/AdminLayout.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Programs from './pages/Programs.jsx'
import ProgramDetail from './pages/ProgramDetail.jsx'
import News from './pages/News.jsx'
import NewsDetail from './pages/NewsDetail.jsx'
import Donate from './pages/Donate.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

import AdminLogin from './pages/admin/Login.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import BannerManager from './pages/admin/BannerManager.jsx'
import ProgramManager from './pages/admin/ProgramManager.jsx'
import NewsManager from './pages/admin/NewsManager.jsx'
import InquiryManager from './pages/admin/InquiryManager.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:id" element={<ProgramDetail />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="banners" element={<BannerManager />} />
        <Route path="programs" element={<ProgramManager />} />
        <Route path="news" element={<NewsManager />} />
        <Route path="inquiries" element={<InquiryManager />} />
      </Route>
    </Routes>
  )
}
