import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CreateResident() {
    const { data, setData, post, processing, errors } = useForm({
        nik: '',
        nama_lengkap: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        agama: '',
        status_perkawinan: '',
        pekerjaan: '',
        alamat_lengkap: '',
        nomor_telepon: '',
        email: '',
        latitude: '',
        longitude: '',
        foto_rumah: null as File | null,
    });

    const [mapClickEnabled, setMapClickEnabled] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('residents.store'));
    };

    const handleMapClick = () => {
        setMapClickEnabled(!mapClickEnabled);
        if (!mapClickEnabled) {
            // Simulate getting coordinates (in real app, would use actual map)
            const lat = (-7.0 + Math.random() * 4).toFixed(6); // Indonesia latitude range
            const lng = (110.0 + Math.random() * 10).toFixed(6); // Indonesia longitude range
            setData(prev => ({
                ...prev,
                latitude: lat,
                longitude: lng,
            }));
        }
    };

    const clearCoordinates = () => {
        setData(prev => ({
            ...prev,
            latitude: '',
            longitude: '',
        }));
        setMapClickEnabled(false);
    };

    return (
        <AppShell>
            <Head title="Tambah Data Penduduk" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            ➕ Tambah Data Penduduk
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Masukkan informasi lengkap penduduk baru
                        </p>
                    </div>
                    <Link href={route('residents.index')}>
                        <Button variant="outline">
                            ← Kembali ke Daftar
                        </Button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                                    <Label htmlFor="nik">NIK *</Label>
                                    <Input
                                        id="nik"
                                        type="text"
                                        value={data.nik}
                                        onChange={e => setData('nik', e.target.value)}
                                        placeholder="16 digit nomor NIK"
                                        maxLength={16}
                                        className={errors.nik ? 'border-red-500' : ''}
                                    />
                                    {errors.nik && <p className="text-sm text-red-600 mt-1">{errors.nik}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="nama_lengkap">Nama Lengkap *</Label>
                                    <Input
                                        id="nama_lengkap"
                                        type="text"
                                        value={data.nama_lengkap}
                                        onChange={e => setData('nama_lengkap', e.target.value)}
                                        placeholder="Nama lengkap sesuai KTP"
                                        className={errors.nama_lengkap ? 'border-red-500' : ''}
                                    />
                                    {errors.nama_lengkap && <p className="text-sm text-red-600 mt-1">{errors.nama_lengkap}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="tempat_lahir">Tempat Lahir *</Label>
                                    <Input
                                        id="tempat_lahir"
                                        type="text"
                                        value={data.tempat_lahir}
                                        onChange={e => setData('tempat_lahir', e.target.value)}
                                        placeholder="Kota/Kabupaten tempat lahir"
                                        className={errors.tempat_lahir ? 'border-red-500' : ''}
                                    />
                                    {errors.tempat_lahir && <p className="text-sm text-red-600 mt-1">{errors.tempat_lahir}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="tanggal_lahir">Tanggal Lahir *</Label>
                                    <Input
                                        id="tanggal_lahir"
                                        type="date"
                                        value={data.tanggal_lahir}
                                        onChange={e => setData('tanggal_lahir', e.target.value)}
                                        className={errors.tanggal_lahir ? 'border-red-500' : ''}
                                    />
                                    {errors.tanggal_lahir && <p className="text-sm text-red-600 mt-1">{errors.tanggal_lahir}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="jenis_kelamin">Jenis Kelamin *</Label>
                                    <Select 
                                        value={data.jenis_kelamin} 
                                        onValueChange={value => setData('jenis_kelamin', value)}
                                    >
                                        <SelectTrigger className={errors.jenis_kelamin ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih jenis kelamin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Laki-laki">👨 Laki-laki</SelectItem>
                                            <SelectItem value="Perempuan">👩 Perempuan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.jenis_kelamin && <p className="text-sm text-red-600 mt-1">{errors.jenis_kelamin}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="agama">Agama *</Label>
                                    <Select 
                                        value={data.agama} 
                                        onValueChange={value => setData('agama', value)}
                                    >
                                        <SelectTrigger className={errors.agama ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih agama" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Islam">🕌 Islam</SelectItem>
                                            <SelectItem value="Kristen">⛪ Kristen</SelectItem>
                                            <SelectItem value="Katolik">✝️ Katolik</SelectItem>
                                            <SelectItem value="Hindu">🕉️ Hindu</SelectItem>
                                            <SelectItem value="Buddha">☸️ Buddha</SelectItem>
                                            <SelectItem value="Konghucu">☯️ Konghucu</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.agama && <p className="text-sm text-red-600 mt-1">{errors.agama}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="status_perkawinan">Status Perkawinan *</Label>
                                    <Select 
                                        value={data.status_perkawinan} 
                                        onValueChange={value => setData('status_perkawinan', value)}
                                    >
                                        <SelectTrigger className={errors.status_perkawinan ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih status perkawinan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Belum Menikah">💙 Belum Menikah</SelectItem>
                                            <SelectItem value="Menikah">💚 Menikah</SelectItem>
                                            <SelectItem value="Cerai Hidup">💛 Cerai Hidup</SelectItem>
                                            <SelectItem value="Cerai Mati">🖤 Cerai Mati</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status_perkawinan && <p className="text-sm text-red-600 mt-1">{errors.status_perkawinan}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="pekerjaan">Pekerjaan *</Label>
                                    <Input
                                        id="pekerjaan"
                                        type="text"
                                        value={data.pekerjaan}
                                        onChange={e => setData('pekerjaan', e.target.value)}
                                        placeholder="Pekerjaan/profesi"
                                        className={errors.pekerjaan ? 'border-red-500' : ''}
                                    />
                                    {errors.pekerjaan && <p className="text-sm text-red-600 mt-1">{errors.pekerjaan}</p>}
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
                                <Label htmlFor="alamat_lengkap">Alamat Lengkap *</Label>
                                <Textarea
                                    id="alamat_lengkap"
                                    value={data.alamat_lengkap}
                                    onChange={e => setData('alamat_lengkap', e.target.value)}
                                    placeholder="Alamat lengkap sesuai KTP"
                                    rows={3}
                                    className={errors.alamat_lengkap ? 'border-red-500' : ''}
                                />
                                {errors.alamat_lengkap && <p className="text-sm text-red-600 mt-1">{errors.alamat_lengkap}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="nomor_telepon">Nomor Telepon</Label>
                                    <Input
                                        id="nomor_telepon"
                                        type="tel"
                                        value={data.nomor_telepon}
                                        onChange={e => setData('nomor_telepon', e.target.value)}
                                        placeholder="Nomor telepon/HP"
                                        className={errors.nomor_telepon ? 'border-red-500' : ''}
                                    />
                                    {errors.nomor_telepon && <p className="text-sm text-red-600 mt-1">{errors.nomor_telepon}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="Alamat email"
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Location & Photo */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                🏠 Lokasi dan Foto Rumah
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Map Simulation */}
                            <div>
                                <Label>Koordinat GPS (Opsional)</Label>
                                <div className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-600">
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">🗺️</div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                            Klik tombol untuk mensimulasikan pengambilan koordinat GPS
                                        </p>
                                        {data.latitude && data.longitude ? (
                                            <div className="mb-3 p-2 bg-green-100 rounded dark:bg-green-900">
                                                <p className="text-sm font-medium text-green-800 dark:text-green-300">
                                                    📍 Koordinat: {data.latitude}, {data.longitude}
                                                </p>
                                            </div>
                                        ) : null}
                                        <div className="flex gap-2 justify-center">
                                            <Button
                                                type="button"
                                                variant={mapClickEnabled ? "default" : "outline"}
                                                onClick={handleMapClick}
                                            >
                                                {mapClickEnabled ? '📍 Ambil Koordinat' : '🗺️ Aktifkan Peta'}
                                            </Button>
                                            {(data.latitude || data.longitude) && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={clearCoordinates}
                                                >
                                                    🗑️ Hapus
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {(errors.latitude || errors.longitude) && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.latitude || errors.longitude}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="foto_rumah">Foto Rumah (Opsional)</Label>
                                <Input
                                    id="foto_rumah"
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setData('foto_rumah', e.target.files?.[0] || null)}
                                    className={errors.foto_rumah ? 'border-red-500' : ''}
                                />
                                {errors.foto_rumah && <p className="text-sm text-red-600 mt-1">{errors.foto_rumah}</p>}
                                <p className="text-sm text-gray-500 mt-1">
                                    Format: JPEG, PNG, JPG, GIF. Maksimal 2MB.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex gap-4">
                        <Button 
                            type="submit" 
                            className="bg-blue-600 hover:bg-blue-700 flex-1 md:flex-none"
                            disabled={processing}
                        >
                            {processing ? '⏳ Menyimpan...' : '💾 Simpan Data Penduduk'}
                        </Button>
                        <Link href={route('residents.index')}>
                            <Button type="button" variant="outline">
                                ❌ Batal
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}