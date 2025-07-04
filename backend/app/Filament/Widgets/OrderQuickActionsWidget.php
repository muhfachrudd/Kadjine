<?php

namespace App\Filament\Widgets;

use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use App\Models\Order;
use Filament\Tables\Actions\Action;
use Filament\Support\Enums\FontWeight;
use Filament\Notifications\Notification;

class OrderQuickActionsWidget extends BaseWidget
{
    protected static ?string $heading = 'Pesanan Menunggu';
    
    protected static ?int $sort = 3;

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Order::query()->where('status', 'pending')->with(['orderItems', 'orderItems.menuItem'])
            )
            ->columns([
                    
                Tables\Columns\TextColumn::make('table_number')
                    ->label('Meja')
                    ->badge()
                    ->color('gray'),
                    
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Waktu Pesan')
                    ->since()
                    ->color('warning'),
                    
                Tables\Columns\TextColumn::make('orderItems')
                    ->label('Item')
                    ->formatStateUsing(function ($record) {
                        return $record->orderItems->map(function ($item) {
                            return $item->quantity . 'x ' . $item->menuItem->name;
                        })->join(', ');
                    })
                    ->wrap()
                    ->limit(50),
                    
                Tables\Columns\TextColumn::make('total_amount')
                    ->label('Total')
                    ->money('IDR')
                    ->weight(FontWeight::Bold)
                    ->color('success'),
            ])
            ->actions([
                Action::make('complete')
                    ->label('Selesai')
                    ->icon('heroicon-m-check-badge')
                    ->color('success')
                    ->button()
                    ->requiresConfirmation()
                    ->modalHeading('Selesaikan Pesanan')
                    ->modalDescription(fn ($record) => "Apakah pesanan untuk {$record->customer_name} sudah selesai?")
                    ->action(function ($record) {
                        $record->update(['status' => 'completed']);
                        
                        Notification::make()
                            ->title('Pesanan Diselesaikan')
                            ->body("Pesanan #{$record->id} untuk {$record->customer_name} telah diselesaikan.")
                            ->success()
                            ->send();
                    })
                    ->after(fn () => $this->dispatch('$refresh')),
            ])
            ->emptyStateHeading('Tidak Ada Pesanan Menunggu')
            ->emptyStateDescription('Semua pesanan telah diselesaikan.')
            ->emptyStateIcon('heroicon-o-check-circle')
            ->poll('5s'); // Auto refresh setiap 5 detik
    }
}
