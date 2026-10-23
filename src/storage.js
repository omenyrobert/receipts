// Invoices and receipts are kept in the browser's localStorage, one JSON
// array per collection. Records get the same fields the old backend added:
// an incrementing `id`, a `created_at` timestamp and a `total` per item.

function read(collection) {
  try {
    return JSON.parse(localStorage.getItem(collection)) || [];
  } catch {
    return [];
  }
}

function write(collection, records) {
  localStorage.setItem(collection, JSON.stringify(records));
}

// Newest first.
export function list(collection) {
  return read(collection).slice().reverse();
}

export function get(collection, id) {
  return read(collection).find((r) => String(r.id) === String(id)) || null;
}

// `start` is the first number handed out; `pad` zero-pads the id to that
// many digits (e.g. start 231, pad 4 -> "0231").
export function create(collection, payload, { start = 1, pad = 0 } = {}) {
  const records = read(collection);
  const last = records.reduce((max, r) => Math.max(max, Number(r.id) || 0), 0);
  const next = Math.max(last + 1, start);
  const id = pad ? String(next).padStart(pad, "0") : next;
  const record = {
    ...payload,
    id,
    created_at: new Date().toISOString(),
    items: (payload.items || []).map((i) => ({
      ...i,
      qty: Number(i.qty),
      unit_cost: Number(i.unit_cost),
      total: Number(i.qty) * Number(i.unit_cost),
    })),
  };
  records.push(record);
  write(collection, records);
  return record;
}
