describe('OCNI application', function () {

  it('should load the site', function () {

    // Load the site.
    browser.get('http://localhost:3020');
    browser.driver.sleep(3000);

    var title = element(by.css('.navbar-brand .ng-scope'));

    expect(title.getText()).toContain('Convenios Ágiles');
  });
});