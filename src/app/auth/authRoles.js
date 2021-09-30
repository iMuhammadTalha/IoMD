/**
 * Authorization Roles
 */
const authRoles = {
    admin: ['admin'],
    doctor: ['admin', 'doctor'],
    patient: ['admin', 'doctor', 'patient'],
    caretaker: ['admin', 'doctor', 'patient', 'caretaker'],
    all: ["admin", "doctor", "patient", "caretaker"],
    onlyGuest: ['guest']
};

export default authRoles;
