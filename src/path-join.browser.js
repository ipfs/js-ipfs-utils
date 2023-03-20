
/**
 * @param {string[]} args
 */
export default function join (...args) {
  if (args.length === 0) {
    return '.'
  }

  return args.join('/')
}
