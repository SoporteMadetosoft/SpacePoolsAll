import Swal from "sweetalert2"

export const handleConfirmCancel = async () => { 
    
    return await Swal.fire({
        title: '¿Estás seguro que quieres eliminar el registro?',
        text: "¡No vas a poder revertir los cambios!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: '¡Si, eliminalo!',
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