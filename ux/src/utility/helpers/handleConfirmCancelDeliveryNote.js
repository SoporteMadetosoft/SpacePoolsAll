
import Swal from "sweetalert2"

export const handleConfirmCancelDeliveryNote = async (Carriers) => {

    
    const opciones = []
    const asd = opciones.concat(Carriers)
    console.log(asd)
    // Carriers.map(e => {
    //     opciones.push(e["value"]: e["label"])
    // })
    return await Swal.fire({
        title: 'Selecciona un Conductor',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: '¡Seleccionar!',
        input: 'select',
        inputOptions: Carriers,
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-danger ml-1'
        },
        buttonsStyling: false
    })
        .then(result => {
            if (result.value) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Eliminado!',
                    text: '¡El registro ha sido eliminado!',
                    timer: 3000,
                    timerProgressBar: true,
                    customClass: {
                        confirmButton: 'btn btn-success'
                    }
                })
                return true
            } else if (result.dismiss === Swal.DismissReason.cancel) {

                Swal.fire({
                    title: '¡Cancelado!',
                    text: '¡El registro está a salvo!',
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