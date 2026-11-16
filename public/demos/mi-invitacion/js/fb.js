/* Conexión falsa de la invitación (demostración): usa los datos en memoria de mock-fb.js. */
import { ref, get, set, onValue, serverTimestamp } from './mock-fb.js';
const listo = window.__fbListo;
const db = {};
const completo = (id, inv, r) => ({ ...inv, id, respuesta: r ? { ...r, fecha: new Date(r.fecha).toISOString() } : null });
listo.resolver({
  async obtener(id) {
    const [inv, resp] = await Promise.all([get(ref(db, `invitados/${id}`)), get(ref(db, `respuestas/${id}`))]);
    return inv.exists() ? completo(id, inv.val(), resp.val()) : null;
  },
  escuchar(id, alCambiar) {
    let inv; let resp; const ok = { i: false, r: false };
    const avisar = () => { if (ok.i && ok.r) alCambiar(inv ? completo(id, inv, resp) : null); };
    onValue(ref(db, `invitados/${id}`), (s) => { inv = s.val(); ok.i = true; avisar(); });
    onValue(ref(db, `respuestas/${id}`), (s) => { resp = s.val(); ok.r = true; avisar(); });
  },
  async guardar(id, d) {
    await set(ref(db, `respuestas/${id}`), { asistencia: d.asistencia, confirmados: d.confirmados, asistentes: d.asistentes || '', comentario: d.comentario || '', fecha: serverTimestamp() });
    return { ...d, fecha: new Date().toISOString() };
  },
  async guardarGeneral(d) {
    await set(ref(db, `generales/${d.telefono}`), { ...d, fecha: serverTimestamp() });
  },
});
