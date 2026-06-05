const params = new URLSearchParams(window.location.search);
 
const fields = [
    { param: 'firstName', id: 'display-firstName' },
    { param: 'lastName',  id: 'display-lastName' },
    { param: 'email',     id: 'display-email' },
    { param: 'phone',     id: 'display-phone' },
    { param: 'orgName',   id: 'display-orgName' },
    { param: 'timestamp', id: 'display-timestamp' },
];
 
fields.forEach(field => {
    const element = document.querySelector(`#${field.id}`);
    if (element) {
        element.textContent = params.get(field.param) || 'Not provided';
    }
});
 