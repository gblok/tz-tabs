import {h} from '../../modules'

export const dummyChart = props => h('dl', {className: 'chart'}, [
    h('dt', 'Browser market share June 2015'),
    h('dd', {className: 'percentage percentage-11'}, [h('span', 'IE 11: 11.33%')]),
    h('dd', {className: 'percentage percentage-49'}, [h('span', 'Chrome: 49.77%')]),
    h('dd', {className: 'percentage percentage-16'}, [h('span', 'Firefox: 16.09%')]),
    h('dd', {className: 'percentage percentage-5'}, [h('span', 'Safari: 5.41%')]),
    h('dd', {className: 'percentage percentage-2'}, [h('span', 'Opera: 1.62%')]),
    h('dd', {className: 'percentage percentage-2'}, [h('span', 'Android 4.4: 2%')])
])