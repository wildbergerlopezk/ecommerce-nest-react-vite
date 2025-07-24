import { type Category } from '../types/category';

export async function getCategoryWithSubcategories(slug: string): Promise<Category> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${baseUrl}/categories/slug/${slug}`;

  console.log('[CategoryService] Realizando fetch a:', url);

  try {
    const res = await fetch(url);
    console.log('[CategoryService] Respuesta status:', res.status);

    if (!res.ok) {
      console.error('[CategoryService] Error HTTP:', res.status, res.statusText);
      throw new Error(`Error al obtener categoría (${res.status})`);
    }

    const data = await res.json();
    console.log('[CategoryService] Datos recibidos:', data);
    return data;
  } catch (error: any) {
    console.error('[CategoryService] Fallo en fetch:', error.message || error);
    throw error;
  }
}
