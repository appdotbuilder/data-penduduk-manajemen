import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Resident {
    id: number;
    nik: string;
    nama_lengkap: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    agama: string;
    status_perkawinan: string;
    pekerjaan: string;
    alamat_lengkap: string;
    nomor_telepon?: string;
    email?: string;
    latitude?: number;
    longitude?: number;
    foto_rumah?: string;
    age: number;
    created_at: string;
    updated_at: string;
}

interface PaginatedResidents {
    data: Resident[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url?: string;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    residents: PaginatedResidents;
    search?: string;
    can_manage: boolean;
    [key: string]: unknown;
}

export default function ResidentsIndex({ residents, search = '', can_manage }: Props) {
    const [searchTerm, setSearchTerm] = useState(search);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('residents.index'), { search: searchTerm }, {
            preserveState: true,
            replace: true,
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getGenderBadgeVariant = (gender: string) => {
        return gender === 'Laki-laki' ? 'default' : 'secondary';
    };

    const getMaritalStatusColor = (status: string) => {
        switch (status) {
            case 'Menikah': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'Belum Menikah': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'Cerai Hidup': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'Cerai Mati': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    return (
        <AppShell>
            <Head title="Data Penduduk" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            🏘️ Data Penduduk
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Kelola dan lihat data kependudukan lengkap
                        </p>
                    </div>
                    {can_manage && (
                        <Link href={route('residents.create')}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                ➕ Tambah Penduduk
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Search */}
                <Card>
                    <CardContent className="p-4">
                        <form onSubmit={handleSearch} className="flex gap-4">
                            <Input
                                type="text"
                                placeholder="🔍 Cari berdasarkan NIK, nama, tempat lahir, pekerjaan, alamat..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1"
                            />
                            <Button type="submit" variant="outline">
                                Cari
                            </Button>
                            {search && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => {
                                        setSearchTerm('');
                                        router.get(route('residents.index'));
                                    }}
                                >
                                    Reset
                                </Button>
                            )}
                        </form>
                    </CardContent>
                </Card>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="text-2xl">👥</div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Penduduk</p>
                                    <p className="text-2xl font-bold">{residents.total.toLocaleString('id-ID')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="text-2xl">🗺️</div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Dengan Koordinat</p>
                                    <p className="text-2xl font-bold">
                                        {residents.data.filter(r => r.latitude && r.longitude).length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="text-2xl">📸</div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Dengan Foto</p>
                                    <p className="text-2xl font-bold">
                                        {residents.data.filter(r => r.foto_rumah).length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="text-2xl">📄</div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Halaman Ini</p>
                                    <p className="text-2xl font-bold">{residents.data.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results */}
                {search && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Menampilkan {residents.total} hasil untuk "{search}"
                    </div>
                )}

                {/* Residents List */}
                <div className="grid gap-4">
                    {residents.data.map((resident) => (
                        <Card key={resident.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex flex-col lg:flex-row gap-4">
                                    {/* Main Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                    {resident.nama_lengkap}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    NIK: {resident.nik}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Badge variant={getGenderBadgeVariant(resident.jenis_kelamin)}>
                                                    {resident.jenis_kelamin === 'Laki-laki' ? '👨' : '👩'} {resident.jenis_kelamin}
                                                </Badge>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMaritalStatusColor(resident.status_perkawinan)}`}>
                                                    {resident.status_perkawinan}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-600 dark:text-gray-400">📍 Tempat, Tanggal Lahir:</span>
                                                <p className="font-medium">{resident.tempat_lahir}, {formatDate(resident.tanggal_lahir)} ({resident.age} tahun)</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-600 dark:text-gray-400">🙏 Agama:</span>
                                                <p className="font-medium">{resident.agama}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-600 dark:text-gray-400">💼 Pekerjaan:</span>
                                                <p className="font-medium">{resident.pekerjaan}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-600 dark:text-gray-400">🏠 Alamat:</span>
                                                <p className="font-medium">{resident.alamat_lengkap}</p>
                                            </div>
                                            {resident.nomor_telepon && (
                                                <div>
                                                    <span className="text-gray-600 dark:text-gray-400">📞 Telepon:</span>
                                                    <p className="font-medium">{resident.nomor_telepon}</p>
                                                </div>
                                            )}
                                            {resident.email && (
                                                <div>
                                                    <span className="text-gray-600 dark:text-gray-400">📧 Email:</span>
                                                    <p className="font-medium">{resident.email}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Features indicators */}
                                        <div className="flex gap-2 mt-3">
                                            {resident.latitude && resident.longitude && (
                                                <Badge variant="outline" className="text-xs">
                                                    🗺️ Koordinat GPS
                                                </Badge>
                                            )}
                                            {resident.foto_rumah && (
                                                <Badge variant="outline" className="text-xs">
                                                    📸 Foto Rumah
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-row lg:flex-col gap-2">
                                        <Link href={route('residents.show', resident.id)} className="flex-1 lg:flex-none">
                                            <Button variant="outline" size="sm" className="w-full">
                                                👁️ Lihat
                                            </Button>
                                        </Link>
                                        {can_manage && (
                                            <>
                                                <Link href={route('residents.edit', resident.id)} className="flex-1 lg:flex-none">
                                                    <Button variant="outline" size="sm" className="w-full">
                                                        ✏️ Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => {
                                                        if (confirm(`Yakin ingin menghapus data ${resident.nama_lengkap}?`)) {
                                                            router.delete(route('residents.destroy', resident.id));
                                                        }
                                                    }}
                                                    className="flex-1 lg:flex-none"
                                                >
                                                    🗑️ Hapus
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {residents.data.length === 0 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <div className="text-6xl mb-4">🏘️</div>
                            <h3 className="text-xl font-semibold mb-2">
                                {search ? 'Tidak ada hasil ditemukan' : 'Belum ada data penduduk'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {search 
                                    ? `Tidak ditemukan data penduduk yang cocok dengan "${search}"`
                                    : 'Mulai dengan menambahkan data penduduk pertama'
                                }
                            </p>
                            {!search && can_manage && (
                                <Link href={route('residents.create')}>
                                    <Button>➕ Tambah Penduduk Pertama</Button>
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {residents.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {residents.links.map((link, index) => (
                            <Button
                                key={index}
                                variant={link.active ? "default" : "outline"}
                                size="sm"
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}