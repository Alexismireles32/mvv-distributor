"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function AdminProductsManager({ onBack }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [newItem, setNewItem] = useState({ name: '', image_url: '', slug: '' });

  const load = async () => {
    try {
      if (!supabase) { setError('Supabase no disponible'); return; }
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*').order('name', { ascending: true });
      if (error) throw error;
      setItems(data || []);
    } catch (e) {
      setError(e?.message || 'No se pudieron cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    try {
      setError('');
      if (!newItem.name || !newItem.image_url) { setError('Nombre e imagen son requeridos'); return; }
      setSaving(true);
      const payload = { name: newItem.name.trim(), image_url: newItem.image_url.trim(), slug: (newItem.slug || '').trim() };
      const { error } = await supabase.from('products').insert([payload]);
      if (error) throw error;
      setNewItem({ name: '', image_url: '', slug: '' });
      await load();
    } catch (e) {
      setError(e?.message || 'No se pudo agregar');
    } finally { setSaving(false); }
  };

  const save = async (id, patch) => {
    try {
      setSaving(true);
      const { error } = await supabase.from('products').update(patch).eq('id', id);
      if (error) throw error;
      await load();
    } catch (e) {
      setError(e?.message || 'No se pudo guardar');
    } finally { setSaving(false); }
  };

  const remove = async (id) => {
    try {
      if (!confirm('¿Eliminar este producto?')) return;
      setSaving(true);
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      await load();
    } catch (e) {
      setError(e?.message || 'No se pudo eliminar');
    } finally { setSaving(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-como">Gestionar Productos</h1>
          <button onClick={onBack} className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50">← Volver</button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Agregar nuevo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input placeholder="Nombre" value={newItem.name} onChange={(e)=>setNewItem({...newItem,name:e.target.value})} className="px-3 py-2 border" />
            <input placeholder="URL de Imagen" value={newItem.image_url} onChange={(e)=>setNewItem({...newItem,image_url:e.target.value})} className="px-3 py-2 border" />
            <input placeholder="Slug (opcional)" value={newItem.slug} onChange={(e)=>setNewItem({...newItem,slug:e.target.value})} className="px-3 py-2 border" />
          </div>
          <button onClick={add} disabled={saving} className="mt-3 px-5 py-2 bg-black text-white hover:bg-gray-800">{saving?'Guardando...':'Agregar Producto'}</button>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Productos</h2>
          {loading ? (
            <p className="text-gray-600">Cargando...</p>
          ) : items.length === 0 ? (
            <p className="text-gray-600">No hay productos</p>
          ) : (
            <div className="space-y-4">
              {items.map((p) => (
                <div key={p.id} className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center border-b pb-4">
                  <img src={p.image_url} alt={p.name} className="w-16 h-16 object-contain bg-gray-50" />
                  <input value={p.name} onChange={(e)=>setItems(items.map(it=>it.id===p.id?{...it,name:e.target.value}:it))} className="px-3 py-2 border md:col-span-2" />
                  <input value={p.image_url} onChange={(e)=>setItems(items.map(it=>it.id===p.id?{...it,image_url:e.target.value}:it))} className="px-3 py-2 border md:col-span-2" />
                  <input value={p.slug||''} onChange={(e)=>setItems(items.map(it=>it.id===p.id?{...it,slug:e.target.value}:it))} className="px-3 py-2 border" />
                  <div className="md:col-span-6 flex gap-2 mt-2">
                    <button onClick={()=>save(p.id,{ name:p.name, image_url:p.image_url, slug:p.slug })} className="px-4 py-2 bg-como text-white hover:bg-[#3d6849]">Guardar</button>
                    <button onClick={()=>remove(p.id)} className="px-4 py-2 bg-red-600 text-white hover:bg-red-700">Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


