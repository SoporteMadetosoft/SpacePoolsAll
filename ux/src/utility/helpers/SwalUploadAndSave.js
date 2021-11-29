import Swal from "sweetalert2"

export const SwalUploadAndSave = async () => {

    return await Swal.fire({
        title: 'Hay archivos pendientes de subir',
        text: "¿Quieres subir los archivos antes de guardar?",
        icon: 'info',
        showCancelButton: true,
        cancelButtonText: 'Guardar sin subir archivos',
        confirmButtonText: 'Sube los archivos y guarda',
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-secondary'
        },
        buttonsStyling: false
    })
        .then(result => {
            if (result.value) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Archivos guardados!',
                    text: '¡Los archivos se han subido correctamente!',
                    timer: 3000,
                    timerProgressBar: true,
                    customClass: {
                        confirmButton: 'btn btn-success'
                    }
                })
                return true
            } else if (result.dismiss === Swal.DismissReason.cancel) {

                Swal.fire({
                    title: 'Archivos descartados!',
                    text: '¡Los archivos se han descartado!',
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