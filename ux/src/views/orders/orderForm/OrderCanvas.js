import React, { useEffect, useState } from 'react'
import { Stage, Layer, Image, Rect } from 'react-konva'
import { useDispatch, useSelector } from 'react-redux'
import { editDropedElement } from '../../../redux/actions/canvas'

const INITIAL_ELEMENTS = 6
export const OrderCanvas = () => {

    const dispatch = useDispatch()


    const { elements: elem } = useSelector(state => state.canvasReducer)
    
    console.log(elem)

    //const { canvasItems: elem2 } = useSelector(state => state.normalForm)
    const generateShapes = () => {
        return [...Array(INITIAL_ELEMENTS)].map((_, i) => {
            const imageObj = new window.Image(50, 50)
          // if (elem2 !== undefined) {
          //   
          //     elem = elem2
          // } 
         
            imageObj.src = elem[i].imgUrl
            const canvasElement =
            {
                ...elem[i],
                x: (window.innerWidth / 15),
                y: ((window.innerHeight / 12) * i) + 100,
                image: imageObj
            }

            useEffect(() => {
                dispatch(editDropedElement('elements', i, canvasElement))
            }, [])

            return canvasElement
        })
    }

    const initialState = generateShapes()

    const [elements, setElements] = useState(initialState)

    const handleDragStart = (e) => {
        const id = e.target.id()
        setElements(
            elements.map((el) => {
                return {
                    ...el,
                    isDragging: el.id === id
                }
            })
        )
    }
    const handleDragEnd = (e) => {
        const newEl = {
            ...e.target.attrs,
            x: e.target.attrs.x,
            y: e.target.attrs.y
        }
        dispatch(editDropedElement('elements', e.target.attrs.id, newEl))
        setElements(
            elements.map((el) => {
                return {
                    ...el,
                    isDragging: false
                }
            })
        )
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
                    {elements.map((el) => (
                        <Image
                            key={el.id}
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
                            shadowColor="black"
                            shadowBlur={10}
                            shadowOpacity={0.6}
                            shadowOffsetX={el.isDragging ? 10 : 5}
                            shadowOffsetY={el.isDragging ? 10 : 5}
                            scaleX={el.isDragging ? 1.2 : 1}
                            scaleY={el.isDragging ? 1.2 : 1}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                        />
                    ))}
                </Layer>
            </Stage>
        </>
    )
}
