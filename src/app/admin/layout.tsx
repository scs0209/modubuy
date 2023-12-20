import { Sidebar } from '../components/admin/SideBar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid lg:grid-cols-5">
      <Sidebar />
      {children}
    </div>
  )
}

export default Layout
