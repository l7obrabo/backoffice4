
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  UserRound, 
  Home, 
  CalendarClock, 
  ClipboardCheck, 
  Package, 
  ShoppingBag, 
  Wrench, 
  ImageIcon, 
  HeadphonesIcon,
  LogOut
} from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
}

const NavItem = ({ icon, label, path, active }: NavItemProps) => {
  return (
    <Link to={path} className={`flex items-center gap-3 px-4 py-2.5 rounded-md ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
      {icon}
      <span className="text-sm">{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Users size={18} />, label: 'Users', path: '/users' },
    { icon: <Building2 size={18} />, label: 'Companies', path: '/companies' },
    { icon: <UserRound size={18} />, label: 'Customer', path: '/customer' },
    { icon: <Home size={18} />, label: 'Houses', path: '/houses' },
    { icon: <CalendarClock size={18} />, label: 'Booking', path: '/booking' },
    { icon: <ClipboardCheck size={18} />, label: 'Pre-orders', path: '/pre-orders' },
    { icon: <Package size={18} />, label: 'Product', path: '/product' },
    { icon: <ShoppingBag size={18} />, label: 'Orders', path: '/orders' },
    { icon: <Wrench size={18} />, label: 'Maintenance', path: '/maintenance' },
    { icon: <ImageIcon size={18} />, label: 'App Images', path: '/app-images' },
    { icon: <HeadphonesIcon size={18} />, label: 'Support', path: '/support' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo */}
      <div className="px-6 py-4 border-b">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white rounded p-1">
            <Home size={16} />
          </div>
          <span className="font-semibold text-blue-600">EpicTrip</span>
        </Link>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavItem 
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            active={currentPath === item.path}
          />
        ))}
      </div>
      
      {/* Logout */}
      <div className="p-4 border-t">
        <button className="flex items-center gap-3 px-4 py-2 w-full text-left text-gray-600 hover:bg-gray-100 rounded-md">
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
