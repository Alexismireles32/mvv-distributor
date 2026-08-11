import type { APIRoute } from 'astro';
import { put } from '@vercel/blob';
import { getSql, jsonResponse, errorResponse, handleServerError } from '../../../server/db.js';
import { requireSession } from '../../../server/auth.js';

export const prerender = false;

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Profile photo upload, replacing Supabase Storage with Vercel Blob.
 *
 * The upload happens server-side so the blob token is never exposed, and the target
 * path is derived from the session — a distributor cannot overwrite someone else's
 * photo by changing a path in the request.
 */
export const POST: APIRoute = async (context) => {
  try {
    const { session, error } = requireSession(context);
    if (error) return errorResponse(error, 401);

    if (!process.env?.BLOB_READ_WRITE_TOKEN) {
      return errorResponse(
        'La subida de fotos no está configurada. Falta BLOB_READ_WRITE_TOKEN.',
        503
      );
    }

    const form = await context.request.formData();
    const file = form.get('file');

    if (!(file instanceof File)) return errorResponse('No se recibió ningún archivo.', 400);
    if (!ALLOWED.includes(file.type)) {
      return errorResponse('Formato no permitido. Usa JPG, PNG o WEBP.', 415);
    }
    if (file.size > MAX_BYTES) {
      return errorResponse('La imagen supera el límite de 5MB.', 413);
    }

    const ext = file.type.split('/')[1]?.replace('jpeg', 'jpg') ?? 'jpg';
    const blob = await put(`distributors/${session!.code}/${Date.now()}.${ext}`, file, {
      access: 'public',
      contentType: file.type
    });

    const sql = getSql();
    await sql`UPDATE distributors SET photo_url = ${blob.url}, updated_at = NOW()
              WHERE code = ${session!.code}`;

    return jsonResponse({ photo_url: blob.url });
  } catch (error) {
    return handleServerError(error, 'me/photo');
  }
};
