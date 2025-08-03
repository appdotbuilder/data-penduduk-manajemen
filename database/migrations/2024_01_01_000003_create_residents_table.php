<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('residents', function (Blueprint $table) {
            $table->id();
            $table->string('nik', 16)->unique()->comment('Nomor Induk Kependudukan (16 digits)');
            $table->string('nama_lengkap')->comment('Full name of the resident');
            $table->string('tempat_lahir')->comment('Place of birth');
            $table->date('tanggal_lahir')->comment('Date of birth');
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan'])->comment('Gender');
            $table->enum('agama', ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'])->comment('Religion');
            $table->enum('status_perkawinan', ['Belum Menikah', 'Menikah', 'Cerai Hidup', 'Cerai Mati'])->comment('Marital status');
            $table->string('pekerjaan')->comment('Occupation/job');
            $table->text('alamat_lengkap')->comment('Complete address');
            $table->string('nomor_telepon', 15)->nullable()->comment('Phone number');
            $table->string('email')->nullable()->comment('Email address');
            $table->decimal('latitude', 10, 8)->nullable()->comment('GPS latitude coordinate');
            $table->decimal('longitude', 11, 8)->nullable()->comment('GPS longitude coordinate');
            $table->string('foto_rumah')->nullable()->comment('House photo file path');
            $table->timestamps();
            
            // Indexes for better performance
            $table->index('nik');
            $table->index('nama_lengkap');
            $table->index(['tempat_lahir', 'tanggal_lahir']);
            $table->index('jenis_kelamin');
            $table->index('agama');
            $table->index('status_perkawinan');
            $table->index('pekerjaan');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('residents');
    }
};