"use client";

import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export function ProfileManager({ distributorCode, currentPhotoUrl, onBack, onSaved }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(currentPhotoUrl || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const onSelect = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith('image/')) {
      setError('Selecciona una imagen válida');
      return;
    }
    setError('');
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const upload = async () => {
    try {
      if (!file) {
        setError('Selecciona una imagen primero');
        return;
      }
      if (!supabase) {
        setError('Supabase no disponible');
        return;
      }
      setSaving(true);
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `distributors/${distributorCode}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase
        .storage
        .from('profiles')
        .upload(path, file, {
          upsert: true,
          cacheControl: '3600',
          contentType: file.type || 'image/jpeg'
        });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from('profiles').getPublicUrl(path);
      const publicUrl = pub?.publicUrl;
      if (!publicUrl) throw new Error('No se pudo obtener URL pública');
      const { error: updErr } = await supabase
        .from('distributors')
        .update({ photo_url: publicUrl })
        .eq('code', distributorCode);
      if (updErr) throw updErr;
      if (onSaved) onSaved(publicUrl);
      alert('Foto de perfil actualizada');
      onBack();
    } catch (e) {
      console.error('Upload error:', e);
      setError(`Error al subir imagen: ${e?.message || e?.error_description || 'verifica el bucket "profiles" y las políticas de Storage'}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900">Foto de Perfil</h1>
          <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-900">← Volver al Dashboard</button>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden border border-gray-200 flex items-center justify-center">
              {preview ? (
                <img src={preview} alt="Foto de perfil" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-sm">Sin foto</span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-3">Sube una imagen JPG o PNG. Tamaño recomendado 400x400.</p>
              <input type="file" accept="image/*" onChange={onSelect} className="block mb-4" />
              <div className="flex gap-2">
                <button onClick={upload} disabled={saving || !file} className="px-6 py-2 bg-black text-white hover:bg-gray-800 disabled:opacity-50">{saving ? 'Guardando...' : 'Guardar Foto'}</button>
                {currentPhotoUrl && (
                  <a href={currentPhotoUrl} target="_blank" rel="noreferrer" className="px-6 py-2 border border-gray-300 text-gray-700">Ver Actual</a>
                )}
              </div>
              {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


