import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

interface Props {
    resident: Resident;
    can_manage: boolean;
    [key: string]: unknown;
}

export default function ShowResident({ resident, can_manage }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
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

    const openMapLocation = () => {
        if (resident.latitude && resident.longitude) {
            const url = `https://www.openstreetmap.org/?mlat=${resident.latitude}&mlon=${resident.longitude}&zoom=15#map=15/${resident.latitude}/${resident.longitude}`;
            window.open(url, '_blank');
        }
    };

    const viewPhoto = () => {
        if (resident.foto_rumah) {
            window.open(`/storage/${resident.foto_rumah}`, '_blank');
        }
    };

    return (
        <AppShell>
            <Head title={`${resident.nama_lengkap} - Data Penduduk`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            👤 {resident.nama_lengkap}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            NIK: {resident.nik}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('residents.index')}>
                            <Button variant="outline">
                                ← Kembali ke Daftar
                            </Button>
                        </Link>
                        {can_manage && (
                            <>
                                <Link href={route('residents.edit', resident.id)}>
                                    <Button variant="outline">
                                        ✏️ Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        if (confirm(`Yakin ingin menghapus data ${resident.nama_lengkap}?`)) {
                                            router.delete(route('residents.destroy', resident.id));
                                        }
                                    }}
                                >
                                    🗑️ Hapus
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    👤 Informasi Pribadi
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Nama Lengkap</label>
                                        <p className="text-lg font-semibold">{resident.nama_lengkap}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">NIK</label>
                                        <p className="text-lg font-mono">{resident.nik}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Tempat, Tanggal Lahir</label>
                                        <p className="text-lg">
                                            {resident.tempat_lahir}, {formatDate(resident.tanggal_lahir)}
                                        </p>
                                        <p className="text-sm text-gray-500">Usia: {resident.age} tahun</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Jenis Kelamin</label>
                                        <div className="mt-1">
                                            <Badge variant={getGenderBadgeVariant(resident.jenis_kelamin)}>
                                                {resident.jenis_kelamin === 'Laki-laki' ? '👨' : '👩'} {resident.jenis_kelamin}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Agama</label>
                                        <p className="text-lg flex items-center gap-2">
                                            <span>
                                                {resident.agama === 'Islam' && '🕌'}
                                                {resident.agama === 'Kristen' && '⛪'}
                                                {resident.agama === 'Katolik' && '✝️'}
                                                {resident.agama === 'Hindu' && '🕉️'}
                                                {resident.agama === 'Buddha' && '☸️'}
                                                {resident.agama === 'Konghucu' && '☯️'}
                                            </span>
                                            {resident.agama}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Status Perkawinan</label>
                                        <div className="mt-1">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMaritalStatusColor(resident.status_perkawinan)}`}>
                                                {resident.status_perkawinan}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Pekerjaan</label>
                                        <p className="text-lg">💼 {resident.pekerjaan}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    📞 Informasi Kontak
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Alamat Lengkap</label>
                                    <p className="text-lg mt-1 p-3 bg-gray-50 rounded-lg dark:bg-gray-800">
                                        🏠 {resident.alamat_lengkap}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {resident.nomor_telepon && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Nomor Telepon</label>
                                            <p className="text-lg">📞 {resident.nomor_telepon}</p>
                                        </div>
                                    )}

                                    {resident.email && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
                                            <p className="text-lg">📧 {resident.email}</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Location Card */}
                        {resident.latitude && resident.longitude && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        🗺️ Lokasi GPS
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-green-50 rounded-lg dark:bg-green-900/20">
                                            <p className="text-sm font-medium text-green-800 dark:text-green-300">
                                                📍 Koordinat tersedia
                                            </p>
                                            <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-mono">
                                                {resident.latitude}, {resident.longitude}
                                            </p>
                                        </div>
                                        <Button
                                            onClick={openMapLocation}
                                            className="w-full"
                                            variant="outline"
                                        >
                                            🌍 Buka di OpenStreetMap
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Photo Card */}
                        {resident.foto_rumah && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        📸 Foto Rumah
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
                                            <img
                                                src={`/storage/${resident.foto_rumah}`}
                                                alt="Foto rumah"
                                                className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                                                onClick={viewPhoto}
                                            />
                                        </div>
                                        <Button
                                            onClick={viewPhoto}
                                            className="w-full"
                                            variant="outline"
                                        >
                                            🔍 Lihat Foto Penuh
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Info Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    ℹ️ Informasi Sistem
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Dibuat</label>
                                    <p className="text-sm">{formatDateTime(resident.created_at)}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Diperbarui</label>
                                    <p className="text-sm">{formatDateTime(resident.updated_at)}</p>
                                </div>

                                {/* Features Status */}
                                <div className="pt-3 border-t">
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">Status Fitur</label>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Koordinat GPS</span>
                                            {resident.latitude && resident.longitude ? (
                                                <Badge variant="default" className="text-xs">✅ Ada</Badge>
                                            ) : (
                                                <Badge variant="secondary" className="text-xs">❌ Tidak</Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Foto Rumah</span>
                                            {resident.foto_rumah ? (
                                                <Badge variant="default" className="text-xs">✅ Ada</Badge>
                                            ) : (
                                                <Badge variant="secondary" className="text-xs">❌ Tidak</Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Nomor Telepon</span>
                                            {resident.nomor_telepon ? (
                                                <Badge variant="default" className="text-xs">✅ Ada</Badge>
                                            ) : (
                                                <Badge variant="secondary" className="text-xs">❌ Tidak</Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Email</span>
                                            {resident.email ? (
                                                <Badge variant="default" className="text-xs">✅ Ada</Badge>
                                            ) : (
                                                <Badge variant="secondary" className="text-xs">❌ Tidak</Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}