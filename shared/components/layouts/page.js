import {Component, h, store} from '../../modules'
import {Loader} from '../../components'

const tags_ = new Set

function loadList() {
    return import(
        /* webpackChunkName: 'dummyList' */
        /* webpackMode: "lazy" */
        '../pages/dummyList')
}

function loadChart() {
    return import(
        /* webpackChunkName: 'dummyChart' */
        /* webpackMode: "lazy" */
        '../pages/dummyChart')
}

function loadTable() {
    return import(
        /* webpackChunkName: 'dummyTable' */
        /* webpackMode: "lazy" */
        '../pages/dummyTable')
}


export default class extends Component {

    state = {isLoad: false, tag: null}

    componentWillReceiveProps() {
        this.setState({isLoad: false, tag: null})
    }

    loadPage(path) {

        const handleTag = tag => this.setState({isLoad: true, tag: tag.default}, () => tags_.add(path))

        if (tags_.has(path)) {

            handleTag(tags_.get(path))

        } else {

            switch (path) {
                case 'dummyTable':
                    loadList().then(handleTag)
                    break
                case 'dummyChart':
                    loadChart().then(handleTag)
                    break
                case 'dummyList':
                    loadTable().then(handleTag)
                    break
            }
        }

    }

    render() {

        let {isLoad, tag} = this.state,
            current = store.get('current'),
            {title, path} = current,
            header = h('header', [h('h1', title)]),
            section = h('section', [isLoad ? h(tag) : Loader()])

        if (!isLoad)
            this.loadPage(path)

        return h('main', [header, section])
    }
}