//import 'babel-polyfill'

import {h, render} from '../shared/modules'
import {Shell} from '../shared/components'
import {InitProps, root} from '../.etc/config'
render(h(Shell, InitProps), root())
