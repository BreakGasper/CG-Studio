/* Firebase falso en memoria para la demostración: no se conecta a ningún servidor real. */
const datos = await fetch(new URL('../demo-data.json', import.meta.url)).then((r) => r.json());
const oyentes = [];
const partes = (p) => p.split('/').filter(Boolean);
const leer = (p) => partes(p).reduce((o, k) => (o == null ? o : o[k]), datos) ?? null;
function escribir(p, v) {
  const ks = partes(p);
  let o = datos;
  ks.slice(0, -1).forEach((k) => { o[k] = o[k] ?? {}; o = o[k]; });
  if (v === null) delete o[ks[ks.length - 1]]; else o[ks[ks.length - 1]] = v;
}
const snap = (p) => { const v = structuredClone(leer(p)); return { val: () => v, exists: () => v != null }; };
const avisar = () => oyentes.forEach(({ p, cb }) => cb(snap(p)));
export const initializeApp = () => ({});
export const getDatabase = () => ({});
export const ref = (db, p = '') => ({ p, key: partes(p).pop() });
export function onValue(r, cb) { oyentes.push({ p: r.p, cb }); setTimeout(() => cb(snap(r.p))); return () => {}; }
export async function get(r) { return snap(r.p); }
export async function set(r, v) { escribir(r.p, v); avisar(); }
export async function update(r, obj) { Object.entries(obj).forEach(([k, v]) => escribir(`${r.p}/${k}`, v)); avisar(); }
export function push(r) { const key = `n${Math.random().toString(36).slice(2, 8)}`; return { p: `${r.p}/${key}`, key }; }
export async function remove(r) { escribir(r.p, null); avisar(); }
export const serverTimestamp = () => Date.now();
/* Autenticación falsa: cualquier teléfono y contraseña entran. */
let usuario = { email: 'demo@invitacion.example' };
const cbs = [];
const emitir = () => cbs.forEach((f) => f(usuario));
export const getAuth = () => ({});
export function onAuthStateChanged(a, cb) { cbs.push(cb); setTimeout(() => cb(usuario)); }
export async function signInWithEmailAndPassword(a, correo) { usuario = { email: correo }; emitir(); }
export const createUserWithEmailAndPassword = signInWithEmailAndPassword;
export async function signOut() { usuario = null; emitir(); }
