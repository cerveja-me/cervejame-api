export function generateVoucher (name) {
  const characters = 'abcdefghijklmnopqrstuvwxyz'
  const prelude = 'cvj-'

  let code = prelude + characters.charAt(Math.floor(Math.random() * characters.length))

  const splitName = name.split(' ')

  for (let i = 0; i < splitName.length; i++) {
    code += splitName[i].charAt(0)
  }

  for (let i = code.length; i <= 9; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return code.substring(0, 9)
}
