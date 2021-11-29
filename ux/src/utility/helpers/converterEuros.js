
  export const changeToEuro = (value) => {
    const formatterEuro = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
   })
   return (formatterEuro.format(value))

  }   