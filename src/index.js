import { h, app } from 'hyperapp'
import { merge, isEmpty } from 'ramda'
import { fixContainerOnIE10 } from './element'
import './style.scss'

const model = {
    resolve: null,
    header: {
        text: ''
    },
    body: {
        text: ''
    },
    footer: {
        confirm: {
            text: '' 
        }
    }
}

const actions = {
    confirm: event => ({ parent, element, resolve }) => {
        if (parent) {
            parent.removeChild(element)
            resolve(true)
        }
    },
    cancel: reason => ({ parent, element, resolve }) => {
        if (parent) {
            parent.removeChild(element)
            resolve({dismiss: reason})
        }
    }
}

const Header = ( { text = '', className = '', style = {} } = {}) => {
    if (!text) {
        return null
    }

    return (
        <div class="header">
            {text}
        </div> 
    )
}

const Body = ( { text = '', ...props} ) => {
    if (!text) {
        return null
    }
    
    return (
        <div class="msg" oncreate={element => {element.innerHTML = '<div>' + text + '</div>' }}>
        </div>
    )
}

const Footer = ({ confirm = {}, actions} = {}) => {
    if (isEmpty(confirm)) {
        return null
    }

    return (
        <div class="footer">
            <ConfirmButton text={confirm.text} confirm={actions.confirm} {...confirm}/>
        </div>
    )
}

const ConfirmButton = ({ text = '', confirm, ...props} = {}) => {
    if (!text) {
        return null
    }

    return (
        <button 
            onclick={() => confirm()}
            class="ok">
            {text}
        </button>
    )
}

const view = (state, actions) => (
    <div 
        class='dialog'
        onclick={ event => event.stopPropagation() }>
        <div>
            <Header {...state.header} />
            <Body {...state.body}/>
            <Footer actions={actions} {...state.footer}/>
        </div>
    </div>
)

export default function ({ header = {}, body = {}, footer = {} } = {}) {
    if (isEmpty(body)) {
        return Promise.reject()
    }

    return new Promise((resolve) => {

        var overlay = overlayContext()
        var state = merge({
            resolve: resolve,
            header,
            body,
            footer
        }, overlay)
        var main = app(state, actions, view, fixContainerOnIE10(overlay.element));
    
        overlay.element.onclick = function () {
            main.cancel('overlay')
        }
    })
}

function overlayContext(options) {
    var n = document.createElement('div')
    n.className = 'alertify'

    var parent = document.body
    parent.appendChild(n)
    return {
        parent: parent,
        element: n
    }
}