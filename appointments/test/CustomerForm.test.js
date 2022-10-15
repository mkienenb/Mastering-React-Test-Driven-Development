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
        it('renders the first name field as a text box', () => {
            render(<CustomerForm/>);
            expectToBeInputFieldOfTypeText(field(fieldName));
        });
    }

    const itIncludesTheExistingValueFOrTheTextBox = (fieldName) => {
        it('includes the existing value for the first name', () => {
            render(<CustomerForm { ...{[fieldName]: "someValue"} } />);
            expect(field(fieldName).value).toEqual('someValue');
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

        it('renders a label for the first name field', () => {
            render(<CustomerForm />);
            expect(labelFor('firstName')).not.toBeNull();
            expect(labelFor('firstName').textContent).toEqual('First name');
        });

        it('assigns an id that matches the label id to the first name field', () => {
            render(<CustomerForm />);
            expect(field('firstName').id).toEqual('firstName');
        });

        it('saves existing first name when submitted', async () => {
            expect.hasAssertions();
            render(
                <CustomerForm
                    firstName="Ashley"
                    onSubmit ={({ firstName }) =>
                        expect(firstName).toEqual('Ashley')
                    }
                />
            );
            await ReactTestUtils.Simulate.submit(form('customer'));
        });

        it('saves new first name when submitted', async () => {
            expect.hasAssertions();
            render(
                <CustomerForm
                    firstName="Ashley"
                    onSubmit ={({ firstName }) =>
                        expect(firstName).toEqual('Jamie')
                    }
                />
            );
            await ReactTestUtils.Simulate.change(field('firstName'), {
                target: { value: "Jamie" }
            });
            await ReactTestUtils.Simulate.submit(form('customer'));
        });
    })
});