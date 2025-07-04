<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function categories()
    {
        $categories = Category::with('menuItems')->get();
        return response()->json($categories);
    }

    public function menuItems()
    {
        $menuItems = MenuItem::with('category')
            ->where('is_available', true)
            ->get();
        return response()->json($menuItems);
    }

    public function menuItemsByCategory($categoryId)
    {
        $menuItems = MenuItem::with('category')
            ->where('category_id', $categoryId)
            ->where('is_available', true)
            ->get();
        return response()->json($menuItems);
    }
}
