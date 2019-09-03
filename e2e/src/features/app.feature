Feature: Homepage
  When I navigate to the Home Page I see: a title, a version, the author's
  picture, the author's name, a side bar with a title and links to the examples

  Scenario: Page title
    Given I am on the home page
    When I do nothing
    Then I should see the title

  Scenario: Author's name
    Given I am on the home page
    When I do nothing
    Then I should see the author name
