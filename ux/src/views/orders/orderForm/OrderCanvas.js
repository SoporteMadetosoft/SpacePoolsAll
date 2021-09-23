import React, { useEffect } from 'react'
import { Stage, Layer, Image, Rect } from 'react-konva'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { editDropedElement, setInitialCanvas, setNewCanvasPosition } from '../../../redux/actions/canvas'


export const OrderCanvas = () => {
    const dispatch = useDispatch()

    const { id } = useParams()

    // useEffect(() => {
    //     dispatch(setNewCanvasPosition())
    //     
    // }, [])
  
    const { elements: elem } = useSelector(state => state.canvasReducer)

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
                    {elem.map((el, index) => {
                        if ((id && elem[29].id) || !id) {
                            const imageObj = new window.Image(50, 50)
                            imageObj.src = el.imgUrl
                            return (<Image
                                key={el.id}
                                pos={index}
                                id={el.id}
                                x={el.x}
                                y={el.y}
                                width={50}
                                height={50}
                                image={imageObj}
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
                            )
                        }
                    }
                    )
                    }
                </Layer>
            </Stage>
        </>
    )
}
