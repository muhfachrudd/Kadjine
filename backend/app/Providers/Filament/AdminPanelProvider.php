<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets;
use Filament\View\PanelsRenderHook;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Illuminate\Support\Facades\Blade;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login(\App\Filament\Pages\Auth\Login::class)
            ->colors([
                'primary' => Color::Purple,
                'secondary' => Color::Pink,
                'success' => Color::Green,
                'danger' => Color::Red,
                'warning' => Color::Yellow,
                'info' => Color::Blue,
                'light' => Color::Gray,
            ])
            ->brandLogo(fn () => view('filament.brand.logo'))
            ->brandName('Kadjine')
            ->brandLogoHeight('2.5rem')
            ->favicon(asset('images/kadjine.jpg'))
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->pages([
                Pages\Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\Filament\\Widgets')
            ->widgets([
                \App\Filament\Widgets\OrderQuickActionsWidget::class,
                \App\Filament\Widgets\OrderStatsWidget::class,
                \App\Filament\Widgets\OrdersChart::class,
                Widgets\AccountWidget::class,
                Widgets\FilamentInfoWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ])
            ->renderHook(
                PanelsRenderHook::HEAD_END,
                fn (): string => Blade::render('<style>
                    .fi-logo {
                        display: flex !important;
                        align-items: center !important;
                        gap: 0.75rem !important;
                    }
                    
                    .fi-sidebar-header .fi-logo {
                        padding: 1rem 0 !important;
                    }
                    
                    .fi-logo img {
                        border-radius: 50% !important;
                        border: 2px solid rgba(255, 255, 255, 0.2) !important;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
                        object-fit: cover !important;
                    }
                    
                    .fi-sidebar .fi-logo span {
                        color: white !important;
                        font-weight: 700 !important;
                        font-size: 1.25rem !important;
                    }
                    
                    .fi-topbar .fi-logo span {
                        color: var(--primary-600) !important;
                        font-weight: 700 !important;
                        font-size: 1.125rem !important;
                    }
                    
                    @media (max-width: 640px) {
                        .fi-logo span {
                            display: none !important;
                        }
                    }
                </style>')
            );
    }
}
