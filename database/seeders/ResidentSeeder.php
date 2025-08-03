<?php

namespace Database\Seeders;

use App\Models\Resident;
use Illuminate\Database\Seeder;

class ResidentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample residents with Indonesian-specific data
        $residents = [
            [
                'nik' => '3201012501850001',
                'nama_lengkap' => 'Ahmad Wijaya Kusuma',
                'tempat_lahir' => 'Jakarta',
                'tanggal_lahir' => '1985-01-25',
                'jenis_kelamin' => 'Laki-laki',
                'agama' => 'Islam',
                'status_perkawinan' => 'Menikah',
                'pekerjaan' => 'Pegawai Negeri Sipil',
                'alamat_lengkap' => 'Jl. Merdeka No. 123, RT 05/RW 08, Kelurahan Menteng, Kecamatan Menteng, Jakarta Pusat 10310',
                'nomor_telepon' => '081234567890',
                'email' => 'ahmad.wijaya@gmail.com',
                'latitude' => -6.200000,
                'longitude' => 106.816666,
            ],
            [
                'nik' => '3201012502900002',
                'nama_lengkap' => 'Siti Nurhaliza Sari',
                'tempat_lahir' => 'Bandung',
                'tanggal_lahir' => '1990-02-25',
                'jenis_kelamin' => 'Perempuan',
                'agama' => 'Islam',
                'status_perkawinan' => 'Belum Menikah',
                'pekerjaan' => 'Guru',
                'alamat_lengkap' => 'Jl. Asia Afrika No. 45, RT 02/RW 03, Kelurahan Braga, Kecamatan Sumur Bandung, Bandung 40111',
                'nomor_telepon' => '082345678901',
                'email' => 'siti.nurhaliza@yahoo.com',
                'latitude' => -6.917464,
                'longitude' => 107.619123,
            ],
            [
                'nik' => '3201012503880003',
                'nama_lengkap' => 'Budi Santoso Pratama',
                'tempat_lahir' => 'Surabaya',
                'tanggal_lahir' => '1988-03-25',
                'jenis_kelamin' => 'Laki-laki',
                'agama' => 'Kristen',
                'status_perkawinan' => 'Menikah',
                'pekerjaan' => 'Wiraswasta',
                'alamat_lengkap' => 'Jl. Pemuda No. 67, RT 07/RW 04, Kelurahan Embong Kaliasin, Kecamatan Genteng, Surabaya 60271',
                'nomor_telepon' => '083456789012',
                'email' => 'budi.santoso@gmail.com',
                'latitude' => -7.257472,
                'longitude' => 112.752088,
            ],
            [
                'nik' => '3201012504920004',
                'nama_lengkap' => 'Dewi Kartika Putri',
                'tempat_lahir' => 'Yogyakarta',
                'tanggal_lahir' => '1992-04-25',
                'jenis_kelamin' => 'Perempuan',
                'agama' => 'Hindu',
                'status_perkawinan' => 'Cerai Hidup',
                'pekerjaan' => 'Dokter',
                'alamat_lengkap' => 'Jl. Malioboro No. 89, RT 09/RW 06, Kelurahan Sosromenduran, Kecamatan Gedongtengen, Yogyakarta 55271',
                'nomor_telepon' => '084567890123',
            ],
            [
                'nik' => '3201012505950005',
                'nama_lengkap' => 'Eko Prasetyo Nugroho',
                'tempat_lahir' => 'Semarang',
                'tanggal_lahir' => '1995-05-25',
                'jenis_kelamin' => 'Laki-laki',
                'agama' => 'Buddha',
                'status_perkawinan' => 'Belum Menikah',
                'pekerjaan' => 'Software Engineer',
                'alamat_lengkap' => 'Jl. Pandanaran No. 234, RT 11/RW 07, Kelurahan Panjang Baru, Kecamatan Pekalongan Utara, Semarang 50149',
                'nomor_telepon' => '085678901234',
                'email' => 'eko.prasetyo@tech.com',
                'latitude' => -6.966667,
                'longitude' => 110.416664,
            ],
        ];

        foreach ($residents as $residentData) {
            Resident::create($residentData);
        }

        // Create additional random residents
        Resident::factory(25)->create();
    }
}