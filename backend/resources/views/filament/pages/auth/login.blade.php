<x-filament-panels::page.simple>
    {{-- Custom Logo and Brand Header --}}
    <div class="text-center">
        <div class="flex items-center justify-center space-x-6 mb-5">
            <div class="relative">
                @if(file_exists(public_path('images/kadjine.jpg')))
                    <img 
                        src="{{ asset('images/kadjine.jpg') }}" 
                        alt="Kadjine Logo" 
                        class="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-primary-500 shadow-lg"
                    >
                @else
                    <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center border-4 border-primary-500 shadow-lg">
                        <span class="text-white font-bold text-2xl sm:text-3xl">K</span>
                    </div>
                @endif
            </div>
            <div class="text-left">
                <h1 class="text-3xl sm:text-4xl px-4 font-bold text-gray-900 dark:text-white">Kadjine Coffee</h1>
            </div>
        </div>
    </div>

    {{-- Remove default sign in heading by overriding it --}}
    <style>
        .fi-simple-header h1,
        .fi-simple-header .fi-header-heading,
        .fi-simple-page .fi-simple-header {
            display: none !important;
        }
    </style>

    {{-- Login Form --}}
    <x-filament-panels::form wire:submit="authenticate">
        {{ $this->form }}

        <x-filament-panels::form.actions
            :actions="$this->getCachedFormActions()"
            :full-width="$this->hasFullWidthFormActions()"
        />
    </x-filament-panels::form>
</x-filament-panels::page.simple>
