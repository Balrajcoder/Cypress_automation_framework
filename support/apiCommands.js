/**
 * Custom API request command.
 * @module ApiCommands
 */

/**
 * Sends an API request.
 * @param {string} methodName - The HTTP method (e.g., GET, POST, PUT, DELETE)
 * @param {string} url - The URL of the API endpoint
 * @param {Object} requestBody - The request body
 * @param {Object} headerBody - The request headers
 * @param {Object} params - The query parameters
 * @returns {Promise} The API response
 */
Cypress.Commands.add("ApiRequest", (methodName, url, requestBody, headerBody, params) => {
    return cy.request({
        method: methodName,
        url: url,
        headers: headerBody,
        params: params,
        body: requestBody,
        failOnStatusCode: false
    });
});

Cypress.Commands.add('sendRequest', (method, url, params) => {
    cy.clearCookies();
    cy.request({
        method,
        url,
        headers: {
            accept: 'application/json',
            authorization: Cypress.env('authToken'),
            origin: Cypress.env('originReferer'),
            referer: `${Cypress.env('originReferer')}/`
        },
        ...params
    }).then((response) => {
        expect(response.status).to.be.oneOf([200, 201, 202]);
        expect(response.body).to.not.be.empty;
        Cypress.env('apiResponse', response);
    })
    return this;
});
