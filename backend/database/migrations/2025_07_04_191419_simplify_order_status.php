<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update status yang kompleks menjadi sederhana
        DB::table('orders')
            ->whereIn('status', ['preparing', 'ready'])
            ->update(['status' => 'pending']);
            
        // Update cancelled menjadi completed (atau bisa dihapus jika perlu)
        DB::table('orders')
            ->where('status', 'cancelled')
            ->update(['status' => 'completed']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Tidak perlu rollback karena ini adalah simplifikasi
    }
};
