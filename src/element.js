import { isIE10 } from './ie'

export function fixContainerOnIE10(element) {
    if (isIE10() && element && !element.children[0]) {
        element.children[0] = null
    }
    return element
}