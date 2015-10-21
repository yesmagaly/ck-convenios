describe('OCNI application', function () {
  
  it('Load the site', function () {
    // Load the site.
    browser.get('http://localhost:3000');
    browser.driver.sleep(3000);
    
    var title = element(by.css('.navbar-brand .ng-scope'));

    expect(title.getText()).toContain('Convenios Ágiles');
  });
});