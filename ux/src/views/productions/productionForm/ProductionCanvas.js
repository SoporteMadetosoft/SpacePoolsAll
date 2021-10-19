import React, { useRef } from 'react'
import { Stage, Layer, Image, Rect } from 'react-konva'
import { useSelector } from 'react-redux'

const ImageCanvas = ({ el, i, imageObj }) => {
    const shapeRef = useRef()

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
                scaleX={el.isDragging ? 1.2 : 1}
                scaleY={el.isDragging ? 1.2 : 1}
                imgUrl={el.imgUrl}
                rotation={el.rotation}
            />
        </>
    )
}


export const ProductionCanvas = () => {

    const { elements: elem } = useSelector(state => state.canvasReducer)

    return (
        <>
            <h1 className="card-title mb-2">Composición</h1>
            <Stage width={window.innerWidth} height={window.innerHeight - 300}>
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
                    <Rect x={600} y={100} height={400} width={1} stroke={'#474747'} cornerRadius={25} strokeWidth={1} opacity={0.4} />
                    <Rect x={550} y={100} height={400} width={1} stroke={'#474747'} cornerRadius={25} strokeWidth={1} opacity={0.4} />
                    {elem.map((el, i) => {

                        const imageObj = new window.Image(50, 50)
                        const base64image = el.imgUrl

                        imageObj.src = base64image
                        return (
                            <ImageCanvas
                                el={el}
                                i={i}
                                imageObj={imageObj}
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
