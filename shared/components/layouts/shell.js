import {Component, h} from '../../modules'
import {Header, Loader, Main} from '../../components'


export default class extends Component {

    state = {isInit: false}

    // componentDidMount() {
    //     app$.observe(state => this.setState({...state}))
    //     init()
    // }

    render() {
        let {isInit} = this.state,
            dom = isInit
                ? [h(Header), h(Main)]
                : [h(Loader)]

        return h('shell', dom)
    }
}