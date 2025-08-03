<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

/**
 * App\Models\Resident
 *
 * @property int $id
 * @property string $nik
 * @property string $nama_lengkap
 * @property string $tempat_lahir
 * @property \Illuminate\Support\Carbon $tanggal_lahir
 * @property string $jenis_kelamin
 * @property string $agama
 * @property string $status_perkawinan
 * @property string $pekerjaan
 * @property string $alamat_lengkap
 * @property string|null $nomor_telepon
 * @property string|null $email
 * @property float|null $latitude
 * @property float|null $longitude
 * @property string|null $foto_rumah
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Resident newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Resident newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Resident query()
 * @method static \Illuminate\Database\Eloquent\Builder|Resident whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Resident whereNik($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Resident whereNamaLengkap($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Resident whereTempatLahir($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Resident whereTanggalLahir($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Resident whereJenisKelamin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Resident whereAgama($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Resident whereStatusPerkawinan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Resident wherePekerjaan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Resident whereAlamatLengkap($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Resident whereNomorTelepon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Resident whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Resident whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Resident whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Resident whereFotoRumah($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Resident whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Resident whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Resident search($term)
 * @method static \Database\Factories\ResidentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Resident extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nik',
        'nama_lengkap',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'agama',
        'status_perkawinan',
        'pekerjaan',
        'alamat_lengkap',
        'nomor_telepon',
        'email',
        'latitude',
        'longitude',
        'foto_rumah',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tanggal_lahir' => 'date',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'residents';

    /**
     * Scope a query to search residents by multiple fields.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $term
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearch(Builder $query, string $term): Builder
    {
        return $query->where(function ($q) use ($term) {
            $q->where('nik', 'like', '%' . $term . '%')
              ->orWhere('nama_lengkap', 'like', '%' . $term . '%')
              ->orWhere('tempat_lahir', 'like', '%' . $term . '%')
              ->orWhere('pekerjaan', 'like', '%' . $term . '%')
              ->orWhere('alamat_lengkap', 'like', '%' . $term . '%')
              ->orWhere('nomor_telepon', 'like', '%' . $term . '%')
              ->orWhere('email', 'like', '%' . $term . '%');
        });
    }

    /**
     * Get the full name attribute.
     *
     * @return string
     */
    public function getFullNameAttribute(): string
    {
        return $this->nama_lengkap;
    }

    /**
     * Get the age based on birth date.
     *
     * @return int
     */
    public function getAgeAttribute(): int
    {
        return (int) $this->tanggal_lahir->diffInYears(now());
    }

    /**
     * Check if resident has coordinates.
     *
     * @return bool
     */
    public function hasCoordinates(): bool
    {
        return !is_null($this->latitude) && !is_null($this->longitude);
    }

    /**
     * Check if resident has house photo.
     *
     * @return bool
     */
    public function hasHousePhoto(): bool
    {
        return !is_null($this->foto_rumah);
    }
}