import { browser } from '@wdio/globals'

export default class Page {
    /**
    * Opens page or a sub page
    * @param path path of the sub page (e.g. /path/to/page.html), default ''
    */
    public open (path: string='') {
        return browser.url(`https://www.saucedemo.com/${path}`)
    }
}
