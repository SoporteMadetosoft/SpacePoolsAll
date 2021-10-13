import React, { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Image, Rect, Transformer } from 'react-konva'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { editDropedElement, setInitialCanvas, setNewCanvasPosition } from '../../../redux/actions/canvas'

const ImageCanvas = ({ el, i, imageObj, isSelected, onChange, onDragEnd, onSelect }) => {
    const shapeRef = useRef()
    const trRef = useRef()

    useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current])
            trRef.current.getLayer().batchDraw()
        }
    }, [isSelected])

    return (
        <>
            <Image
                key={el.id}
                pos={i}
                ref={shapeRef}
                id={el.id}
                x={el.x}
                y={el.y}
                width={50}
                height={50}
                image={imageObj}
                onDragEnd={onDragEnd}
                onClick={onSelect}
                onTransformEnd={(e) => {
                    const node = shapeRef.current
                    onChange({
                        ...el,
                        x: node.x(),
                        y: node.y(),
                        rotation: node.rotation()
                    })
                }}
                draggable
                scaleX={el.isDragging ? 1.2 : 1}
                scaleY={el.isDragging ? 1.2 : 1}
                imgUrl={el.imgUrl}
                rotation={el.rotation}
            />
            {isSelected && (
                <>
                    <Transformer
                        ref={trRef}
                        resizeEnabled={false}
                    />
                </>
            )}
        </>
    )
}


export const OrderCanvas = () => {
    const [selectedId, selectShape] = useState(null)
    const dispatch = useDispatch()

    const { elements: elem } = useSelector(state => state.canvasReducer)

    const handleDragEnd = (e) => {
        const newEl = {
            ...e.target.attrs,
            x: e.target.attrs.x,
            y: e.target.attrs.y
        }
        dispatch(editDropedElement('elements', e.target.attrs.pos, newEl))
    }

    const handleOnChange = (e) => {
        const newEl = {
            ...e,
            x: e.x,
            y: e.y,
            rotation: e.rotation
        }
        dispatch(editDropedElement('elements', e.pos, newEl))
    }

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage()
        if (clickedOnEmpty) {
            selectShape(null)
        }
    }

    return (
        <>
            <h1 className="card-title mb-2">Composición</h1>
            <Stage width={window.innerWidth} height={window.innerHeight - 300} onMouseDown={checkDeselect} onTouchStart={checkDeselect}>
                <Layer>
                    <Rect x={300} y={50} height={window.innerHeight - 300} width={1} stroke={'#474747'} cornerRadius={25} strokeWidth={1} />
                    <Rect
                        x={500}
                        y={100}
                        width={(window.innerWidth / 2.5)}
                        height={400}
                        fill={'#C7E0FF'}
                        stroke={'#474747'}
                        cornerRadius={25}
                        strokeWidth={2}
                        opacity={0.4}
                    />
                    <Rect x={600} y={100} height={400} width={1} stroke={'#474747'} cornerRadius={25} strokeWidth={1} />
                    <Rect x={550} y={100} height={400} width={1} stroke={'#474747'} cornerRadius={25} strokeWidth={1} />
                    {elem.map((el, i) => {

                        const imageObj = new window.Image(50, 50)
                        const base64image = el.imgUrl

                        imageObj.src = base64image
                        return (
                            <ImageCanvas
                                el={el}
                                i={i}
                                imageObj={imageObj}
                                isSelected={i === selectedId}
                                onDragEnd={handleDragEnd}
                                onChange={handleOnChange}

                                onSelect={() => {
                                    selectShape(i)
                                }}
                            />
                        )

                    }
                    )
                    }
                </Layer>
            </Stage>
        </>
    )
}
