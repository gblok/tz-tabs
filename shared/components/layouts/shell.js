import {app$, Component, h, init, store} from '../../modules'
import {Header, Loader, Error, Page} from '../../components'

export default class extends Component {

    state = {isInit: false}

    componentDidMount() {
        app$.observe(state => this.setState(state))
        init().catch(console.error)
    }

    render() {

        let {isInit} = this.state,
            dom = isInit
                ? [Header(), store.get('current') ? h(Page) : Error()]
                : [Header(), Loader()]

        return h('shell', dom)
    }
}