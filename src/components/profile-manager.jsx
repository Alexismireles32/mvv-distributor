"use client";

import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

export function ProfileManager({ distributorCode, currentPhotoUrl, onBack, onSaved }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(currentPhotoUrl || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    last_name: '',
    country: '',
    state: '',
    phone: '',
    email: '',
    currentPin: '',
    pin: ''
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { profile } = await api.myData();
        if (!profile) return;
        setForm({
          name: profile.name || '',
          last_name: profile.last_name || '',
          country: profile.country || '',
          state: profile.state || '',
          phone: profile.phone || '',
          email: profile.email || '',
          // The PIN is never sent to the browser. Leaving these blank keeps the
          // current PIN; filling both changes it.
          currentPin: '',
          pin: ''
        });
        if (profile.photo_url) setPreview(profile.photo_url);
      } catch (e) {
        console.error('Error loading profile:', e);
      }
    };
    loadProfile();
  }, [distributorCode]);

  const upload = async () => {
    try {
      if (!file) {
        setError('Selecciona una imagen primero');
        return;
      }
      setSaving(true);
      setError('');

      // Uploaded through our own endpoint so the storage token stays on the server
      // and the destination path is derived from the session, not from the client.
      const body = new FormData();
      body.append('file', file);
      const response = await fetch('/api/me/photo', {
        method: 'POST',
        body,
        credentials: 'same-origin'
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error || 'No se pudo subir la imagen');

      setPreview(payload.photo_url);
      if (onSaved) onSaved({ photo_url: payload.photo_url });
      alert('Foto de perfil actualizada');
      onBack();
    } catch (e) {
      console.error('Upload error:', e);
      setError(`Error al subir imagen: ${e?.message || 'intenta de nuevo'}`);
    } finally {
      setSaving(false);
    }
  };

  const saveProfile = async () => {
    try {
      if (!form.name || !form.last_name || !form.state || !form.country) {
        setError('Nombre, Apellido, País y Estado son requeridos');
        return;
      }
      const pin = (form.pin || '').trim();
      const currentPin = (form.currentPin || '').trim();
      if (pin && !/^\d{4}$/.test(pin)) {
        setError('El nuevo PIN debe ser de 4 dígitos numéricos');
        return;
      }
      if (pin && !/^\d{4}$/.test(currentPin)) {
        setError('Ingresa tu PIN actual para poder cambiarlo');
        return;
      }
      setSaving(true);
      setError('');

      const profile = {
        name: form.name.trim(),
        last_name: form.last_name.trim(),
        country: form.country.trim(),
        state: form.state.trim(),
        phone: (form.phone || '').trim(),
        email: (form.email || '').trim()
      };
      // Only include the PIN change when she actually filled it in.
      await api.saveSettings(pin ? { profile, currentPin, newPin: pin } : { profile });
      if (pin) setForm(f => ({ ...f, currentPin: '', pin: '' }));

      alert('Perfil actualizado');
      if (onSaved) onSaved(profile);
      onBack();
    } catch (e) {
      console.error('Save profile error:', e);
      setError(`Error al guardar: ${e?.message || 'intenta de nuevo'}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900">Perfil del Distribuidor</h1>
          <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-900">← Volver al Dashboard</button>
        </div>

        <div className="bg-white border border-gray-200 p-6 mb-6">
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

        <div className="bg-white border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Información del Perfil</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
              <input value={form.name} onChange={(e)=> setForm({...form, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellido *</label>
              <input value={form.last_name} onChange={(e)=> setForm({...form, last_name: e.target.value})} className="w-full px-3 py-2 border border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">País *</label>
              <select value={form.country} onChange={(e)=> setForm({...form, country: e.target.value})} className="w-full px-3 py-2 border border-gray-300">
                <option value="">Selecciona</option>
                <option value="USA">Estados Unidos</option>
                <option value="Mexico">México</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado *</label>
              <input value={form.state} onChange={(e)=> setForm({...form, state: e.target.value})} placeholder="Ej: Texas" className="w-full px-3 py-2 border border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono (WhatsApp)</label>
              <input value={form.phone} onChange={(e)=> setForm({...form, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={form.email} onChange={(e)=> setForm({...form, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PIN (4 dígitos)</label>
              <input type="password" maxLength={4} value={form.pin} onChange={(e)=> setForm({...form, pin: e.target.value.replace(/[^\d]/g,'').slice(0,4)})} className="w-full px-3 py-2 border border-gray-300" />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={saveProfile} disabled={saving} className="px-6 py-2 bg-black text-white hover:bg-gray-800 disabled:opacity-50">{saving ? 'Guardando...' : 'Guardar Cambios'}</button>
            <button onClick={onBack} className="px-6 py-2 border border-gray-300 text-gray-700">Cancelar</button>
          </div>
          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
}


