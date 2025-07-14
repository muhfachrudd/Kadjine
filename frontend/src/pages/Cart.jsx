import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/api';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    customer_name: '',
    customer_phone: '',
    table_number: '',
    notes: '',
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (items.length === 0) {
      alert('Keranjang masih kosong!');
      return;
    }

    if (!customerInfo.customer_name.trim()) {
      alert('Nama pelanggan harus diisi!');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        ...customerInfo,
        items: items.map(item => ({
          menu_item_id: item.id,
          quantity: item.quantity,
          notes: '',
        })),
      };

      const response = await orderService.createOrder(orderData);
      clearCart();
      navigate(`/order-confirmation/${response.data.order.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Terjadi kesalahan saat membuat pesanan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-semibold text-white mb-4">Keranjang Kosong</h2>
        <p className="text-white/60 mb-8 text-lg">Belum ada item yang ditambahkan ke keranjang</p>
        <button
          onClick={() => navigate('/')}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium"
        >
          Lihat Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 mt-12">
      <h1 className="text-4xl font-bold text-indigo-300 text-center">
        Keranjang Belanja
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="glass-card rounded-2xl shadow-xl p-6 hover-glow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
                  <p className="text-white/70 text-sm mb-3">{item.description}</p>
                  <p className="text-lg font-bold text-emerald-400">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="flex items-center space-x-6">
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 rounded-xl glass hover:glass-card transition-all duration-300 text-white hover-glow"
                    >
                      <MinusIcon className="h-5 w-5" />
                    </button>
                    
                    <span className="px-4 py-2 glass rounded-xl text-center min-w-[4rem] text-white font-semibold text-lg">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 rounded-xl glass hover:glass-card transition-all duration-300 text-white hover-glow"
                    >
                      <PlusIcon className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-300"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-lg">Subtotal:</span>
                  <span className="font-bold text-xl text-amber-400">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Customer Info */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="glass-card rounded-2xl shadow-xl p-6 hover-glow">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <span className="w-2 h-8 bg-indigo-500 rounded-full mr-3"></span>
              Ringkasan Pesanan
            </h3>
            
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-white/70">{item.name} x{item.quantity}</span>
                  <span className="text-white font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/20 pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-white">Total:</span>
                <span className="text-emerald-400">
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Information Form */}
          <div className="glass-card rounded-2xl shadow-xl p-6 hover-glow">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <span className="w-2 h-8 bg-indigo-500 rounded-full mr-3"></span>
              Informasi Pelanggan
            </h3>
            
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Nama *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.customer_name}
                  onChange={(e) => setCustomerInfo({
                    ...customerInfo,
                    customer_name: e.target.value
                  })}
                  className="w-full px-4 py-3 glass rounded-xl focus:glass-card focus:outline-none transition-all duration-300 text-white placeholder-white/50"
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  No. Telepon
                </label>
                <input
                  type="tel"
                  value={customerInfo.customer_phone}
                  onChange={(e) => setCustomerInfo({
                    ...customerInfo,
                    customer_phone: e.target.value
                  })}
                  className="w-full px-4 py-3 glass rounded-xl focus:glass-card focus:outline-none transition-all duration-300 text-white placeholder-white/50"
                  placeholder="Contoh: 08123456789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  No. Meja
                </label>
                <input
                  type="text"
                  value={customerInfo.table_number}
                  onChange={(e) => setCustomerInfo({
                    ...customerInfo,
                    table_number: e.target.value
                  })}
                  className="w-full px-4 py-3 glass rounded-xl focus:glass-card focus:outline-none transition-all duration-300 text-white placeholder-white/50"
                  placeholder="Contoh: A1, B2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Catatan
                </label>
                <textarea
                  value={customerInfo.notes}
                  onChange={(e) => setCustomerInfo({
                    ...customerInfo,
                    notes: e.target.value
                  })}
                  className="w-full px-4 py-3 glass rounded-xl focus:glass-card focus:outline-none transition-all duration-300 text-white placeholder-white/50"
                  rows="3"
                  placeholder="Catatan khusus untuk pesanan..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 px-6 rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg hover:scale-105"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Memproses...</span>
                  </div>
                ) : (
                  'Pesan Sekarang'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
