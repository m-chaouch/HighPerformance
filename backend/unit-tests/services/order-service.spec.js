const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const { getOrdersOfEmployee } = require('../../src/services/order-service');

describe('Order Service Tests', function () {

    describe('getOrdersOfEmployee', function () {
        it('should return orders associated with a given employee', async function () {
            const orders = [
                { sellerID: '007', name: 'Order 1' },
                { sellerID: '008', name: 'Order 2' }
            ];

            const accounts = [
                { governmentId: '123456', UID: '007' },
                { governmentId: '654321', UID: '008' }
            ];

            const ordersOfEmployee = await getOrdersOfEmployee('123456', orders, accounts);

            expect(ordersOfEmployee).to.be.an('array').with.lengthOf(1);
            expect(ordersOfEmployee[0]).to.have.property('name', 'Order 1');

        });
    });
});
