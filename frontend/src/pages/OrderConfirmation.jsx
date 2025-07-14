import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderService } from '../services/api';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await orderService.getOrder(orderId);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'preparing':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'ready':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'completed':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Menunggu Konfirmasi';
      case 'preparing':
        return 'Sedang Diproses';
      case 'ready':
        return 'Siap Disajikan';
      case 'completed':
        return 'Selesai';
      case 'cancelled':
        return 'Dibatalkan';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-purple-500/30"></div>
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-purple-500 absolute top-0 left-0"></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-16">
        <div className="text-8xl mb-6 opacity-50">❌</div>
        <h2 className="text-3xl font-semibold text-white mb-6">Pesanan Tidak Ditemukan</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium"
        >
          Kembali ke Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 mt-10">
      {/* Success Header */}
      <div className="text-center">
        <div className="relative inline-block mb-6">
          <CheckCircleIcon className="h-20 w-20 text-green-400 mx-auto float" />
          <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl"></div>
        </div>
        <h1 className="text-4xl font-bold text-emerald-400 mb-4">
          Pesanan Berhasil!
        </h1>
        <p className="text-white/70 text-lg">Pesanan Anda telah diterima dan sedang diproses</p>
      </div>

      {/* Order Details */}
      <div className="glass-card rounded-2xl shadow-xl p-8 hover-glow">
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <span className="w-2 h-8 bg-indigo-500 rounded-full mr-3"></span>
          Detail Pesanan
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass p-4 rounded-xl">
            <label className="block text-sm font-medium text-white/60 mb-1">ID Pesanan</label>
            <p className="text-2xl font-bold text-indigo-300">
              #{order.id}
            </p>
          </div>
          
          <div className="glass p-4 rounded-xl">
            <label className="block text-sm font-medium text-white/60 mb-1">Status</label>
            <span className={`inline-block px-4 py-2 rounded-xl text-sm font-medium border ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>
          
          <div className="glass p-4 rounded-xl">
            <label className="block text-sm font-medium text-white/60 mb-1">Nama Pelanggan</label>
            <p className="text-lg text-white font-medium">{order.customer_name}</p>
          </div>
          
          {order.customer_phone && (
            <div className="glass p-4 rounded-xl">
              <label className="block text-sm font-medium text-white/60 mb-1">No. Telepon</label>
              <p className="text-lg text-white font-medium">{order.customer_phone}</p>
            </div>
          )}
          
          {order.table_number && (
            <div className="glass p-4 rounded-xl">
              <label className="block text-sm font-medium text-white/60 mb-1">No. Meja</label>
              <p className="text-lg text-white font-medium">{order.table_number}</p>
            </div>
          )}
          
          <div className="glass p-4 rounded-xl">
            <label className="block text-sm font-medium text-white/60 mb-1">Waktu Pemesanan</label>
            <p className="text-lg text-white font-medium">
              {new Date(order.created_at).toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        {order.notes && (
          <div className="mb-8">
            <label className="block text-sm font-medium text-white/60 mb-3">Catatan</label>
            <div className="glass p-4 rounded-xl">
              <p className="text-white">{order.notes}</p>
            </div>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className="glass-card rounded-2xl shadow-xl p-8 hover-glow">
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <span className="w-2 h-8 bg-indigo-500 rounded-full mr-3"></span>
          Item Pesanan
        </h2>
        
        <div className="space-y-4">
          {order.order_items?.map((item) => (
            <div key={item.id} className="glass p-6 rounded-xl hover:glass-card transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-lg mb-2">{item.menu_item?.name}</h3>
                  <p className="text-sm text-white/70 mb-2">{item.menu_item?.description}</p>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-white/80 font-medium">
                      {formatPrice(item.price)} x {item.quantity}
                    </p>
                    {item.notes && (
                      <p className="text-sm text-purple-300 italic">Catatan: {item.notes}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl text-emerald-400">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex justify-between items-center text-2xl font-bold">
            <span className="text-white">Total:</span>
            <span className="text-amber-400">
              {formatPrice(order.total_amount)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-6">
        <button
          onClick={() => navigate('/')}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium text-lg"
        >
          Pesan Lagi
        </button>
      </div>

      {/* Order Status Info */}
      <div className="glass rounded-2xl p-8 text-center shadow-lg">
        <h3 className="font-semibold text-white mb-4 text-xl">Informasi Pesanan</h3>
        <div className="text-white/70">
          <p className="mb-2">
            Silakan tunggu, pesanan Anda sedang diproses.
          </p>
          <p className="text-lg">
            Tunjukkan ID pesanan <span className="font-bold text-indigo-300">#{order.id}</span> kepada pelayan untuk konfirmasi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
