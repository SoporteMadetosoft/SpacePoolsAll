
export const setCurrency = (value) => {
  const formatterEuro = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  })
  return (formatterEuro.format(value))

}