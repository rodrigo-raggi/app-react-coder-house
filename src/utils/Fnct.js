const clp = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });
export const formatPrice = (value) => clp.format(value || 0);
