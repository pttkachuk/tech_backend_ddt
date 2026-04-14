const d = new Date();

// Formattazione manuale con padStart per avere sempre due cifre (es. 05 invece di 5)
const giorno = String(d.getDate()).padStart(2, '0');
const mese = String(d.getMonth() + 1).padStart(2, '0');
const anno = d.getFullYear();
const ore = String(d.getHours()).padStart(2, '0');
const minuti = String(d.getMinutes()).padStart(2, '0');

export const dataFormattata = `${giorno}.${mese}.${anno}_${ore}.${minuti}`;