#!/usr/bin/env node

const curry = func => {
  return function _curried(...args){
    return args.length >= func.length
           ? func.apply(this,args)
           : (...args2) => _curried.apply(this, args.concat(args2))
  }
}
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x)
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)
const trace = label => value => {
  console.log(`${ label }: ${ value }`)
  return value
}
const flip = fn => a => b => fn(b)(a)
const map = fn => arr => arr.map(fn)
const sort = fn => arr => [...arr].sort(fn)
const filter = fn => arr => arr.filter(fn)
const prop = prop => obj => obj[prop]

module.exports = {
  curry,
  compose,
  pipe,
  trace,
  flip,
  map,
  sort,
  filter,
  prop
}