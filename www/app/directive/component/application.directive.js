import template from './app.html'

class Application {
  constructor() {
    this.restrict = 'E'
    this.scope = {}
    this.template = template
    this.controller = ApplicationController
    this.controllerAs = 'appvm'
    this.bindToController = true
  }
}

class ApplicationController {

}

export default {
  selector: 'application',
  directive: Application
}
