import _ from 'lodash'
import React from 'react'
import { render } from 'react-dom'

import App from './compositions/app'

render(App(), document.getElementById('app'))

if (import.meta.hot) {
  import.meta.hot.accept()

  document
    .getElementById('link:css')
    .setAttribute('href', `${window.location.href}style.css?ts=${Date.now()}`)
}
