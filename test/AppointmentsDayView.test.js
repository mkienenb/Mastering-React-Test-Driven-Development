import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {Appointment, AppointmentsDayView} from '../src/AppointmentsDayView';

describe('Appointment', () => {
    let customer;
    let container;
    const render = component => ReactDOM.render(component, container);

    beforeEach(() => {
        container = document.createElement('div');
    })

    it('renders the customer first name', () => {
        customer = {firstName: 'Ashley'};
        render(<Appointment customer={customer}/>);
        expect(container.textContent).toMatch(`Ashley`);
    });

    it('renders another customer first name', () => {
        customer = {firstName: 'Jordan'};
        render(<Appointment customer={customer}/>);
        expect(container.textContent).toMatch(`Jordan`);
    });
});

describe('AppointmentsDayView', () => {
    const today = new Date();
    const appointments = [
        {
            startsAt: today.setHours(12, 0),
            customer: {firstName: 'Ashley', lastName: 'Benton', phoneNumber: '123-5678'},
            stylist: 'Judy',
            service: 'Coloring'
        },
        {
            startsAt: today.setHours(13, 0),
            customer: {firstName: 'Jordan', lastName: 'Kline', phoneNumber: '321-9876'},
            stylist: 'Joe',
            service: 'Beard Trim'
        }
    ];
    let container;

    beforeEach(() => {
        container = document.createElement('div');
    });

    const render = component => ReactDOM.render(component, container);

    it('renders a div with the right id', () => {
        render(<AppointmentsDayView appointments={[]}/>);
        expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
    });

    it('renders multiple appointments in an ol element', () => {
        render(<AppointmentsDayView appointments={appointments}/>);
        expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
        expect(container.querySelector('ol').children).toHaveLength(2);
    });

    it('renders each appointment in an li', () => {
        render(<AppointmentsDayView appointments={appointments}/>);
        expect(container.querySelectorAll('li')).toHaveLength(2);
        expect(container.querySelectorAll('li')[0].textContent).toEqual('12:00');
        expect(container.querySelectorAll('li')[1].textContent).toEqual('13:00');
    });

    it('Initially shows a message that there are no appointments today', () => {
        render(<AppointmentsDayView appointments={[]}/>);
        expect(container.textContent).toMatch('There are no appointments scheduled for today.');
    });

    it('selects the first one by default', () => {
        render(<AppointmentsDayView appointments={appointments}/>);
        expect(container.textContent).toMatch('Ashley');
    });

    it('has a button element in each li element', () => {
        render(<AppointmentsDayView appointments={appointments}/>);
        expect(container.querySelectorAll('li > button')).toHaveLength(2);
        expect(container.querySelectorAll('li > button')[0].type).toEqual('button');
    });

    it('renders another appointment when selected', () => {
        render(<AppointmentsDayView appointments={appointments}/>);
        const button = container.querySelectorAll('button')[1];
        ReactTestUtils.Simulate.click(button);
        expect(container.textContent).toMatch('Jordan');
    });

    it('renders selected appointment in a table', () => {
        render(<AppointmentsDayView appointments={appointments}/>);
        expect(container.querySelectorAll('table #appointmentCustomerFirstName')[0].textContent).toMatch('Ashley');
    });

    it('renders last name for selected appointment', () => {
        render(<AppointmentsDayView appointments={appointments}/>);
        expect(container.querySelector('#appointmentCustomerLastName').textContent).toMatch('Benton');
    });

    it('renders phone number for selected appointment', () => {
        render(<AppointmentsDayView appointments={appointments}/>);
        expect(container.querySelector('#appointmentCustomerPhoneNumber').textContent).toMatch('123-5678');
    });

    it('renders stylist for selected appointment', () => {
        render(<AppointmentsDayView appointments={appointments}/>);
        expect(container.querySelector('#appointmentStylist').textContent).toMatch('Judy');
    });

    it('renders salon service for selected appointment', () => {
        render(<AppointmentsDayView appointments={appointments}/>);
        expect(container.querySelector('#appointmentService').textContent).toMatch('Coloring');
    });
});
