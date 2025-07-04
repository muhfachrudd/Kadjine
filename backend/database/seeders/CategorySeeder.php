<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Makanan Utama',
                'description' => 'Hidangan utama seperti nasi, mie, dan lainnya'
            ],
            [
                'name' => 'Minuman',
                'description' => 'Berbagai jenis minuman segar dan hangat'
            ],
            [
                'name' => 'Dessert',
                'description' => 'Makanan penutup dan camilan manis'
            ],
            [
                'name' => 'Appetizer',
                'description' => 'Hidangan pembuka'
            ]
        ];

        foreach ($categories as $category) {
            \App\Models\Category::create($category);
        }
    }
}
