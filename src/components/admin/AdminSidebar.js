'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Users,
  Calendar,
  Trophy,
  Settings,
  Image,
  MessageSquare,
  BarChart3,
  Gamepad2,
  Home,
  LogOut
} from 'lucide-react';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'İçerik Yönetimi',
    icon: FileText,
    children: [
      { title: 'Haberler', href: '/admin/content/news', icon: FileText },
      { title: 'Oyuncular', href: '/admin/content/players', icon: Users },
      { title: 'Maçlar', href: '/admin/content/matches', icon: Calendar },
      { title: 'Hizmetler', href: '/admin/content/services', icon: Trophy },
    ],
  },
  {
    title: 'Sayfa Yönetimi',
    icon: LayoutDashboard,
    children: [
      { title: 'Sayfalar', href: '/admin/pages', icon: FileText },
      { title: 'Sayfa Oluşturucu', href: '/admin/page-builder', icon: LayoutDashboard },
      { title: 'Menü Yönetimi', href: '/admin/navigation', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Medya',
    href: '/admin/media',
    icon: Image,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'Ayarlar',
    icon: Settings,
    children: [
      { title: 'Genel Ayarlar', href: '/admin/settings/general', icon: Settings },
      { title: 'SEO Ayarları', href: '/admin/settings/seo', icon: BarChart3 },
      { title: 'Görünüm', href: '/admin/settings/appearance', icon: Image },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="admin-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-gray-700 px-6">
          <Link href="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-8 w-8 text-gaming-primary" />
            <span className="text-xl font-bold text-white">AIM Agency</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              item={item}
              pathname={pathname}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-700 p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Ana Siteye Git</span>
          </Link>
          <button className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
            <LogOut className="h-5 w-5" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ item, pathname }) {
  const Icon = item.icon;
  const isActive = pathname === item.href;
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <div className="space-y-1">
        <div className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-300">
          <Icon className="h-5 w-5" />
          <span className="font-medium">{item.title}</span>
        </div>
        <div className="ml-6 space-y-1">
          {item.children.map((child, index) => {
            const ChildIcon = child.icon;
            const isChildActive = pathname === child.href;
            return (
              <Link
                key={index}
                href={child.href}
                className={cn(
                  'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  isChildActive
                    ? 'bg-gaming-primary text-gaming-dark font-medium'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                )}
              >
                <ChildIcon className="h-4 w-4" />
                <span>{child.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors',
        isActive
          ? 'bg-gaming-primary text-gaming-dark font-medium'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{item.title}</span>
    </Link>
  );
}