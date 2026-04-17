function transform(data) {
  const ddtIndex = {};
  let counter = 1;

  console.log("LENGTH DATA:", data.length);
  console.log("DATA FULL:", data);

  const today = new Date().toLocaleDateString("it-IT");

  return data.map((row)=>{
    const num_ddt = row.C;
    const data_ddt = row.D;
    const descrizione = row.F;
    const qta = Number(row.H);
    const prezzo = parseFloat(row.K.toString().replace(",", "."));

      if (!ddtIndex[num_ddt]) {
        ddtIndex[num_ddt] = counter;
        counter++;
      }
  
  const prezzoNetto = qta ? prezzo / qta : 0;

  return{
    A: today,
    B: "DDTBA",
    C: ddtIndex[num_ddt],
    G: descrizione,
    H: qta,
    I: prezzoNetto,
    R: num_ddt,
    T: data_ddt, 
    U: "11499670963"
  }
  })
}

module.exports = transform;