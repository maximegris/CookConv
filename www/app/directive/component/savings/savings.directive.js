import template from './tab-savings.html'

class Savings {
  constructor() {
    this.restrict = 'E'
    this.scope = {}
    this.template = template
    this.controller = SavingsController
    this.controllerAs = 'savingsvm'
    this.bindToController = true
  }
}

class SavingsController {
  /* @ngInject */
  constructor(SavingsService) {
    var vm = this
    vm.removeSaving = removeSaving

    activate()

    function activate() {
      SavingsService.getSavings().then((_savings) => {
        vm.savings = _savings
      })
    }

    function removeSaving($index, saving) {
      SavingsService.removeSaving(saving).then(() => {
        vm.savings.splice($index, 1)
      })
    }
  }
}

export default {
  selector: 'savings',
  directive: Savings
}
