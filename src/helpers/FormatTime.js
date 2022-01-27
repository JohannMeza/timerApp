export function format(date = '...') {
  let hora = date.substring(0,2),
    min = date.substr(-2);

  if (hora == 0) return `12:${min} a.m.`
  if (hora == 12) return `12:${min} p.m.`

  if (hora > 12 && min >= 0) return `0${Math.floor(hora - 12).toString()}`.substr(-2) + `:${min} p.m.`
  return `${hora}:${min} a.m.`
} 

export function wordLength (word, max = 5) {
  if (word.length <= max) return word
  return `${word.substring(0, max)}...`
}