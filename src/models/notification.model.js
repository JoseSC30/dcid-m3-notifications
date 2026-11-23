export function validateNotification({ to, order_id, tickets = [] } = {}) {
  if (typeof to !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(to))
    throw Object.assign(new Error("Correo inválido"), { status: 400 });
  if (typeof order_id !== "string" || !order_id.trim())
    throw Object.assign(new Error("Orden inválida"), { status: 400 });
  if (!Array.isArray(tickets) || tickets.some((t) => typeof t !== "string"))
    throw Object.assign(new Error("Entradas inválidas"), { status: 400 });
  return { to, order_id, tickets };
}
