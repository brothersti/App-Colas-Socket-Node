//Referencias HTML
const lblEscritorio = document.querySelector('h1')
const btnAtender = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlerta = document.querySelector('.alert')
const lblPendientes = document.querySelector('#lblPendientes')




const searchParams = new URLSearchParams(window.location.search)


//Validar que el escritorio existe
if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio')
}


const escritorio = searchParams.get('escritorio')
lblEscritorio.innerText = escritorio


const socket = io();


socket.on('connect', () => {
    btnAtender.disabled = false
});

socket.on('disconnect', () => {
    btnAtender.disabled = true
});

socket.on('tickets-pendientes', (pendientes) => {
    if (pendientes === 0) {
        lblPendientes.style.display = 'none'
        divAlerta.style.display = ''
    } else {
        divAlerta.style.display = 'none'
        lblPendientes.style.display = ''
        lblPendientes.innerText = pendientes
    }
})


btnAtender.addEventListener('click', () => {

    socket.emit('atender-ticket', { escritorio }, ({ ok, msg, ticket }) => {
        if (!ok) {
            lblTicket.innerText = `Nadie`
            return divAlerta.style.display = ''
        }
        lblTicket.innerText = `Ticket ${ticket.numero}`
    });

});