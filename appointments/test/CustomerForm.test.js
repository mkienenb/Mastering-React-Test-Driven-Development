import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import { createContainer } from "./domManipulators";
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
    const expectToBeInputFieldOfTypeText = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    }

    const itRendersAsATextBox = (fieldName) => {
        it('renders the field as a text box', () => {
            render(<CustomerForm/>);
            expectToBeInputFieldOfTypeText(field(fieldName));
        });
    }

    const itIncludesTheExistingValueFOrTheTextBox = (fieldName) => {
        it('includes the existing value for the textField', () => {
            render(<CustomerForm { ...{[fieldName]: "someValue"} } />);
            expect(field(fieldName).value).toEqual('someValue');
        });
    }
    const itRendersALabelForTheTextField = (fieldName, fieldLabelText) => {
        it('renders a label for the textField', () => {
            render(<CustomerForm/>);
            expect(labelFor(fieldName)).not.toBeNull();
            expect(labelFor(fieldName).textContent).toEqual(fieldLabelText);
        })
    };
    const itAssignsAnIdThatMatchesTheLabelIdToTheTextField = (fieldName, fieldId) => {
        it('assigns an id that matches the label id to the textField', () => {
            render(<CustomerForm/>);
            expect(field(fieldName).id).toEqual(fieldId);
        });
    }
    const itSavesExistingFieldValueWhenSubmitted = (fieldName) => {
        it('saves existing field value when submitted', async () => {
            expect.hasAssertions();
            render(
                <CustomerForm
                    { ...{ [fieldName]: "existingValue" } }
                    onSubmit={props =>
                        expect(props[fieldName]).toEqual('existingValue')
                    }
                />
            );
            await ReactTestUtils.Simulate.submit(form('customer'));
        });
    }

    const itSavesNewFieldValueWhenSubmitted = (fieldName, newValue) => {
        it('saves new field value when submitted', async () => {
            expect.hasAssertions();
            render(
                <CustomerForm
                    { ...{ [fieldName]: "existingValue" } }
                    onSubmit={ props =>
                        expect(props[fieldName]).toEqual(newValue)
                    }
                />
            );
            await ReactTestUtils.Simulate.change(field(fieldName), {
                target: {value: newValue}
            });
            await ReactTestUtils.Simulate.submit(form('customer'));
        });
    }

    let render, container;

    beforeEach(() => {
        ({ render, container } = createContainer());
    });
    const form = id => container.querySelector(`form[id="${id}"]`);
    const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);

    const field = name => form('customer').elements[name];

    it('renders a form', ()=> {
        render(<CustomerForm />)
        expect(form('customer')).not.toBeNull();
    });

    describe('first name field', () => {
        itRendersAsATextBox('firstName');
        itIncludesTheExistingValueFOrTheTextBox('firstName');
        itRendersALabelForTheTextField('firstName', 'First name');
        itAssignsAnIdThatMatchesTheLabelIdToTheTextField('firstName', 'firstName');
        itSavesExistingFieldValueWhenSubmitted('firstName');
        itSavesNewFieldValueWhenSubmitted('firstName', 'Jamie');
    })

    describe('last name field', () => {
        itRendersAsATextBox('lastName');
        itIncludesTheExistingValueFOrTheTextBox('lastName');
        itRendersALabelForTheTextField('lastName', 'Last name');
        itAssignsAnIdThatMatchesTheLabelIdToTheTextField('lastName', 'lastName');
        itSavesExistingFieldValueWhenSubmitted('lastName');
        itSavesNewFieldValueWhenSubmitted('lastName', 'Smith');
    })

    describe('phone number field', () => {
        itRendersAsATextBox('phoneNumber');
        itIncludesTheExistingValueFOrTheTextBox('phoneNumber');
        itRendersALabelForTheTextField('phoneNumber', 'Phone number');
        itAssignsAnIdThatMatchesTheLabelIdToTheTextField('phoneNumber', 'phoneNumber');
        itSavesExistingFieldValueWhenSubmitted('phoneNumber');
        itSavesNewFieldValueWhenSubmitted('phoneNumber', '5551212');
    })

    describe('stylist field', () => {
        itRendersAsATextBox('stylist');
        itIncludesTheExistingValueFOrTheTextBox('stylist');
        itRendersALabelForTheTextField('stylist', 'Stylist');
        itAssignsAnIdThatMatchesTheLabelIdToTheTextField('stylist', 'stylist');
        itSavesExistingFieldValueWhenSubmitted('stylist');
        itSavesNewFieldValueWhenSubmitted('stylist', 'Joanne');
    })

    describe('service field', () => {
        itRendersAsATextBox('service');
        itIncludesTheExistingValueFOrTheTextBox('service');
        itRendersALabelForTheTextField('service', 'Service');
        itAssignsAnIdThatMatchesTheLabelIdToTheTextField('service', 'service');
        itSavesExistingFieldValueWhenSubmitted('service');
        itSavesNewFieldValueWhenSubmitted('service', 'haircut');
    })

    describe('notes field', () => {
        itRendersAsATextBox('notes');
        itIncludesTheExistingValueFOrTheTextBox('notes');
        itRendersALabelForTheTextField('notes', 'Notes');
        itAssignsAnIdThatMatchesTheLabelIdToTheTextField('notes', 'notes');
        itSavesExistingFieldValueWhenSubmitted('notes');
        itSavesNewFieldValueWhenSubmitted('notes', 'fussy');
    })
});