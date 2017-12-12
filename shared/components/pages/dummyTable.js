import {h} from '../../modules'

export const dummyTable =  ({tr = 10, td = 5}) =>
    h('table', Array.from({length: tr}, (_, i) => h('tr', [
            h('th', `th ${i}`),
            ...Array.from({length: td}, (_, k) => h('td', `td  ${i}-${k}`))
        ]))
    )