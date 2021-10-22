
import Swal from "sweetalert2"
const object = {}
export const handleSelectCarrier = async (Carriers) => {

    const carr = Carriers.reduce(
        (obj, item) => Object.assign(obj, { [item.value]: item.label }), {})

    return await Swal.fire({
        title: 'Selecciona un conductor',
        icon: 'question',
        width: '',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: '¡Seleccionar!',
        input: 'select',
        inputOptions: carr,
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-danger ml-1',
            input: 'inline-flex',
            inputLabel: 'inline-flex'
        },
        buttonsStyling: false
    })
        .then(result => {
            if (result.value) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Genial!',
                    text: '¡El transportista ha sido seleccionado!',
                    timer: 3000,
                    timerProgressBar: true,
                    customClass: {
                        confirmButton: 'btn btn-success'
                    }
                })
                return result.value
            } else if (result.dismiss === Swal.DismissReason.cancel) {

                Swal.fire({
                    title: '¡Cancelado!',
                    text: '¡No has seleccionado ningún transportista!',
                    icon: 'error',
                    timer: 3000,
                    timerProgressBar: true,
                    customClass: {
                        confirmButton: 'btn btn-success'
                    }
                })
                return false
            }
        })

}