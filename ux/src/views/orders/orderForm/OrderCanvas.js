import React, { useEffect, useState } from 'react'
import { Stage, Layer, Image, Rect } from 'react-konva'
import { useDispatch, useSelector } from 'react-redux'
import { editDropedElement } from '../../../redux/actions/canvas'
import { useParams } from 'react-router-dom'

const INITIAL_ELEMENTS = 29
export const OrderCanvas = () => {

    const dispatch = useDispatch()


    const { elements: elem } = useSelector(state => state.canvasReducer)

    const generateShapes = () => {
        return [...Array(INITIAL_ELEMENTS)].map((_, i) => {
            const imageObj = new window.Image(50, 50)
            imageObj.src = elem[i].imgUrl
            const canvasElement =
            {
                ...elem[i],
                image: imageObj,
                pos: i,
                width: 50,
                height: 50
            }

            useEffect(() => {
                dispatch(editDropedElement('elements', i, canvasElement))
            }, [])

            return canvasElement
        })
    }




    const initialState = generateShapes()
    //console.log('_____________________________')
    //console.log(initialState)
    //console.log(useState(initialState))

    const { id } = useParams()
    let elements2 = {}
    if (id) {
        elements2 = generateShapes()
    } else {
        elements2 = useState(initialState)
        elements2 = elements2[0]
    }

    console.log(id)
    const [elements, setElements] = useState(initialState)




    const handleDragStart = (e) => {
        const id = e.target.id()
        // setElements(
        //     elements.map((el) => {
        //         return {
        //             ...el,
        //             isDragging: el.id === id
        //         }
        //     })
        // )
    }
    const handleDragEnd = (e) => {
        const newEl = {
            ...e.target.attrs,
            x: e.target.attrs.x,
            y: e.target.attrs.y
        }
        console.log(newEl)
        dispatch(editDropedElement('elements', e.target.attrs.pos, newEl))
        //  setElements(
        //      elements.map((el) => {
        //          return {
        //              ...el,
        //              isDragging: false
        //          }
        //      })
        //  )
    }



    return (
        <>
            <h1 className="card-title mb-2">Composición</h1>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <Rect
                        x={600}
                        y={300}
                        width={(window.innerWidth / 2.5)}
                        height={400}
                        fill={'#B8E9EE'}
                        stroke={'black'}
                        strokeWidth={2}
                    />
                    {elements2.map((el) => (
                        <Image
                            key={el.id}
                            pos={el.pos}
                            id={el.id}
                            x={el.x}
                            y={el.y}
                            width={el.width}
                            height={el.height}
                            image={el.image}
                            numPoints={5}
                            innerRadius={20}
                            outerRadius={40}
                            opacity={0.8}
                            draggable
                            scaleX={el.isDragging ? 1.2 : 1}
                            scaleY={el.isDragging ? 1.2 : 1}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            imgUrl={el.imgUrl}
                        />
                    ))}
                </Layer>
            </Stage>
        </>
    )
}
