beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Test suite for visual tests for registration form 3 is already created
* Create tests to verify visual parts of the page:
    * radio buttons and its content 
    * dropdown and dependencies between 2 dropdowns 
    * checkboxes, their content and links
    * email format
 */

describe('Bonus tests 1', () => {
    it('Radio buttons and its contents are working', () => {
        cy.get('input[type="radio"]').should('have.length', 4)
        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Country dropdown is working properly', () => {
        cy.get('#country').find('option').should('have.length', 4)
        //Checking that the first option does not have text
        cy.get('#country').find('option').eq(0).should('have.text', '')
        //Checking that the rest of the options show the correct text/option
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        cy.get('#country').find('option').eq(3).should('have.text', 'Austria')

        // Advanced level
        cy.get('#country').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'object:3', 'object:4', 'object:5'])
        })
    })

    it('Dropdown of specific countries and cities(Spain)', () => {
        cy.get('#country').select('Spain')
        //Taking a screenshot of the full page
        cy.screenshot('Full page screenshot')
        //Checking how many options are available
        cy.get('#city').find('option').should('have.length', 5)
        //Checking that the first option does not have text
        cy.get('#city').find('option').eq(0).should('have.text', '')
        //Checking rest of the options
        cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
        cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
        cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
        cy.get('#city').find('option').eq(4).should('have.text', 'Corralejo')
    })

    it('Dropdown of specific countries and cities(Estonia)', () => {
        cy.get('#country').select('Estonia')
        //Taking a screenshot of the full page
        cy.screenshot('Full page screenshot')
        //Checking how many options are available
        cy.get('#city').find('option').should('have.length', 4)
        //Checking that the first option does not have text
        cy.get('#city').find('option').eq(0).should('have.text', '')
        //Checking rest of the options
        cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
        cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
        cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')
    })

    it('Dropdown of specific countries and cities(Austria)', () => {
        cy.get('#country').select('Austria')
        //Taking a screenshot of the full page
        cy.screenshot('Full page screenshot')
        //Checking how many options are available
        cy.get('#city').find('option').should('have.length', 4)
        //Checking that the first option does not have text
        cy.get('#city').find('option').eq(0).should('have.text', '')
        //Checking rest of the options
        cy.get('#city').find('option').eq(1).should('have.text', 'Vienna')
        cy.get('#city').find('option').eq(2).should('have.text', 'Salzburg')
        cy.get('#city').find('option').eq(3).should('have.text', 'Innsbruck')
    })

    it('Checking checkboxes, their content and links', () => {
        //How many checkboxes are visible
        cy.get('input[type="checkbox"]').should('have.length', 2)
        //When both are checked, the first checkbox stays checked, too
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        //confirming the text for the link
        cy.get('button').should('have.text', 'Accept our cookie policy')
        //When clicked, the page redirects to the correct url with correct content.
        cy.get('button').children().should('be.visible').and('have.attr', 'href', 'cookiePolicy.html').click()
        cy.url().should('contain', '/cookiePolicy.html')
        //Going back to the original form
        cy.go('back')
        cy.log('Back on registration form 3')

    })
    it('Email format checking', () => {
        cy.get('input[type="email"]').type('testing')
        //Checking if the form presents the "invalid email" error message
        cy.get('[ng-show="myForm.email.$error.email"]').should('be.visible').should('contain', 'Invalid email address.')
        //Checking if the form presents the "email is required" error message
        cy.get('input[type="email"]').clear('')
        cy.get('[ng-show="myForm.email.$error.required"]').should('be.visible').should('contain', 'Email is required.')
        //Checking if a valid email gives no errors
        cy.get('input[type="email"]').type('sten392@gmail.com')
        cy.get('[ng-show="myForm.email.$error.email"]').should('not.be.visible')
    })
})

/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (try using function)
    * If city is already chosen and country is updated, then city choice should be removed
    * add file (google yourself for solution)
 */
describe('Bonus tests 2', () => {
    it('All fields are filled in and their validation', () => {
        cy.get('[name="name"]').clear('').type('Sten Aju')
        cy.get('input[type="email"]').type('sten392@gmail.com')
        cy.get('#country').select('Estonia')
        cy.get('#city').find('option')
        cy.get('#city').select('Tallinn')
        cy.get('[type="date"]').eq(0).click().type('1996-05-01').should('have.value', '1996-05-01')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('#birthday').first().click().type('1996-05-01').should('have.value', '1996-05-01')
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        cy.get('input[type="submit"]').last().should('not.be.disabled')
    })

    it('Only mandatory fields are filled and validations', () => {  
        cy.get('[name="email"]').type('sten392@gmail.com')
        cy.get('#country').select('Austria')
        cy.get('#city').select('Vienna')
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')   
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="submit"]').last().should('be.visible')
        cy.get('[ng-disabled="myForm.$invalid"]').should('not.have.attr', 'disabled')
    })
    it('Mandotary fields are absent with the help of Function', () => {
        cy.log('Using InputValidData function and removing mandotary fields in the rest of the code')
        inputValidData('Sten Aju')
        cy.get('[name="email"]').clear('')
        //Confirming if the error message is visible once the field is cleared
        cy.get('[ng-show="myForm.email.$error.required"]').should('be.visible').should('contain', 'Email is required.')
        cy.get('#birthday').clear('')
        cy.get('#country').select('')
        cy.get('input[type="checkbox"]').eq(0).uncheck()
        cy.get('input[type="checkbox"]').eq(1).uncheck()
        //Checking if the last submit button is disabled
        cy.get('input[type="submit"]').last().should('be.disabled')
    })
    
    it('Clears "city" on country change', () => {
        cy.get('#country').select('Estonia')
        //Taking a screenshot of the full page
        cy.get('#city').select('Tartu')
        cy.get('#country').select('Spain')
        cy.get('#city').should('not.be.selected')

    })

    it('uploading test file', () => {
        cy.get('#myFile').selectFile('load_this_file_reg_form_3.txt')
        cy.get('input[type="submit"]').first().click()
        cy.go('back')
        cy.log('Back on registration form 3')
    })
})

function inputValidData(Name) {
    cy.get('[name="name"]').clear('').type(Name)
        cy.get('input[type="email"]').type('sten392@gmail.com')
        cy.get('#country').select('Estonia')
        cy.get('#city').find('option')
        cy.get('#city').select('Tallinn')
        cy.get('[type="date"]').eq(0).click().type('1996-05-01').should('have.value', '1996-05-01')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('#birthday').first().click().type('1996-05-01').should('have.value', '1996-05-01')
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        cy.get('input[type="submit"]').last().should('not.be.disabled')
}