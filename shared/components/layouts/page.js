import {Component, h, LazyComponent, store} from '../../modules'
import {Loader} from '../../components'

const tags_ = new Map

export default class extends Component {

    state = {isLoad: false, tag: null}

    componentWillReceiveProps() {
        this.setState({isLoad: false, tag: null})
    }

    loadPage(path, name) {

        const handle = tag => this.setState({isLoad: true, tag: tag[name]}, () => tags_.set(path, tag))

        tags_.has(path)
            ? handle(tags_.get(path))
            : LazyComponent(path, name)
                .then(handle)
                .catch(console.error)

    }

    render() {

        let {isLoad, tag} = this.state,
            current = store.get('current'),
            {title, path, id:name} = current,
            header = h('header', [h('h1', title)]),
            section = h('section', [isLoad ? h(tag) : Loader()])

        if (!isLoad)
            this.loadPage(path, name)

        return h('main', [header, section])
    }
}