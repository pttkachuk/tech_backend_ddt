const getDataFormattata = () => {
  const d = new Date();
  const giorno = String(d.getDate()).padStart(2, '0');
  const mese = String(d.getMonth() + 1).padStart(2, '0');
  const anno = d.getFullYear();
  const ore = String(d.getHours()).padStart(2, '0');
  const minuti = String(d.getMinutes()).padStart(2, '0');

  return `${giorno}.${mese}.${anno}_${ore}.${minuti}`;
};

module.exports = { getDataFormattata };