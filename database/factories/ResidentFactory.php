<?php

namespace Database\Factories;

use App\Models\Resident;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Resident>
 */
class ResidentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Resident>
     */
    protected $model = Resident::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $cities = [
            'Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Makassar', 'Palembang',
            'Tangerang', 'Depok', 'Bekasi', 'Batam', 'Bogor', 'Pekanbaru', 'Bandar Lampung'
        ];

        $jobs = [
            'Pegawai Negeri Sipil', 'Karyawan Swasta', 'Wiraswasta', 'Petani', 'Pedagang',
            'Guru', 'Dokter', 'Perawat', 'Sopir', 'Tukang', 'Ibu Rumah Tangga', 'Mahasiswa',
            'Pensiunan', 'Buruh', 'Nelayan'
        ];

        return [
            'nik' => $this->faker->numerify('##############'),
            'nama_lengkap' => $this->faker->name(),
            'tempat_lahir' => $this->faker->randomElement($cities),
            'tanggal_lahir' => $this->faker->dateTimeBetween('-80 years', '-17 years')->format('Y-m-d'),
            'jenis_kelamin' => $this->faker->randomElement(['Laki-laki', 'Perempuan']),
            'agama' => $this->faker->randomElement(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']),
            'status_perkawinan' => $this->faker->randomElement(['Belum Menikah', 'Menikah', 'Cerai Hidup', 'Cerai Mati']),
            'pekerjaan' => $this->faker->randomElement($jobs),
            'alamat_lengkap' => $this->faker->address(),
            'nomor_telepon' => $this->faker->optional(0.8)->phoneNumber(),
            'email' => $this->faker->optional(0.6)->safeEmail(),
            'latitude' => $this->faker->optional(0.5)->latitude(-11, 6), // Indonesia coordinates
            'longitude' => $this->faker->optional(0.5)->longitude(95, 141), // Indonesia coordinates
        ];
    }

    /**
     * Create a resident with coordinates.
     */
    public function withCoordinates(): static
    {
        return $this->state(fn (array $attributes) => [
            'latitude' => $this->faker->latitude(-11, 6),
            'longitude' => $this->faker->longitude(95, 141),
        ]);
    }

    /**
     * Create a male resident.
     */
    public function male(): static
    {
        return $this->state(fn (array $attributes) => [
            'jenis_kelamin' => 'Laki-laki',
        ]);
    }

    /**
     * Create a female resident.
     */
    public function female(): static
    {
        return $this->state(fn (array $attributes) => [
            'jenis_kelamin' => 'Perempuan',
        ]);
    }
}