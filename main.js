
const anyPass = (fns) => obj => pipe(
  map(x => x(obj)),
  filter(x => x === true),
  x => x.length > 0
)(fns)
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x)
const curry = func => {
  return function _curried(...args){
    return args.length >= func.length
          ? func.apply(this,args)
          : (...args2) => _curried.apply(this, args.concat(args2))
  }
}
const filter = fn => arr => arr.filter(fn)
const filterAll = filterPreds => filter(anyPass(filterPreds))
const flip = fn => a => b => fn(b)(a)
const identity = val => val
const includes = val => obj => obj.includes(val)
const map = fn => arr => arr.map(fn)
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)
const prop = prop => obj => obj[prop]
const replace = pattern => replacement => str => str.replace(pattern, replacement)
const split = delimiter => str => str.split(delimiter)
const sort = fn => arr => [...arr].sort(fn)
const then = func => promise => promise.then(func)
/**
 * 
 * @param {function} errCheck Usage: result:any => bool. Used to check the result of the previous promise. Returning false results in Promise.reject(). 
 * @param {*} setErr Usage: result:any => any. Use this to customize your error.
 * @returns Promise
 */
const thenErrorCheck = (errCheck, setErr) => then(res => errCheck(res) ? Promise.reject(setErr(res)) : res)
const toLowerCase = str => str.toLowerCase()
const trace = label => value => {
  console.log(`[${ label }]:`)
  console.log(`${ value }`)
  return value
}
const trim = str => str.trim()


module.exports = {
  anyPass,
  compose,
  curry,
  filter,
  filterAll,
  flip,
  identity,
  includes,
  map,
  pipe,
  prop,
  replace,
  sort,
  split,
  then,
  thenErrorCheck,
  toLowerCase,
  trace,
  trim,
}