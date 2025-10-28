"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BiSearch, BiUser, BiMapPin, BiCheckCircle, BiLeftArrowAlt, BiPhone } from 'react-icons/bi';

export function DistributorVerificationSystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [distributors, setDistributors] = useState([]);
  const [filteredDistributors, setFilteredDistributors] = useState([]);
  const [selectedDistributor, setSelectedDistributor] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllDistributors();
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = distributors.filter(dist => 
        dist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dist.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dist.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dist.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDistributors(filtered);
    } else {
      setFilteredDistributors([]);
    }
  }, [searchTerm, distributors]);

  const loadAllDistributors = async () => {
    try {
      setLoading(true);
      if (supabase) {
        const { data, error } = await supabase
          .from('distributors')
          .select('*')
          .order('name', { ascending: true });

        if (!error && data) {
          setDistributors(data);
        }
      }
    } catch (error) {
      console.error('Error loading distributors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDistributorClick = (dist) => {
    setSelectedDistributor(dist);
  };

  const handleWhatsApp = (phone) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const message = encodeURIComponent(
      'Hola, tengo interés en los productos MVV Natural. ¿Me podrías proporcionar más información?'
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  if (selectedDistributor) {
    return (
      <div className="min-h-screen bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-light text-gray-900">Perfil del Distribuidor</h1>
              <p className="text-sm text-gray-500 mt-2">Información verificada</p>
            </div>
            <button
              onClick={() => setSelectedDistributor(null)}
              className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <BiLeftArrowAlt />
              Volver a Búsqueda
            </button>
          </div>

          {/* Distributor Profile */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8">
            {/* Photo and Name */}
            <div className="text-center mb-8">
              {selectedDistributor.photo_url ? (
                <img 
                  src={selectedDistributor.photo_url} 
                  alt={`${selectedDistributor.name} ${selectedDistributor.last_name}`}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                  <BiUser className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                </div>
              )}
              
              <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-2">
                {selectedDistributor.name} {selectedDistributor.last_name}
              </h2>
              
              {/* Status Badge - Small and Thin */}
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                <BiCheckCircle className="w-3 h-3" />
                <span>Distribuidor Activo y Autorizado</span>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <BiMapPin className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Ubicación</p>
                  <p className="text-base font-medium text-gray-900">{selectedDistributor.state}</p>
                </div>
              </div>

              {/* Distributor Code */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-600">#</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Código Distribuidor</p>
                  <p className="text-base font-medium text-gray-900">{selectedDistributor.code}</p>
                </div>
              </div>

              {/* Phone */}
              {selectedDistributor.phone && (
                <div className="flex items-start gap-3 sm:col-span-2">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <BiPhone className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Teléfono</p>
                    <p className="text-base font-medium text-gray-900 mb-3">{selectedDistributor.phone}</p>
                    <button
                      onClick={() => handleWhatsApp(selectedDistributor.phone)}
                      className="px-6 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Contactar por WhatsApp
                    </button>
                  </div>
                </div>
              )}

              {/* Email */}
              {selectedDistributor.email && (
                <div className="flex items-start gap-3 sm:col-span-2">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-sm">✉️</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email</p>
                    <p className="text-base font-medium text-gray-900">{selectedDistributor.email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Verification Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Este distribuidor está verificado y autorizado por MVV Natural
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">Verificar Distribuidor</h1>
          <p className="text-sm text-gray-500">
            Busca y verifica que tu distribuidor esté autorizado y registrado con MVV Natural
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ingresa nombre o número de distribuidor..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">Cargando distribuidores...</p>
          </div>
        )}

        {/* Results */}
        {searchTerm.length > 0 && filteredDistributors.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                {filteredDistributors.length} Distribuidor{filteredDistributors.length > 1 ? 'es' : ''} Encontrado{filteredDistributors.length > 1 ? 's' : ''}
              </h2>
            </div>
            
            <div className="space-y-3">
              {filteredDistributors.map((dist) => (
                <div
                  key={dist.code}
                  onClick={() => handleDistributorClick(dist)}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  {dist.photo_url ? (
                    <img 
                      src={dist.photo_url} 
                      alt={`${dist.name} ${dist.last_name}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <BiUser className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-gray-900">{dist.name} {dist.last_name}</h3>
                    <p className="text-sm text-gray-500">#{dist.code} • {dist.state}</p>
                  </div>
                  <BiCheckCircle className="w-5 h-5 text-green-600" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {searchTerm.length > 0 && filteredDistributors.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">No se encontraron distribuidores con ese término de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}

