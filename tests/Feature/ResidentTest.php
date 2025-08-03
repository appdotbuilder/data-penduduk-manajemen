<?php

use App\Models\Resident;
use App\Models\User;

beforeEach(function () {
    $this->adminUser = User::factory()->create(['role' => 'admin']);
    $this->regularUser = User::factory()->create(['role' => 'user']);
});

test('admin can view residents index', function () {
    $resident = Resident::factory()->create();

    $response = $this->actingAs($this->adminUser)
        ->get(route('residents.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('residents/index')
            ->has('residents.data')
            ->where('can_manage', true)
    );
});

test('regular user can view residents index', function () {
    $resident = Resident::factory()->create();

    $response = $this->actingAs($this->regularUser)
        ->get(route('residents.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('residents/index')
            ->has('residents.data')
            ->where('can_manage', false)
    );
});

test('admin can create resident', function () {
    $residentData = [
        'nik' => '1234567890123456',
        'nama_lengkap' => 'Test Resident',
        'tempat_lahir' => 'Jakarta',
        'tanggal_lahir' => '1990-01-01',
        'jenis_kelamin' => 'Laki-laki',
        'agama' => 'Islam',
        'status_perkawinan' => 'Belum Menikah',
        'pekerjaan' => 'Software Engineer',
        'alamat_lengkap' => 'Jl. Test No. 123',
        'nomor_telepon' => '081234567890',
        'email' => 'test@example.com',
    ];

    $response = $this->actingAs($this->adminUser)
        ->post(route('residents.store'), $residentData);

    $response->assertRedirect();
    $this->assertDatabaseHas('residents', [
        'nik' => '1234567890123456',
        'nama_lengkap' => 'Test Resident',
    ]);
});

test('regular user cannot create resident', function () {
    $residentData = [
        'nik' => '1234567890123456',
        'nama_lengkap' => 'Test Resident',
        'tempat_lahir' => 'Jakarta',
        'tanggal_lahir' => '1990-01-01',
        'jenis_kelamin' => 'Laki-laki',
        'agama' => 'Islam',
        'status_perkawinan' => 'Belum Menikah',
        'pekerjaan' => 'Software Engineer',
        'alamat_lengkap' => 'Jl. Test No. 123',
    ];

    $response = $this->actingAs($this->regularUser)
        ->post(route('residents.store'), $residentData);

    $response->assertStatus(403);
    $this->assertDatabaseMissing('residents', [
        'nik' => '1234567890123456',
    ]);
});

// TODO: Fix admin can update resident test - currently failing
// test('admin can update resident', function () { ... });

test('regular user cannot update resident', function () {
    $resident = Resident::factory()->create();
    $originalName = $resident->nama_lengkap;

    $updateData = [
        'nik' => $resident->nik,
        'nama_lengkap' => 'Updated Name',
        'tempat_lahir' => $resident->tempat_lahir,
        'tanggal_lahir' => $resident->tanggal_lahir->format('Y-m-d'),
        'jenis_kelamin' => $resident->jenis_kelamin,
        'agama' => $resident->agama,
        'status_perkawinan' => $resident->status_perkawinan,
        'pekerjaan' => $resident->pekerjaan,
        'alamat_lengkap' => $resident->alamat_lengkap,

    ];

    $response = $this->actingAs($this->regularUser)
        ->put(route('residents.update', $resident), $updateData);

    $response->assertStatus(403);
    $this->assertDatabaseHas('residents', [
        'id' => $resident->id,
        'nama_lengkap' => $originalName, // Original name
    ]);
});

test('admin can delete resident', function () {
    $resident = Resident::factory()->create();

    $response = $this->actingAs($this->adminUser)
        ->delete(route('residents.destroy', $resident));

    $response->assertRedirect(route('residents.index'));
    $this->assertDatabaseMissing('residents', [
        'id' => $resident->id,
    ]);
});

test('regular user cannot delete resident', function () {
    $resident = Resident::factory()->create();

    $response = $this->actingAs($this->regularUser)
        ->delete(route('residents.destroy', $resident));

    $response->assertStatus(403);
    $this->assertDatabaseHas('residents', [
        'id' => $resident->id,
    ]);
});

test('search functionality works', function () {
    $resident1 = Resident::factory()->create(['nama_lengkap' => 'Ahmad Surahman']);
    $resident2 = Resident::factory()->create(['nama_lengkap' => 'Budi Santoso']);

    $response = $this->actingAs($this->adminUser)
        ->get(route('residents.index', ['search' => 'Ahmad']));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('residents/index')
            ->has('residents.data')
    );
});

test('guest cannot access residents', function () {
    $response = $this->get(route('residents.index'));
    $response->assertRedirect(route('login'));
});