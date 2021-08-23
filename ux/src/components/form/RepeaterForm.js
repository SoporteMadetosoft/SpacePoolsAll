import React from 'react'
import Repeater from '@components/repeater'
import { Button } from 'reactstrap'
import { Plus } from 'react-feather'
import { RepeaterFormContent } from './repeater-form/RepeaterFormContent'
import { useDispatch, useSelector } from 'react-redux'
import { handleRepeaterFormAdd } from '../../redux/actions/form'

export const RepeaterForm = ({form, title, idGroup}) => {

    const  dispatch = useDispatch()
    const { [idGroup]: group } = useSelector(state => state.form.formData)

    const increaseCount = () => {
        dispatch( handleRepeaterFormAdd( idGroup,  group.length ) )
    }

    return (
        <div className="card  border-top mt-2">
            <div className="card-header">
                <h4 className="card-title">{ title }</h4>
            </div>
            <div className="card-body">
                <Repeater count={ group.length }>
                    {i => {
                        const Tag = 'div'
                        return (
                            <Tag key={ group[i]._id } className='react-slidedown' id={`react-slidedown-${ group[i]._id }`}>
                                <RepeaterFormContent key={`${idGroup}-${group[i]._id}`} formCustom={ form } position={ i } idObject={ group[i]._id } idGroup={ idGroup } />
                            </Tag>
                        )   
                    }}
                </Repeater>
                <Button.Ripple className='btn-icon form-control mt-1 btn-sm' color='primary' outline onClick={ increaseCount }>
                    <Plus size={14} />
                </Button.Ripple>
            </div>
        
        </div>
    )
}
