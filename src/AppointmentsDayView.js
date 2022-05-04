import React, {useState} from 'react';

const appointmentTimeOfDay = startsAt => {
    const [h, m] = new Date(startsAt).toTimeString().split(':');
    return `${h}:${m}`;
    // return "12:00";
}

export const Appointment = ({startsAt, customer, stylist, service, notes}) => <div>
    <span id="appointmentHeader">
        Today's appointment at {appointmentTimeOfDay(startsAt)}
    </span>
    <table>
        <tbody>
        <tr>
            <td>
                Customer first name:
            </td>
            <td id="appointmentCustomerFirstName">
                {customer.firstName}
            </td>
        </tr>
        <tr>
            <td>
                Customer last name:
            </td>
            <td id="appointmentCustomerLastName">
                {customer.lastName}
            </td>
        </tr>
        <tr>
            <td>
                Customer Phone Number:
            </td>
            <td id="appointmentCustomerPhoneNumber">
                {customer.phoneNumber}
            </td>
        </tr>
        <tr>
            <td>
                Stylist:
            </td>
            <td id="appointmentStylist">
                {stylist}
            </td>
        </tr>
        <tr>
            <td>
                Service:
            </td>
            <td id="appointmentService">
                {service}
            </td>
        </tr>
        <tr>
            <td>
                Notes:
            </td>
            <td id="appointmentNotes">
                {notes}
            </td>
        </tr>
        </tbody>
    </table>
</div>;

export const AppointmentsDayView = ({appointments}) => {
    const [selectedAppointment, setSelectedAppointment] = useState(
        0
    );
    return (
        <div id="appointmentsDayView">
            <ol>
                {appointments.map((appointment, i) => (
                    <li key={appointment.startsAt}>
                        <button
                            type="button"
                            onClick={() => setSelectedAppointment(i)}>
                            {appointmentTimeOfDay(appointment.startsAt)}
                        </button>
                    </li>
                ))}
            </ol>
            {appointments.length === 0 ? (
                <p>There are no appointments scheduled for today.</p>
            ) : (
                <Appointment {...appointments[selectedAppointment]} />
            )}
        </div>
    );
};