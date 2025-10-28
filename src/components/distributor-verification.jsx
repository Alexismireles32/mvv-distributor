"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FiSearch, FiUser, FiMapPin, FiCheckCircle } from 'react-icons/fi';

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

  if (selectedDistributor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedDistributor(null)}
            className="mb-6 text-como hover:underline flex items-center gap-2"
          >
            ← Volver a búsqueda
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-como to-[#3d6849] p-8">
              <div className="flex items-center justify-center mb-4">
                {selectedDistributor.photo_url ? (
                  <img 
                    src={selectedDistributor.photo_url} 
                    alt={`${selectedDistributor.name} ${selectedDistributor.last_name}`}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white flex items-center justify-center">
                    <FiUser className="w-16 h-16 text-como" />
                  </div>
                )}
              </div>
              <h1 className="text-3xl font-bold text-white text-center">
                {selectedDistributor.name} {selectedDistributor.last_name}
              </h1>
              
              {/* Badge parpadeante */}
              <div className="flex items-center justify-center mt-4">
                <div className="animate-pulse inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg">
                  <FiCheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Distribuidor Activo y Autorizado</span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b pb-4">
                  <div className="bg-como/10 p-3 rounded-lg">
                    <FiMapPin className="w-6 h-6 text-como" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ubicación</p>
                    <p className="text-lg font-semibold text-como">{selectedDistributor.state}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 border-b pb-4">
                  <div className="bg-como/10 p-3 rounded-lg">
                    <span className="text-2xl font-bold text-como">#</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Número de Distribuidor</p>
                    <p className="text-2xl font-bold text-como">{selectedDistributor.code}</p>
                  </div>
                </div>

                {selectedDistributor.phone && (
                  <div className="flex items-center gap-4 border-b pb-4">
                    <div className="bg-como/10 p-3 rounded-lg">
                      <span className="text-2xl">📱</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Teléfono</p>
                      <p className="text-lg font-semibold text-como">{selectedDistributor.phone}</p>
                    </div>
                  </div>
                )}

                {selectedDistributor.email && (
                  <div className="flex items-center gap-4">
                    <div className="bg-como/10 p-3 rounded-lg">
                      <span className="text-2xl">✉️</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-lg font-semibold text-como">{selectedDistributor.email}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="text-sm text-blue-800 text-center">
              Este distribuidor está verificado y autorizado por MVV Natural
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-como mb-4">Verificar Distribuidor</h1>
          <p className="text-gray-600 text-lg">
            Busca y verifica que tu distribuidor esté autorizado y registrado con MVV Natural
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ingresa nombre o número de distribuidor..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-como focus:border-transparent"
            />
          </div>
        </div>

        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Cargando distribuidores...</p>
          </div>
        )}

        {searchTerm.length > 0 && filteredDistributors.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-como mb-4">
              {filteredDistributors.length} Distribuidor{filteredDistributors.length > 1 ? 'es' : ''} Encontrado{filteredDistributors.length > 1 ? 's' : ''}
            </h2>
            
            <div className="space-y-3">
              {filteredDistributors.map((dist) => (
                <div
                  key={dist.code}
                  onClick={() => handleDistributorClick(dist)}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-all hover:shadow-md"
                >
                  {dist.photo_url ? (
                    <img 
                      src={dist.photo_url} 
                      alt={`${dist.name} ${dist.last_name}`}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-como/10 flex items-center justify-center">
                      <FiUser className="w-8 h-8 text-como" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-como">{dist.name} {dist.last_name}</h3>
                    <p className="text-sm text-gray-600">#{dist.code} • {dist.state}</p>
                  </div>
                  <FiCheckCircle className="w-6 h-6 text-green-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {searchTerm.length > 0 && filteredDistributors.length === 0 && !loading && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <p className="text-gray-600">No se encontraron distribuidores con ese término de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}

