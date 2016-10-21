class HideTabs {
  /* @ngInject */
  constructor($rootScope) {
    this.restrict = 'A'
    this.$rootScope = $rootScope
  }

  link(scope, element, attributes) {
    scope.$watch(attributes.hideTabs, (value) => {
      this.$rootScope.hideTabs = value
    })
  }

}

export default {
  selector: 'hideTabs',
  directive: HideTabs
}
