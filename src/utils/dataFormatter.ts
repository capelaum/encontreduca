export const dateFormatter = (date: string) => {
  const dateString = new Date(date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo'
  })

  return dateString
}
