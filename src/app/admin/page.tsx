'use client';

import { TinaCMS, TinaProvider } from 'tinacms';
import { TinaFieldProvider } from '@tinacms/form-builder';
import { useTina } from 'tinacms/dist/react';

// TinaCMS Admin Panel
export default function AdminPage() {
  return (
    <div className="admin-layout">
      <div className="admin-content">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">TinaCMS Admin Panel</h1>
          <p className="text-gray-300 mb-4">
            İçerik yönetimi için TinaCMS admin paneli
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Ana Sayfa</h3>
              <p className="text-gray-400 mb-4">Ana sayfa içeriklerini düzenleyin</p>
              <a 
                href="/admin#/~" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
              >
                Düzenle
              </a>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Site Ayarları</h3>
              <p className="text-gray-400 mb-4">Genel site ayarlarını yönetin</p>
              <a 
                href="/admin#/collections/settings" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
              >
                Düzenle
              </a>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Haberler</h3>
              <p className="text-gray-400 mb-4">Haber ve makalelerinizi yönetin</p>
              <a 
                href="/admin#/collections/news" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
              >
                Düzenle
              </a>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Oyuncular</h3>
              <p className="text-gray-400 mb-4">Takım oyuncularını yönetin</p>
              <a 
                href="/admin#/collections/players" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
              >
                Düzenle
              </a>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Hizmetler</h3>
              <p className="text-gray-400 mb-4">Hizmet sayfalarınızı yönetin</p>
              <a 
                href="/admin#/collections/services" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
              >
                Düzenle
              </a>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Maçlar</h3>
              <p className="text-gray-400 mb-4">Maç sonuçlarını yönetin</p>
              <a 
                href="/admin#/collections/matches" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
              >
                Düzenle
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}