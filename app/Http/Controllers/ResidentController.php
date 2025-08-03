<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreResidentRequest;
use App\Http\Requests\UpdateResidentRequest;
use App\Models\Resident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ResidentController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Resident::query();

        // Search functionality
        if ($request->filled('search')) {
            $query->search($request->search);
        }

        // Sort by name by default
        $residents = $query->orderBy('nama_lengkap')->paginate(15)->withQueryString();

        return Inertia::render('residents/index', [
            'residents' => $residents,
            'search' => $request->search,
            'can_manage' => auth()->user()->isAdmin(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Access denied. Admin privileges required.');
        }

        return Inertia::render('residents/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreResidentRequest $request)
    {
        $data = $request->validated();

        // Handle photo upload
        if ($request->hasFile('foto_rumah')) {
            $file = $request->file('foto_rumah');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('house-photos', $filename, 'public');
            $data['foto_rumah'] = $path;
        }

        $resident = Resident::create($data);

        return redirect()->route('residents.show', $resident)
            ->with('success', 'Data penduduk berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Resident $resident)
    {
        return Inertia::render('residents/show', [
            'resident' => $resident,
            'can_manage' => auth()->user()->isAdmin(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Resident $resident)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Access denied. Admin privileges required.');
        }

        return Inertia::render('residents/edit', [
            'resident' => $resident,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateResidentRequest $request, Resident $resident)
    {
        $data = $request->validated();

        // Handle photo upload
        if ($request->hasFile('foto_rumah')) {
            // Delete old photo if exists
            if ($resident->foto_rumah) {
                Storage::disk('public')->delete($resident->foto_rumah);
            }

            $file = $request->file('foto_rumah');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('house-photos', $filename, 'public');
            $data['foto_rumah'] = $path;
        }

        $resident->update($data);

        return redirect()->route('residents.show', $resident)
            ->with('success', 'Data penduduk berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resident $resident)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Access denied. Admin privileges required.');
        }

        // Delete photo if exists
        if ($resident->foto_rumah) {
            Storage::disk('public')->delete($resident->foto_rumah);
        }

        $resident->delete();

        return redirect()->route('residents.index')
            ->with('success', 'Data penduduk berhasil dihapus.');
    }
}