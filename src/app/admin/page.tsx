'use client';

// TinaCMS Admin Panel
export default function AdminPage() {
  return (
    <div className="admin-layout">
      <div className="admin-content">
        <div className="p-8">
          <h1 className="mb-6 text-3xl font-bold">TinaCMS Admin Panel</h1>
          <p className="mb-4 text-gray-300">
            İçerik yönetimi için TinaCMS admin paneli
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-3 text-xl font-semibold">Ana Sayfa</h3>
              <p className="mb-4 text-gray-400">
                Ana sayfa içeriklerini düzenleyin
              </p>
              <a
                href="/admin#/~"
                className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Düzenle
              </a>
            </div>

            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-3 text-xl font-semibold">Site Ayarları</h3>
              <p className="mb-4 text-gray-400">
                Genel site ayarlarını yönetin
              </p>
              <a
                href="/admin#/collections/settings"
                className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Düzenle
              </a>
            </div>

            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-3 text-xl font-semibold">Haberler</h3>
              <p className="mb-4 text-gray-400">
                Haber ve makalelerinizi yönetin
              </p>
              <a
                href="/admin#/collections/news"
                className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Düzenle
              </a>
            </div>

            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-3 text-xl font-semibold">Oyuncular</h3>
              <p className="mb-4 text-gray-400">Takım oyuncularını yönetin</p>
              <a
                href="/admin#/collections/players"
                className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Düzenle
              </a>
            </div>

            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-3 text-xl font-semibold">Hizmetler</h3>
              <p className="mb-4 text-gray-400">Hizmet sayfalarınızı yönetin</p>
              <a
                href="/admin#/collections/services"
                className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Düzenle
              </a>
            </div>

            <div className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-3 text-xl font-semibold">Maçlar</h3>
              <p className="mb-4 text-gray-400">Maç sonuçlarını yönetin</p>
              <a
                href="/admin#/collections/matches"
                className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
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
