<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class OrderStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $totalOrders = \App\Models\Order::count();
        $todayOrders = \App\Models\Order::whereDate('created_at', today())->count();
        $pendingOrders = \App\Models\Order::where('status', 'pending')->count();
        $totalRevenue = \App\Models\Order::where('status', 'completed')->sum('total_amount');
        
        return [
            Stat::make('Total Pesanan', $totalOrders)
            ->description('Jumlah seluruh pesanan')
            ->descriptionIcon('heroicon-m-shopping-bag')
            ->color('primary')
            ->chart([20, 25, 30, 28, 35, 32, 40]),
            
            Stat::make('Pesanan Hari Ini', $todayOrders)
            ->description('Jumlah pesanan yang dibuat hari ini')
            ->descriptionIcon('heroicon-m-calendar-days')
            ->color('secondary')
            ->chart([12, 4, 8, 2, 15, 4, 10]),
            
            Stat::make('Pesanan Menunggu', $pendingOrders)
            ->description('Pesanan yang masih menunggu penyelesaian')
            ->descriptionIcon('heroicon-m-clock')
            ->color('danger')
            ->chart([7, 2, 10, 3, 15, 4, 17]),
            
            Stat::make('Total Pendapatan', 'Rp ' . number_format($totalRevenue, 0, ',', '.'))
            ->description('Total pendapatan dari pesanan yang selesai')
            ->descriptionIcon('heroicon-m-banknotes')
            ->color('success')
            ->chart([50000, 75000, 100000, 85000, 120000, 95000, 110000]),
        ];
    }
}
