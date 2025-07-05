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
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-green-100 text-green-800';
      case 'ready':
        return 'bg-green-200 text-green-900';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#819067]"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-[#FEFAE0] mb-4">Pesanan Tidak Ditemukan</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-[#0A400C] text-[#FEFAE0] px-6 py-3 rounded-lg hover:bg-[#819067] transition-colors"
        >
          Kembali ke Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Header */}
      <div className="text-center">
        <CheckCircleIcon className="h-16 w-16 text-[#819067] mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-[#FEFAE0] mb-2">Pesanan Berhasil!</h1>
        <p className="text-[#B1AB86]">Pesanan Anda telah diterima dan sedang diproses</p>
      </div>

      {/* Order Details */}
      <div className="bg-[#FEFAE0] rounded-xl shadow-md p-6 border border-[#B1AB86]">
        <h2 className="text-xl font-semibold text-[#0A400C] mb-4">Detail Pesanan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-[#819067]">ID Pesanan</label>
            <p className="text-lg font-semibold text-[#0A400C]">#{order.id}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#819067]">Status</label>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#819067]">Nama Pelanggan</label>
            <p className="text-lg text-[#0A400C]">{order.customer_name}</p>
          </div>
          
          {order.customer_phone && (
            <div>
              <label className="block text-sm font-medium text-[#819067]">No. Telepon</label>
              <p className="text-lg text-[#0A400C]">{order.customer_phone}</p>
            </div>
          )}
          
          {order.table_number && (
            <div>
              <label className="block text-sm font-medium text-[#819067]">No. Meja</label>
              <p className="text-lg text-[#0A400C]">{order.table_number}</p>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-[#819067]">Waktu Pemesanan</label>
            <p className="text-lg text-[#0A400C]">
              {new Date(order.created_at).toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        {order.notes && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#819067] mb-2">Catatan</label>
            <p className="text-[#0A400C] bg-[#B1AB86]/20 p-3 rounded-md border border-[#B1AB86]">{order.notes}</p>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className="bg-[#FEFAE0] rounded-xl shadow-md p-6 border border-[#B1AB86]">
        <h2 className="text-xl font-semibold text-[#0A400C] mb-4">Item Pesanan</h2>
        
        <div className="space-y-4">
          {order.order_items?.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-3 border-b border-[#B1AB86] last:border-b-0">
              <div className="flex-1">
                <h3 className="font-medium text-[#0A400C]">{item.menu_item?.name}</h3>
                <p className="text-sm text-[#819067]">{item.menu_item?.description}</p>
                <p className="text-sm text-[#819067] font-medium">
                  {formatPrice(item.price)} x {item.quantity}
                </p>
                {item.notes && (
                  <p className="text-sm text-[#B1AB86] italic">Catatan: {item.notes}</p>
                )}
              </div>
              <div className="text-right">
                <p className="font-semibold text-[#0A400C]">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-[#B1AB86]">
          <div className="flex justify-between items-center text-xl font-semibold">
            <span className="text-[#0A400C]">Total:</span>
            <span className="text-[#819067]">{formatPrice(order.total_amount)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => navigate('/')}
          className="bg-[#0A400C] text-[#FEFAE0] px-6 py-3 rounded-lg hover:bg-[#819067] transition-colors shadow-md"
        >
          Pesan Lagi
        </button>
      </div>

      {/* Order Status Info */}
      <div className="bg-[#B1AB86]/20 rounded-xl p-6 text-center border border-[#B1AB86]">
        <h3 className="font-semibold text-[#0A400C] mb-2">Informasi Pesanan</h3>
        <p className="text-[#819067] text-sm">
          Silakan tunggu, pesanan Anda sedang diproses. 
          Anda dapat menunjukkan ID pesanan #{order.id} kepada pelayan untuk konfirmasi.
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;
