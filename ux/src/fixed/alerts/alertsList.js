import Badge from "reactstrap/lib/Badge"





export const alertsList = [

    {
        name: 'Nº',
        selector: 'id',
        searcheable: true,
        sortebale: true,
        width: '10%'

    },
    {
        name: 'Mensaje',
        selector: 'message',
        searcheable: true,
        sortable: true,
        width: '45%'

    },
    {
        name: 'Fecha de caducidad',
        selector: 'date',
        searcheable: true,
        sortable: true,
        width: '15%'

    },
    {
        name: 'Estado',
        selector: 'isDone',
        searcheable: true,
        sortable: true,
        width: '10%',
        cell: row => {
            return (
              <>
      
                {row.isDone === 0 ?
                  (<Badge color='light-success'>
                    Visto
                  </Badge>)
                  :
                  (<Badge color='light-danger'>
                    No visto 
                  </Badge>)
                }
              </>
            )
          }

    }

]