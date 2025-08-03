import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Sistem Manajemen Data Penduduk">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-white">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-6xl">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="text-2xl">🏘️</div>
                            <span className="font-semibold text-lg">PopuData</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>
                
                <div className="flex w-full items-center justify-center lg:grow">
                    <main className="flex w-full max-w-6xl flex-col lg:flex-row lg:gap-12 items-center">
                        {/* Hero Content */}
                        <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0">
                            <div className="mb-6">
                                <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    🏘️ Sistem Manajemen<br />Data Penduduk
                                </h1>
                                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                                    Platform lengkap untuk mengelola data kependudukan dengan integrasi peta dan foto lokasi
                                </p>
                            </div>

                            {/* Key Features */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-3 p-4 bg-white/80 rounded-lg shadow-sm dark:bg-gray-800/80">
                                    <div className="text-2xl">👤</div>
                                    <div>
                                        <h3 className="font-semibold">Data Lengkap</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">NIK, biodata, kontak</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white/80 rounded-lg shadow-sm dark:bg-gray-800/80">
                                    <div className="text-2xl">🗺️</div>
                                    <div>
                                        <h3 className="font-semibold">Peta Lokasi</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">OpenStreetMap terintegrasi</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white/80 rounded-lg shadow-sm dark:bg-gray-800/80">
                                    <div className="text-2xl">📸</div>
                                    <div>
                                        <h3 className="font-semibold">Foto Rumah</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Upload dan simpan foto</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white/80 rounded-lg shadow-sm dark:bg-gray-800/80">
                                    <div className="text-2xl">🔍</div>
                                    <div>
                                        <h3 className="font-semibold">Pencarian</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Cari berdasarkan berbagai kriteria</p>
                                    </div>
                                </div>
                            </div>

                            {/* Role Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-700">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="text-xl">👨‍💼</div>
                                        <h3 className="font-semibold text-green-800 dark:text-green-300">Admin</h3>
                                    </div>
                                    <p className="text-sm text-green-700 dark:text-green-400">
                                        Akses penuh: tambah, edit, hapus data penduduk dan kelola pengguna
                                    </p>
                                </div>
                                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200 dark:from-blue-900/20 dark:to-cyan-900/20 dark:border-blue-700">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="text-xl">👤</div>
                                        <h3 className="font-semibold text-blue-800 dark:text-blue-300">Pengguna</h3>
                                    </div>
                                    <p className="text-sm text-blue-700 dark:text-blue-400">
                                        Akses terbatas: hanya dapat melihat dan mencari data penduduk
                                    </p>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            {!auth.user && (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-lg font-semibold text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                                    >
                                        <span>🚀</span>
                                        Mulai Sekarang
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-8 py-3 text-lg font-semibold text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                                    >
                                        <span>🔑</span>
                                        Masuk ke Akun
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Hero Image/Mockup */}
                        <div className="flex-1 max-w-lg">
                            <div className="relative">
                                {/* Main Dashboard Mockup */}
                                <div className="bg-white rounded-xl shadow-2xl p-6 dark:bg-gray-800">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Data Penduduk</h3>
                                        <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium dark:bg-green-900 dark:text-green-300">
                                            Active
                                        </div>
                                    </div>
                                    
                                    {/* Sample Data Cards */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                                A
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-800 dark:text-gray-200">Ahmad Wijaya</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">NIK: 3201012345678901</div>
                                            </div>
                                            <div className="text-xs bg-gray-200 px-2 py-1 rounded dark:bg-gray-600 dark:text-gray-300">
                                                📍 Jakarta
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                                            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                                                S
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-800 dark:text-gray-200">Siti Nurhaliza</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">NIK: 3201012345678902</div>
                                            </div>
                                            <div className="text-xs bg-gray-200 px-2 py-1 rounded dark:bg-gray-600 dark:text-gray-300">
                                                📍 Bandung
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                                                B
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-800 dark:text-gray-200">Budi Santoso</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">NIK: 3201012345678903</div>
                                            </div>
                                            <div className="text-xs bg-gray-200 px-2 py-1 rounded dark:bg-gray-600 dark:text-gray-300">
                                                📍 Surabaya
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Stats */}
                                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Total Penduduk</span>
                                            <span className="font-semibold text-gray-800 dark:text-gray-200">1,234</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Floating Elements */}
                                <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-pulse">
                                    🗺️ Peta Aktif
                                </div>
                                <div className="absolute -bottom-4 -left-4 bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-bounce">
                                    📊 Real-time
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                
                <footer className="mt-12 text-sm text-gray-500 dark:text-gray-400">
                    Sistem Manajemen Data Penduduk - Solusi digital untuk administrasi kependudukan
                </footer>
            </div>
        </>
    );
}