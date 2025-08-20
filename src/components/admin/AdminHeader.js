'use client';

import { Bell, Search, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminHeader() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Ara..."
              className="w-64 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 pl-10 pr-4 py-2 text-sm focus:border-gaming-primary focus:outline-none focus:ring-2 focus:ring-gaming-primary/20"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
          </Button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Admin User
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                admin@aimagency.com
              </p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="h-8 w-8 rounded-full bg-gaming-primary flex items-center justify-center">
                <User className="h-4 w-4 text-gaming-dark" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}