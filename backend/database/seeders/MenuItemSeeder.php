<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenuItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menuItems = [
            // Makanan Utama
            [
                'name' => 'Nasi Goreng Spesial',
                'description' => 'Nasi goreng dengan telur, ayam, dan sayuran segar',
                'price' => 25000,
                'category_id' => 1,
                'is_available' => true,
            ],
            [
                'name' => 'Mie Ayam Bakso',
                'description' => 'Mie ayam dengan bakso dan pangsit goreng',
                'price' => 20000,
                'category_id' => 1,
                'is_available' => true,
            ],
            [
                'name' => 'Gado-Gado',
                'description' => 'Sayuran segar dengan bumbu kacang',
                'price' => 18000,
                'category_id' => 1,
                'is_available' => true,
            ],
            
            // Minuman
            [
                'name' => 'Es Jeruk',
                'description' => 'Jus jeruk segar dengan es batu',
                'price' => 8000,
                'category_id' => 2,
                'is_available' => true,
            ],
            [
                'name' => 'Kopi Hitam',
                'description' => 'Kopi hitam tradisional',
                'price' => 6000,
                'category_id' => 2,
                'is_available' => true,
            ],
            [
                'name' => 'Teh Tarik',
                'description' => 'Teh manis dengan susu',
                'price' => 7000,
                'category_id' => 2,
                'is_available' => true,
            ],
            
            // Dessert
            [
                'name' => 'Es Krim Vanila',
                'description' => 'Es krim vanila dengan topping',
                'price' => 12000,
                'category_id' => 3,
                'is_available' => true,
            ],
            [
                'name' => 'Pisang Goreng',
                'description' => 'Pisang goreng crispy dengan madu',
                'price' => 10000,
                'category_id' => 3,
                'is_available' => true,
            ],
            
            // Appetizer
            [
                'name' => 'Kerupuk Udang',
                'description' => 'Kerupuk udang renyah',
                'price' => 5000,
                'category_id' => 4,
                'is_available' => true,
            ],
            [
                'name' => 'Tahu Isi',
                'description' => 'Tahu isi dengan sayuran',
                'price' => 8000,
                'category_id' => 4,
                'is_available' => true,
            ],
        ];

        foreach ($menuItems as $item) {
            \App\Models\MenuItem::create($item);
        }
    }
}
