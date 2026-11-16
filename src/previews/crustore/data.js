// Datos de ejemplo para el preview de Crustore (no son datos reales de la app).
export const categories = ['Todo', 'Panadería', 'Bebidas', 'Comida', 'Postres', 'Artesanías']

export const banners = [
  { title: 'Pan recién horneado', text: 'Pídelo hoy en tiendas de tu zona', from: '#ff2e97', to: '#7548f0', icon: '🥖' },
  { title: 'Envío a domicilio', text: 'Compra sin salir de casa', from: '#00a9c2', to: '#7548f0', icon: '🛵' },
  { title: 'Promos de la semana', text: 'Descuentos en productos seleccionados', from: '#1f2430', to: '#ff2e97', icon: '🏷️' },
]

export const stores = [
  { id: 's1', name: 'Panadería La Espiga', cat: 'Panadería', rating: 4.8, total: 126, from: '#f5a300', to: '#ff7a3d', icon: '🥖', loc: 'Col. Centro, Zapopan', envio: true, wa: true },
  { id: 's2', name: 'Café del Barrio', cat: 'Bebidas', rating: 4.6, total: 88, from: '#7548f0', to: '#00a9c2', icon: '☕', loc: 'Col. Providencia', envio: true, wa: false },
  { id: 's3', name: 'Tamales Doña Chuy', cat: 'Comida', rating: 4.9, total: 203, from: '#ff2e97', to: '#f5a300', icon: '🫔', loc: 'Col. Americana', envio: false, wa: true },
  { id: 's4', name: 'Dulce Antojo', cat: 'Postres', rating: 4.7, total: 64, from: '#ff2e97', to: '#7548f0', icon: '🍰', loc: 'Col. Chapalita', envio: true, wa: true },
  { id: 's5', name: 'Manos de Barro', cat: 'Artesanías', rating: 4.5, total: 41, from: '#00a9c2', to: '#1f2430', icon: '🏺', loc: 'Tlaquepaque', envio: true, wa: false },
]

// stock: 'ok' | 'agotado' | 'pedido' | 'pausada'
export const products = [
  { id: 'p1', name: 'Pan de elote', cat: 'Panadería', store: 'Panadería La Espiga', price: 45, promo: 38, rating: 4.8, total: 52, stock: 'ok', icon: '🥖', from: '#f5a300', to: '#ffd27a' },
  { id: 'p2', name: 'Concha de vainilla', cat: 'Panadería', store: 'Panadería La Espiga', price: 18, rating: 4.7, total: 31, stock: 'ok', icon: '🥐', from: '#ff7a3d', to: '#ffd27a' },
  { id: 'p3', name: 'Café de olla', cat: 'Bebidas', store: 'Café del Barrio', price: 35, rating: 4.6, total: 44, stock: 'ok', icon: '☕', from: '#7548f0', to: '#c4b0ff' },
  { id: 'p4', name: 'Horchata grande', cat: 'Bebidas', store: 'Café del Barrio', price: 40, promo: 32, rating: 4.5, total: 19, stock: 'ok', icon: '🥛', from: '#00a9c2', to: '#a8f0fa' },
  { id: 'p5', name: 'Tamales de rajas (docena)', cat: 'Comida', store: 'Tamales Doña Chuy', price: 210, rating: 4.9, total: 97, stock: 'pedido', icon: '🫔', from: '#ff2e97', to: '#ffb3d6' },
  { id: 'p6', name: 'Pozole rojo', cat: 'Comida', store: 'Tamales Doña Chuy', price: 95, rating: 4.8, total: 60, stock: 'ok', icon: '🍲', from: '#ff3d3d', to: '#ffb3b3' },
  { id: 'p7', name: 'Pastel de tres leches', cat: 'Postres', store: 'Dulce Antojo', price: 380, rating: 4.7, total: 28, stock: 'pedido', icon: '🍰', from: '#ff2e97', to: '#ffd6ea' },
  { id: 'p8', name: 'Brownie con nuez', cat: 'Postres', store: 'Dulce Antojo', price: 32, rating: 4.6, total: 22, stock: 'agotado', icon: '🍫', from: '#7a4a2a', to: '#c99a6b' },
  { id: 'p9', name: 'Jarrón de barro', cat: 'Artesanías', store: 'Manos de Barro', price: 520, rating: 4.5, total: 12, stock: 'ok', icon: '🏺', from: '#00a9c2', to: '#a8f0fa' },
  { id: 'p10', name: 'Taza pintada a mano', cat: 'Artesanías', store: 'Manos de Barro', price: 130, promo: 110, rating: 4.4, total: 9, stock: 'pausada', icon: '🍵', from: '#7548f0', to: '#c4b0ff' },
]
