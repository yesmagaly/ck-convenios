describe('agreement', function(){
  it('should display descriptions fields', function() {
    var agreementMenu = element(by.cssContainingText('.navbar-nav .ng-binding', 'Convenios'));

    expect(agreementMenu.isPresent()).toBe(true);

    //Click agreement menu.
    agreementMenu.click();


    var newAgreementButton = element(by.cssContainingText('.ng-binding.btn-primary', 'Nuevo convenio'));

    expect(newAgreementButton.isPresent()).toBe(true);

     //Click New agreement button.
    newAgreementButton.click();

    var validateFields = [
      {
        fieldName: 'suscription_date',
        description: 'Ejm. 31/01/2014'
      },
      {
        fieldName: 'rectory_resolution',
        description: 'Ejm. 1807-2011-R-UNA | sin resolución'
      },
      {
        fieldName: 'validity',
        description: 'Ejm. 2 días | 15 meses | 5 años | 30/10/2014 | indefinido'
      }
    ];

    validateFields.forEach(function(itemElement) {
      var elementField = element(by.css('#element-type-agreement-' + itemElement.fieldName +' + p'));

      expect(elementField.isPresent()).toBe(true);
      expect(elementField.getText()).toContain(itemElement.description);
    });

    browser.driver.sleep(3000);

  });
});
