export const dateFormatter = (date: string) => {
  const dateString = new Date(date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  })

  return dateString
}
