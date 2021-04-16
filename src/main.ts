
type TBoolPred<TIn> = (param:TIn) => boolean
type TPred<TArg, TOut> = (param:TArg) => TOut

type TSort = <TArrItem>(fn?: (a?:TArrItem, b?:TArrItem) => number) => (arr:TArrItem[]) => TArrItem[]
type TSplit = (delimiter: string | RegExp) => (str:string) => string[]
type TThen = <TIn, TOut>(func:TPred<TIn, TOut>) => (promise:Promise<TIn>) => Promise<TOut>
// type TThenErrorCheck = <TIn>(errorCheck: TBoolPred<TIn>) => <TError>(setError: TPred<TIn,TError>) => (then: Promise<TIn>) => Promise<TIn>
type TTrace = (label:string) => <TVal>(value:TVal) => TVal


export const anyPass = (fns) => obj => pipe(
  map((x: (y:any) => any) => x(obj)),
  filter(x => x === true),
  x => x.length > 0
)(fns)
export const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x)
export const curry = func => {
  return function _curried(...args){
    return args.length >= func.length
          ? func.apply(this,args)
          : (...args2) => _curried.apply(this, args.concat(args2))
  }
}
export const filter = <TArrItem>(fn:TBoolPred<TArrItem>) => (arr:TArrItem[]) => arr.filter(fn)
export const filterAll = (filterPreds) => filter(anyPass(filterPreds))
export const flip = fn => a => b => fn(b)(a)
export const identity = <TVal>(val:TVal):TVal => val
export const includes = val => obj => obj.includes(val)
export const map = <TArrItemIn, TArrItemOut>(fn:TPred<TArrItemIn, TArrItemOut>) => (arr:TArrItemIn[]) => arr.map(fn)
export const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)
export const prop = (prop:string) => (obj:object) => obj[prop]
export const replace = pattern => replacement => (str:string) => str.replace(pattern, replacement)
export const split:TSplit = delimiter => str => str.split(delimiter)
export const sort:TSort = (fn?) => arr => [...arr].sort(fn)
export const then:TThen = func => promise => promise.then(func)
/**
 * 
 * @param {function} errCheck Usage: result:any => bool. Used to check the result of the previous promise. Returning false results in Promise.reject(). 
 * @param {*} setErr Usage: result:any => any. Use this to customize your error.
 * @returns Promise
 */
export const thenErrorCheck = <TIn>(errCheck: TBoolPred<TIn>) => <TError>(setErr: TPred<TIn,TError>) => then((res:TIn) => errCheck(res) ? Promise.reject(setErr(res)) : res)
export const toLowerCase = (str:string) => str.toLowerCase()
export const toUpperCase = (str:string) => str.toUpperCase()
export const trace:TTrace = label => value => {
  console.log(`[${ label }]:`)
  console.log(`${ value }`)
  return value
}
export const trim = (str:string) => str.trim()